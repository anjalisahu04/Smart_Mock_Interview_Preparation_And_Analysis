// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Card, Button, Form, Alert, Spinner, ProgressBar, Badge } from 'react-bootstrap';
// import InterviewService from '../services/InterviewService';
// import { toast } from 'react-toastify';

// const InterviewSession = () => {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [session, setSession] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [error, setError] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState(location.state?.duration * 60 || 1800);
  
//   // Voice recording states
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [recordingTime, setRecordingTime] = useState(0);
  
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const timerRef = useRef(null);
//   const recordingTimerRef = useRef(null);

//   useEffect(() => {
//     loadSession();
//     startTimer();
    
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//       if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
//       stopRecording();
//     };
//   }, [sessionId]);

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setTimeRemaining(prev => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleTimeOut();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleTimeOut = async () => {
//     toast.warning('Time is up! Submitting your interview...');
//     if (session && currentIndex < session.questions.length) {
//       try {
//         await InterviewService.completeInterview(sessionId);
//         navigate('/dashboard');
//       } catch (err) {
//         console.error('Error completing interview:', err);
//       }
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const loadSession = async () => {
//     try {
//       const data = await InterviewService.getSession(sessionId);
//       setSession(data);
      
//       const unansweredIndex = data.questions.findIndex(q => !q.userAnswer);
//       if (unansweredIndex !== -1) {
//         setCurrentIndex(unansweredIndex);
//       }
//     } catch (err) {
//       setError('Failed to load interview session');
//       toast.error('Failed to load session');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         audio: {
//           echoCancellation: true,
//           noiseSuppression: true,
//           sampleRate: 44100
//         } 
//       });
      
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       audioChunksRef.current = [];
      
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };
      
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         setAudioBlob(audioBlob);
//         stream.getTracks().forEach(track => track.stop());
        
//         // Stop recording timer
//         if (recordingTimerRef.current) {
//           clearInterval(recordingTimerRef.current);
//           setRecordingTime(0);
//         }
        
//         toast.success('Recording saved!');
//       };
      
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
      
//       // Start recording timer
//       recordingTimerRef.current = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);
      
//       toast.info('Recording started... Speak clearly');
//     } catch (err) {
//       console.error('Microphone error:', err);
//       toast.error('Unable to access microphone. Please check permissions.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!answer.trim() && !audioBlob) {
//       toast.error('Please provide an answer (text or voice)');
//       return;
//     }

//     setSubmitting(true);
    
//     try {
//       let finalAnswer = answer;
//       let audioFile = null;
      
//       if (audioBlob) {
//         audioFile = new File([audioBlob], `recording_${Date.now()}.wav`, { type: 'audio/wav' });
//         // If using voice, we'll let backend handle the transcription
//       }
      
//       const result = await InterviewService.submitAnswer(
//         sessionId, 
//         currentIndex, 
//         finalAnswer,
//         audioFile
//       );
      
//       setFeedback(result.evaluation);
//       setAnswer('');
//       setAudioBlob(null);
      
//       const isLast = currentIndex === session.questions.length - 1;
      
//       if (isLast) {
//         toast.info('Analyzing your interview performance...');
//         const analysis = await InterviewService.completeInterview(sessionId);
//         toast.success('Interview completed! View your detailed analysis on dashboard.');
//         navigate('/dashboard', { state: { analysis } });
//       } else {
//         setCurrentIndex(currentIndex + 1);
//         setFeedback(null);
//         toast.success('Answer submitted! Moving to next question...');
//       }
//     } catch (err) {
//       console.error('Submit error:', err);
//       toast.error('Failed to submit answer: ' + (err.response?.data?.error || err.message));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatRecordingTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const currentQuestion = session?.questions?.[currentIndex];
//   const progress = ((currentIndex + 1) / (session?.questions?.length || 1)) * 100;
//   const timePercentage = (timeRemaining / (location.state?.duration * 60)) * 100;

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//         <p className="mt-3">Loading interview...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="col-md-6 offset-md-3 mt-5">
//         <Alert variant="danger">{error}</Alert>
//         <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
//       </div>
//     );
//   }

//   if (!currentQuestion) {
//     return (
//       <div className="col-md-6 offset-md-3 mt-5">
//         <Alert variant="warning">No questions found</Alert>
//         <Button onClick={() => navigate('/interview/setup')}>Start New Interview</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="col-md-8 offset-md-2 mt-4">
//       {/* Header Info */}
//       <Card className="mb-4 bg-light">
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <Badge bg="info" className="me-2">Domain: {session.domain}</Badge>
//               <Badge bg="success">Level: {session.level}</Badge>
//             </div>
//             <div>
//               <Badge bg="warning" className="p-2">
//                 ⏱️ Time Left: {formatTime(timeRemaining)}
//               </Badge>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Timer and Progress */}
//       <div className="mb-4">
//         <div className="d-flex justify-content-between mb-2">
//           <Badge bg="secondary">
//             Question {currentIndex + 1} of {session.questions.length}
//           </Badge>
//           <Badge bg="primary">
//             {Math.round(progress)}% Complete
//           </Badge>
//         </div>
//         <ProgressBar 
//           now={progress} 
//           variant="primary" 
//         />
//         {timeRemaining < 300 && (
//           <ProgressBar 
//             now={timePercentage} 
//             variant="danger" 
//             className="mt-1"
//           />
//         )}
//       </div>

//       {/* Question Card */}
//       <Card className="mb-4 shadow">
//         <Card.Body>
//           <Badge 
//             bg={currentQuestion.type === 'TECHNICAL' ? 'primary' : 
//                 currentQuestion.type === 'BEHAVIORAL' ? 'success' : 'warning'} 
//             className="mb-3 p-2"
//           >
//             {currentQuestion.type === 'TECHNICAL' ? '💻 Technical Question' : 
//              currentQuestion.type === 'BEHAVIORAL' ? '💬 Behavioral Question' : '🎯 Situational Question'}
//           </Badge>
          
//           <h4 className="mb-4">{currentQuestion.text}</h4>
          
//           <Form.Group>
//             <Form.Label className="fw-bold">Your Answer</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={6}
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               placeholder="Type your answer here or use voice recording..."
//               disabled={submitting}
//               className="mb-3"
//             />
//           </Form.Group>
          
//           {/* Voice Recording Controls */}
//           <div className="d-flex gap-2 mb-3">
//             {!isRecording ? (
//               <Button
//                 variant="outline-primary"
//                 onClick={startRecording}
//                 disabled={submitting}
//               >
//                 🎙️ Start Recording
//               </Button>
//             ) : (
//               <Button
//                 variant="danger"
//                 onClick={stopRecording}
//                 disabled={submitting}
//               >
//                 ⏹️ Stop Recording ({formatRecordingTime(recordingTime)})
//               </Button>
//             )}
            
//             {audioBlob && !isRecording && (
//               <>
//                 <Badge bg="success" className="align-self-center">
//                   ✓ Audio recorded ({Math.round(audioBlob.size / 1024)} KB)
//                 </Badge>
//                 <Button
//                   variant="outline-secondary"
//                   size="sm"
//                   onClick={() => setAudioBlob(null)}
//                 >
//                   Clear
//                 </Button>
//               </>
//             )}
//           </div>
          
//           <Button
//             variant="primary"
//             onClick={handleSubmit}
//             disabled={submitting || (!answer.trim() && !audioBlob)}
//             className="w-100 py-2"
//             size="lg"
//           >
//             {submitting ? <Spinner size="sm" /> : '📤 Submit Answer'}
//           </Button>
//         </Card.Body>
//       </Card>

//       {/* AI Feedback */}
//       {feedback && (
//         <Card className="bg-light border-primary shadow-sm">
//           <Card.Body>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <Badge bg="primary" className="p-2"> Evaluation</Badge>
//               <Badge 
//                 bg={feedback.score >= 80 ? "success" : feedback.score >= 60 ? "warning" : "danger"}
//                 className="p-2"
//               >
//                 Score: {feedback.score}/100 ({feedback.accuracy})
//               </Badge>
//             </div>
            
//             <p><strong>Feedback:</strong> {feedback.feedback}</p>
            
//             {feedback.strengths && feedback.strengths.length > 0 && (
//               <>
//                 <p className="mt-2"><strong>✅ Strengths:</strong></p>
//                 <ul>
//                   {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
//                 </ul>
//               </>
//             )}
            
//             {feedback.improvements && feedback.improvements.length > 0 && (
//               <>
//                 <p className="mt-2"><strong>📈 Areas for Improvement:</strong></p>
//                 <ul>
//                   {feedback.improvements.map((i, idx) => <li key={idx}>{i}</li>)}
//                 </ul>
//               </>
//             )}
            
//             {feedback.suggestedAnswer && (
//               <>
//                 <p className="mt-2"><strong>💡 Suggested Answer:</strong></p>
//                 <p className="text-muted">{feedback.suggestedAnswer}</p>
//               </>
//             )}
            
//             {feedback.keyPointsCovered && (
//               <p className="mt-2"><strong>✓ Key Points Covered:</strong> {feedback.keyPointsCovered}</p>
//             )}
            
//             {feedback.keyPointsMissed && (
//               <p className="mt-2"><strong>⚠️ Key Points Missed:</strong> {feedback.keyPointsMissed}</p>
//             )}
//           </Card.Body>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default InterviewSession;



import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, Form, Alert, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import InterviewService from '../services/InterviewService';
import VoiceRecorder from './VoiceRecorder'; // Import the voice recorder
import { toast } from 'react-toastify';

const InterviewSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(location.state?.duration * 60 || 1800);
  const [audioFile, setAudioFile] = useState(null); // For voice recording
  
  const timerRef = useRef(null);

  useEffect(() => {
    loadSession();
    startTimer();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionId]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeOut = async () => {
    toast.warning('Time is up! Submitting your interview...');
    if (session && currentIndex < session.questions.length) {
      try {
        await InterviewService.completeInterview(sessionId);
        navigate('/dashboard');
      } catch (err) {
        console.error('Error completing interview:', err);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const loadSession = async () => {
    try {
      const data = await InterviewService.getSession(sessionId);
      setSession(data);
      
      const unansweredIndex = data.questions.findIndex(q => !q.userAnswer);
      if (unansweredIndex !== -1) {
        setCurrentIndex(unansweredIndex);
      }
    } catch (err) {
      setError('Failed to load interview session');
      toast.error('Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceRecording = async (audioFile) => {
    setAudioFile(audioFile);
    toast.success('Voice recording ready for submission!');
  };

  const handleSubmit = async () => {
    // Check if either text answer or voice recording is provided
    if (!answer.trim() && !audioFile) {
      toast.error('Please provide an answer (text or voice)');
      return;
    }

    setSubmitting(true);
    
    try {
      let finalAnswer = answer;
      let audioToSubmit = audioFile;
      
      // If voice recording is provided, we'll send it to backend
      // Backend will transcribe and evaluate
      
      const result = await InterviewService.submitAnswer(
        sessionId, 
        currentIndex, 
        finalAnswer,
        audioToSubmit
      );
      
      setFeedback(result.evaluation);
      setAnswer('');
      setAudioFile(null); // Clear audio file after submission
      
      const isLast = currentIndex === session.questions.length - 1;
      
      if (isLast) {
        toast.info('Analyzing your interview performance...');
        const analysis = await InterviewService.completeInterview(sessionId);
        toast.success('Interview completed! View your detailed analysis on dashboard.');
        navigate('/dashboard', { state: { analysis } });
      } else {
        setCurrentIndex(currentIndex + 1);
        setFeedback(null);
        toast.success('Answer submitted! Moving to next question...');
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to submit answer: ' + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const currentQuestion = session?.questions?.[currentIndex];
  const progress = ((currentIndex + 1) / (session?.questions?.length || 1)) * 100;
  const timePercentage = (timeRemaining / (location.state?.duration * 60)) * 100;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading interview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-6 offset-md-3 mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="col-md-6 offset-md-3 mt-5">
        <Alert variant="warning">No questions found</Alert>
        <Button onClick={() => navigate('/interview/setup')}>Start New Interview</Button>
      </div>
    );
  }

  return (
    <div className="col-md-8 offset-md-2 mt-4">
      {/* Header Info */}
      <Card className="mb-4 bg-light">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Badge bg="info" className="me-2">Domain: {session.domain}</Badge>
              <Badge bg="success">Level: {session.level}</Badge>
            </div>
            <div>
              <Badge bg="warning" className="p-2">
                ⏱️ Time Left: {formatTime(timeRemaining)}
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Timer and Progress */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
          <Badge bg="secondary">
            Question {currentIndex + 1} of {session.questions.length}
          </Badge>
          <Badge bg="primary">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <ProgressBar 
          now={progress} 
          variant="primary" 
        />
        {timeRemaining < 300 && (
          <ProgressBar 
            now={timePercentage} 
            variant="danger" 
            className="mt-1"
          />
        )}
      </div>

      {/* Question Card */}
      <Card className="mb-4 shadow">
        <Card.Body>
          <Badge 
            bg={currentQuestion.type === 'TECHNICAL' ? 'primary' : 
                currentQuestion.type === 'BEHAVIORAL' ? 'success' : 'warning'} 
            className="mb-3 p-2"
          >
            {currentQuestion.type === 'TECHNICAL' ? '💻 Technical Question' : 
             currentQuestion.type === 'BEHAVIORAL' ? '💬 Behavioral Question' : '🎯 Situational Question'}
          </Badge>
          
          <h4 className="mb-4">{currentQuestion.text}</h4>
          
          <Form.Group>
            <Form.Label className="fw-bold">Your Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here or use voice recording below..."
              disabled={submitting}
              className="mb-3"
            />
          </Form.Group>
          
          <hr className="my-3" />
          
          {/* Voice Recording Component */}
          <div className="mb-3">
            <Form.Label className="fw-bold">Or Record Voice Answer</Form.Label>
            <VoiceRecorder 
              onRecordingComplete={handleVoiceRecording}
              disabled={submitting}
            />
          </div>
          
          {audioFile && (
            <Alert variant="info" className="mt-2">
              <strong>✓ Voice recording ready:</strong> {audioFile.name} ({(audioFile.size / 1024).toFixed(1)} KB)
            </Alert>
          )}
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || (!answer.trim() && !audioFile)}
            className="w-100 py-2 mt-3"
            size="lg"
          >
            {submitting ? <Spinner size="sm" /> : '📤 Submit Answer'}
          </Button>
        </Card.Body>
      </Card>

      {/* AI Feedback */}
      {feedback && (
        <Card className="bg-light border-primary shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Badge bg="primary" className="p-2">🤖 AI Evaluation</Badge>
              <Badge 
                bg={feedback.score >= 80 ? "success" : feedback.score >= 60 ? "warning" : "danger"}
                className="p-2"
              >
                Score: {feedback.score}/100 ({feedback.accuracy})
              </Badge>
            </div>
            
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
            
            {feedback.strengths && feedback.strengths.length > 0 && (
              <>
                <p className="mt-2"><strong>✅ Strengths:</strong></p>
                <ul>
                  {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}
            
            {feedback.improvements && feedback.improvements.length > 0 && (
              <>
                <p className="mt-2"><strong>📈 Areas for Improvement:</strong></p>
                <ul>
                  {feedback.improvements.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              </>
            )}
            
            {feedback.suggestedAnswer && (
              <>
                <p className="mt-2"><strong>💡 Suggested Answer:</strong></p>
                <div className="p-3 bg-white rounded">
                  <p className="mb-0">{feedback.suggestedAnswer}</p>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default InterviewSession;