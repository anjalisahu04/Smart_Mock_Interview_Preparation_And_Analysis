// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// import InterviewService from '../services/InterviewService';
// import { toast } from 'react-toastify';

// const InterviewSetup = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [config, setConfig] = useState({
//     domain: '',
//     interviewType: 'MIXED',
//     level: 'INTERMEDIATE',
//     durationMinutes: 30
//   });
//   const [error, setError] = useState('');

//   const domains = [
//     'Software Development',
//     'Data Science',
//     'Machine Learning',
//     'Frontend Development',
//     'Backend Development',
//     'Product Management',
//     'DevOps',
//     'Cloud Computing',
//     'Cybersecurity',
//     'UI/UX Design'
//   ];

//   const interviewTypes = [
//     { value: 'TECHNICAL', label: 'Technical Interview' },
//     { value: 'NON_TECHNICAL', label: 'Non-Technical/Behavioral' },
//     { value: 'MIXED', label: 'Mixed (Technical + Behavioral)' }
//   ];

//   const levels = [
//     { value: 'BEGINNER', label: 'Beginner (0-2 years)' },
//     { value: 'INTERMEDIATE', label: 'Intermediate (3-5 years)' },
//     { value: 'ADVANCED', label: 'Advanced (6+ years)' }
//   ];

//   const durations = [
//     { value: 15, label: '15 minutes (Quick Practice)' },
//     { value: 30, label: '30 minutes (Standard)' },
//     { value: 45, label: '45 minutes (Detailed)' },
//     { value: 60, label: '60 minutes (Full Interview)' }
//   ];

//   const handleChange = (e) => {
//     setConfig({
//       ...config,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!config.domain) {
//       setError('Please select a domain');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await InterviewService.startInterview(config);
//       toast.success('Interview started!');
//       navigate(`/interview/session/${response.session.id}`, { 
//         state: { duration: response.durationMinutes }
//       });
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to start interview');
//       toast.error('Failed to start interview');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="col-md-8 offset-md-2 mt-5">
//       <Card className="shadow">
//         <Card.Body className="p-4">
//           <h3 className="text-center mb-4">🎯 Configure Your Mock Interview</h3>
          
//           {error && <Alert variant="danger">{error}</Alert>}
          
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-4">
//               <Form.Label className="fw-bold">Domain/Specialization</Form.Label>
//               <Form.Select
//                 name="domain"
//                 value={config.domain}
//                 onChange={handleChange}
//                 required
//                 size="lg"
//               >
//                 <option value="">Select your domain...</option>
//                 {domains.map(domain => (
//                   <option key={domain} value={domain}>{domain}</option>
//                 ))}
//               </Form.Select>
//               <Form.Text className="text-muted">
//                 Questions will be generated specifically for this domain
//               </Form.Text>
//             </Form.Group>
            
//             <Form.Group className="mb-4">
//               <Form.Label className="fw-bold">Interview Type</Form.Label>
//               <Form.Select
//                 name="interviewType"
//                 value={config.interviewType}
//                 onChange={handleChange}
//               >
//                 {interviewTypes.map(type => (
//                   <option key={type.value} value={type.value}>{type.label}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
            
//             <Form.Group className="mb-4">
//               <Form.Label className="fw-bold">Experience Level</Form.Label>
//               <Form.Select
//                 name="level"
//                 value={config.level}
//                 onChange={handleChange}
//               >
//                 {levels.map(level => (
//                   <option key={level.value} value={level.value}>{level.label}</option>
//                 ))}
//               </Form.Select>
//               <Form.Text className="text-muted">
//                 Question difficulty will match your experience level
//               </Form.Text>
//             </Form.Group>
            
//             <Form.Group className="mb-4">
//               <Form.Label className="fw-bold">Interview Duration</Form.Label>
//               <Form.Select
//                 name="durationMinutes"
//                 value={config.durationMinutes}
//                 onChange={handleChange}
//               >
//                 {durations.map(duration => (
//                   <option key={duration.value} value={duration.value}>{duration.label}</option>
//                 ))}
//               </Form.Select>
//               <Form.Text className="text-muted">
//                 Number of questions will be based on duration
//               </Form.Text>
//             </Form.Group>
            
//             <div className="mb-4 p-3 bg-light rounded">
//               <h6 className="fw-bold">📋 What to expect:</h6>
//               <ul className="mb-0">
//                 <li>AI-generated questions tailored to your domain and level</li>
//                 <li>Real-time evaluation with detailed feedback</li>
//                 <li>Voice recording support for natural answers</li>
//                 <li>Comprehensive analysis with improvement suggestions</li>
//                 <li>Timer will track your interview duration</li>
//               </ul>
//             </div>
            
//             <Button 
//               type="submit" 
//               variant="primary" 
//               className="w-100 py-2"
//               size="lg"
//               disabled={loading}
//             >
//               {loading ? <Spinner size="sm" /> : '🚀 Start Interview'}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default InterviewSetup;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import InterviewService from '../services/InterviewService';
import { toast } from 'react-toastify';

const InterviewSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    domain: '',
    interviewType: 'MIXED',
    level: 'INTERMEDIATE',
    durationMinutes: 30
  });
  const [error, setError] = useState('');

  const domains = [
    'Software Development',
    'Data Science',
    'Machine Learning',
    'Frontend Development',
    'Backend Development',
    'Product Management',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'UI/UX Design',
    'HR'
  ];

  const interviewTypes = [
    { value: 'TECHNICAL', label: 'Technical Interview' },
    { value: 'NON_TECHNICAL', label: 'Non-Technical/Behavioral' },
    { value: 'MIXED', label: 'Mixed (Technical + Behavioral)' }
  ];

  const levels = [
    { value: 'BEGINNER', label: 'Beginner (0-2 years)' },
    { value: 'INTERMEDIATE', label: 'Intermediate (3-5 years)' },
    { value: 'ADVANCED', label: 'Advanced (6+ years)' }
  ];

  const durations = [
    { value: 15, label: '15 minutes (Quick Practice - 3 questions)' },
    { value: 30, label: '30 minutes (Standard - 5 questions)' },
    { value: 45, label: '45 minutes (Detailed - 7 questions)' },
    { value: 60, label: '60 minutes (Full Interview - 10 questions)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: name === 'durationMinutes' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!config.domain) {
      setError('Please select a domain');
      toast.error('Please select a domain');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting interview with config:', config);
      const response = await InterviewService.startInterview(config);
      console.log('Interview started:', response);
      
      toast.success(`Interview started! You'll have ${response.durationMinutes} minutes.`);
      navigate(`/interview/session/${response.session.id}`, { 
        state: { 
          duration: response.durationMinutes,
          totalQuestions: response.totalQuestions,
          domain: config.domain,
          level: config.level
        }
      });
    } catch (err) {
      console.error('Start interview error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to start interview';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-8 offset-md-2 mt-5">
      <Card className="shadow">
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">🎯 Configure Your Mock Interview</h3>
          <p className="text-center text-muted mb-4">
            Questions will be generated by AI based on your selections
          </p>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              <Alert.Heading>Error Starting Interview</Alert.Heading>
              <p>{error}</p>
              <hr />
              <p className="mb-0">
                Please check your connection and try again.
              </p>
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">📚 Domain/Specialization</Form.Label>
              <Form.Select
                name="domain"
                value={config.domain}
                onChange={handleChange}
                required
                size="lg"
              >
                <option value="">Select your domain...</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                AI will generate questions specific to this domain
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">🎭 Interview Type</Form.Label>
              <Form.Select
                name="interviewType"
                value={config.interviewType}
                onChange={handleChange}
              >
                {interviewTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Technical questions test your skills, Behavioral assess soft skills
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">📊 Experience Level</Form.Label>
              <Form.Select
                name="level"
                value={config.level}
                onChange={handleChange}
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Question difficulty adjusts to your experience level
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">⏱️ Interview Duration</Form.Label>
              <Form.Select
                name="durationMinutes"
                value={config.durationMinutes}
                onChange={handleChange}
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>{duration.label}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                More time = more questions for comprehensive assessment
              </Form.Text>
            </Form.Group>
            
            <div className="mb-4 p-3 bg-light rounded">
              <h6 className="fw-bold">🤖 How it works:</h6>
              <ul className="mb-0">
                <li>AI generates personalized questions based on your selections</li>
                <li>Answer via text or voice recording</li>
                <li>Each answer is evaluated in real-time</li>
                <li>After completion, get comprehensive analysis with improvement suggestions</li>
                <li>Track your progress over multiple interviews</li>
              </ul>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 py-2"
              size="lg"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : '🚀 Start Interview'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InterviewSetup;