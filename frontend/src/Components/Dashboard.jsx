
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import InterviewService from '../services/InterviewService';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await InterviewService.getDashboard();
      setData(result);
    } catch (err) {
      console.error('Dashboard error:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Your session has expired or you are not authorized. Please log in again.');
      } else {
        setError('Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-6 offset-md-3 mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📊 Your Interview Dashboard</h2>
        <Button variant="primary" onClick={() => navigate('/interview/setup')}>
          🚀 Start New Interview
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Interviews</Card.Title>
              <h1 className="display-4">{data?.totalInterviews || 0}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Average Score</Card.Title>
              <h1 className="display-4">{Math.round(data?.averageScore || 0)}%</h1>
              <Badge bg={getScoreColor(data?.averageScore)}>Overall Performance</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {location.state?.analysis && (
        <Card className="mb-4 border-success shadow">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">🎉 Latest Interview Analysis</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>Overall Score: {location.state.analysis.overallScore}/100</h6>
                <div className="progress mb-3">
                  <div 
                    className={`progress-bar bg-${getScoreColor(location.state.analysis.overallScore)}`}
                    style={{ width: `${location.state.analysis.overallScore}%` }}
                  ></div>
                </div>
                <p><strong>Accuracy:</strong> {location.state.analysis.overallAccuracy}</p>
                <p><strong>Summary:</strong> {location.state.analysis.summary}</p>
              </Col>
              <Col md={6}>
                <h6>Skill Scores:</h6>
                {location.state.analysis.skillScores && Object.entries(location.state.analysis.skillScores).map(([skill, score]) => (
                  <div key={skill} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{skill}</span>
                      <span>{score}%</span>
                    </div>
                    <div className="progress">
                      <div 
                        className={`progress-bar bg-${getScoreColor(score)}`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
            
            <hr />
            
            <Row>
              <Col md={6}>
                <h6 className="text-success">✅ Strengths:</h6>
                <ul>
                  {location.state.analysis.overallStrengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </Col>
              <Col md={6}>
                <h6 className="text-warning">📈 Areas for Improvement:</h6>
                <ul>
                  {location.state.analysis.areasForImprovement?.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              </Col>
            </Row>
            
            <h6 className="mt-3">💡 Recommendations:</h6>
            <ul>
              {location.state.analysis.recommendations?.map((rec, idx) => <li key={idx}>{rec}</li>)}
            </ul>
            
            <p className="mt-3 text-muted">{location.state.analysis.detailedAnalysis}</p>
          </Card.Body>
        </Card>
      )}

      {data?.recentInterviews?.length > 0 && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>📋 Recent Interviews</Card.Title>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Domain</th>
                    <th>Type</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentInterviews.map((interview, idx) => (
                    <tr key={idx}>
                      <td><strong>{interview.domain}</strong></td>
                      <td>{interview.type}</td>
                      <td>{interview.level}</td>
                      <td>{new Date(interview.startTime).toLocaleDateString()}</td>
                      <td>
                        {interview.score && (
                          <Badge bg={getScoreColor(interview.score)}>
                            {interview.score}%
                          </Badge>
                        )}
                      </td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="outline-primary"
                          onClick={() => navigate(`/interview/details/${interview.id}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
