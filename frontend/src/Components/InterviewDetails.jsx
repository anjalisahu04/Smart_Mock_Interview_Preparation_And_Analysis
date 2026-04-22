import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Badge, Accordion, Row, Col, ProgressBar } from 'react-bootstrap';
import InterviewService from '../services/InterviewService';
import { toast } from 'react-toastify';

const InterviewDetails = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInterviewDetails();
  }, [sessionId]);

  const loadInterviewDetails = async () => {
    try {
      const data = await InterviewService.getSession(sessionId);
      setSession(data);
      console.log('Interview details loaded:', data);
    } catch (err) {
      console.error('Error loading interview details:', err);
      setError('Failed to load interview details');
      toast.error('Failed to load interview details');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading interview details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-6 offset-md-3 mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="col-md-6 offset-md-3 mt-5">
        <Alert variant="warning">Interview not found</Alert>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const analysis = session.analysis;
  const isCompleted = session.status === 'COMPLETED';

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📝 Interview Details</h2>
          <p className="text-muted">
            Session ID: {session.id.substring(0, 8)}...
          </p>
        </div>
        <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </Button>
      </div>

      {/* Interview Info Card */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3}>
              <strong>Domain:</strong>
              <p>{session.domain}</p>
            </Col>
            <Col md={3}>
              <strong>Type:</strong>
              <p>{session.interviewType}</p>
            </Col>
            <Col md={3}>
              <strong>Level:</strong>
              <p>{session.level}</p>
            </Col>
            <Col md={3}>
              <strong>Status:</strong>
              <Badge bg={isCompleted ? 'success' : 'warning'}>
                {session.status}
              </Badge>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={4}>
              <strong>Start Time:</strong>
              <p>{formatDate(session.startTime)}</p>
            </Col>
            <Col md={4}>
              <strong>End Time:</strong>
              <p>{formatDate(session.endTime)}</p>
            </Col>
            <Col md={4}>
              <strong>Duration:</strong>
              <p>{session.durationMinutes} minutes</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Analysis Section (if completed) */}
      {isCompleted && analysis && (
        <>
          <Card className="mb-4 border-success shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">📊 Performance Analysis</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Overall Score: {analysis.overallScore}/100</h6>
                  <ProgressBar 
                    now={analysis.overallScore} 
                    variant={getScoreColor(analysis.overallScore)}
                    className="mb-3"
                  />
                  <p><strong>Accuracy:</strong> {analysis.overallAccuracy}</p>
                  <p><strong>Summary:</strong> {analysis.summary}</p>
                </Col>
                <Col md={6}>
                  <h6>Skill Scores:</h6>
                  {analysis.skillScores && Object.entries(analysis.skillScores).map(([skill, score]) => (
                    <div key={skill} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <span>{skill}</span>
                        <span>{score}%</span>
                      </div>
                      <ProgressBar 
                        now={score} 
                        variant={getScoreColor(score)}
                        className="mb-1"
                      />
                    </div>
                  ))}
                </Col>
              </Row>
              
              <hr />
              
              <Row>
                <Col md={6}>
                  <h6 className="text-success">✅ Strengths:</h6>
                  <ul>
                    {analysis.overallStrengths?.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-warning">📈 Areas for Improvement:</h6>
                  <ul>
                    {analysis.areasForImprovement?.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
              
              <h6 className="mt-3">💡 Recommendations:</h6>
              <ul>
                {analysis.recommendations?.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
              
              <p className="mt-3 text-muted">{analysis.detailedAnalysis}</p>
            </Card.Body>
          </Card>

          {/* Questions and Answers Section */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">
                📋 Questions & Answers ({session.questions.length} questions)
              </Card.Title>
              
              <Accordion>
                {session.questions.map((question, index) => (
                  <Accordion.Item eventKey={index.toString()} key={question.id}>
                    <Accordion.Header>
                      <div className="d-flex justify-content-between w-100 me-3">
                        <span>
                          <strong>Q{index + 1}:</strong> {question.text.length > 100 
                            ? question.text.substring(0, 100) + '...' 
                            : question.text}
                        </span>
                        {question.evaluation && (
                          <Badge 
                            bg={getScoreColor(question.evaluation.score)}
                            className="ms-2"
                          >
                            Score: {question.evaluation.score}%
                          </Badge>
                        )}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="mb-3">
                        <h6 className="text-primary">❓ Question:</h6>
                        <p className="fw-bold">{question.text}</p>
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-info">💬 Your Answer:</h6>
                        <div className="p-3 bg-light rounded">
                          {question.userAnswer ? (
                            <p>{question.userAnswer}</p>
                          ) : (
                            <p className="text-muted fst-italic">No answer provided</p>
                          )}
                        </div>
                      </div>
                      
                      {question.audioTranscription && (
                        <div className="mb-3">
                          <h6 className="text-secondary">🎤 Audio Transcription:</h6>
                          <div className="p-2 bg-light rounded">
                            <p>{question.audioTranscription}</p>
                          </div>
                        </div>
                      )}
                      
                      {question.responseTimeSeconds && (
                        <div className="mb-3">
                          <h6 className="text-secondary">⏱️ Response Time:</h6>
                          <p>{formatTime(question.responseTimeSeconds)}</p>
                        </div>
                      )}
                      
                      {question.evaluation && (
                        <>
                          <hr />
                          <h6 className="text-success"> Evaluation:</h6>
                          
                          <div className="mb-2">
                            <strong>Score:</strong> {question.evaluation.score}/100
                            <ProgressBar 
                              now={question.evaluation.score} 
                              variant={getScoreColor(question.evaluation.score)}
                              className="mt-1"
                            />
                          </div>
                          
                          <p className="mt-2"><strong>Accuracy:</strong> {question.evaluation.accuracy}</p>
                          <p><strong>Feedback:</strong> {question.evaluation.feedback}</p>
                          
                          {question.evaluation.strengths && question.evaluation.strengths.length > 0 && (
                            <>
                              <strong>✅ Strengths:</strong>
                              <ul>
                                {question.evaluation.strengths.map((strength, i) => (
                                  <li key={i}>{strength}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {question.evaluation.improvements && question.evaluation.improvements.length > 0 && (
                            <>
                              <strong>📈 Areas for Improvement:</strong>
                              <ul>
                                {question.evaluation.improvements.map((improvement, i) => (
                                  <li key={i}>{improvement}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {question.evaluation.suggestedAnswer && (
                            <>
                              <strong>💡 Suggested Answer:</strong>
                              <div className="p-3 bg-light rounded mt-1">
                                <p className="mb-0">{question.evaluation.suggestedAnswer}</p>
                              </div>
                            </>
                          )}
                          
                          {question.evaluation.keyPointsCovered && (
                            <p className="mt-2"><strong>✓ Key Points Covered:</strong> {question.evaluation.keyPointsCovered}</p>
                          )}
                          
                          {question.evaluation.keyPointsMissed && (
                            <p className="mt-2"><strong>⚠️ Key Points Missed:</strong> {question.evaluation.keyPointsMissed}</p>
                          )}
                        </>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </>
      )}

      {/* If interview is in progress, show message */}
      {!isCompleted && (
        <Alert variant="info">
          <Alert.Heading>Interview In Progress</Alert.Heading>
          <p>This interview hasn't been completed yet. You can continue where you left off.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/interview/session/${session.id}`, { 
              state: { 
                duration: session.durationMinutes - Math.floor((new Date() - new Date(session.startTime)) / 60000),
                totalQuestions: session.questions.length
              }
            })}
          >
            Continue Interview
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default InterviewDetails;