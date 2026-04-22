import React, { useState, useRef, useEffect } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const VoiceRecorder = ({ onRecordingComplete, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    setError('');
    try {
      // Request microphone access with better quality settings
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        } 
      });
      
      streamRef.current = stream;
      
      // Check supported MIME types
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/wav';
      
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        // Create blob from recorded chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);
        
        // Create URL for playback
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        toast.success('Recording saved! You can now submit your answer.');
      };
      
      // Start recording with timeslices (capture every second)
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      
      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast.info('Recording started... Speak clearly into your microphone');
      
    } catch (err) {
      console.error('Microphone error:', err);
      setError('Unable to access microphone. Please check permissions and try again.');
      toast.error('Microphone access denied. Please allow microphone access and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setRecordingTime(0);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    toast.info('Recording cancelled');
  };

  const submitRecording = async () => {
    if (!audioBlob) {
      toast.error('No recording to submit');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Convert blob to file
      const audioFile = new File([audioBlob], `recording_${Date.now()}.wav`, { 
        type: audioBlob.type 
      });
      
      // Pass the audio file to parent component
      await onRecordingComplete(audioFile);
      
      // Clear recording after successful submission
      setAudioBlob(null);
      setAudioUrl(null);
      
    } catch (err) {
      console.error('Error submitting recording:', err);
      toast.error('Failed to submit recording. Please try again or type your answer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-recorder">
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      
      {/* Recording Controls */}
      {!isRecording && !audioBlob && (
        <div className="d-flex gap-2 align-items-center">
          <Button
            variant="outline-primary"
            onClick={startRecording}
            disabled={disabled || isProcessing}
            className="d-flex align-items-center gap-2"
          >
            <span>🎙️</span>
            Start Voice Recording
          </Button>
          <small className="text-muted">
            Speak clearly for best results
          </small>
        </div>
      )}
      
      {/* Recording in Progress */}
      {isRecording && (
        <div className="d-flex gap-2 align-items-center">
          <Button
            variant="danger"
            onClick={stopRecording}
            disabled={disabled}
            className="d-flex align-items-center gap-2"
          >
            <span>⏹️</span>
            Stop Recording ({formatTime(recordingTime)})
          </Button>
          <div className="recording-indicator">
            <span className="recording-dot"></span>
            <span className="text-danger">Recording...</span>
          </div>
        </div>
      )}
      
      {/* Playback and Submit */}
      {audioBlob && !isRecording && (
        <div className="mt-3">
          <div className="d-flex gap-2 align-items-center mb-2">
            <strong>Recorded Answer:</strong>
            <audio controls src={audioUrl} className="flex-grow-1" />
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="success"
              onClick={submitRecording}
              disabled={disabled || isProcessing}
              className="d-flex align-items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Spinner size="sm" />
                  Processing...
                </>
              ) : (
                <>
                  <span>📤</span>
                  Submit Voice Answer
                </>
              )}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={cancelRecording}
              disabled={disabled || isProcessing}
            >
              Cancel & Re-record
            </Button>
          </div>
          <small className="text-muted mt-2 d-block">
            Your voice will be transcribed and analyzed by AI
          </small>
        </div>
      )}
      
      <style jsx>{`
        .recording-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          animation: pulse 1.5s infinite;
        }
        .recording-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #dc3545;
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VoiceRecorder; 