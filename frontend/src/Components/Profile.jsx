import React, { useState, useEffect } from 'react';
import { Card, Alert, Spinner, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';

const Profile = ({ currentUser }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        console.log('Current user from localStorage:', currentUser);
        const data = await UserService.getUserProfile();
        setUserData(data);
        setName(data.name);
        setError('');
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdateMessage('');
      const response = await UserService.updateProfile({ name });
      setUserData(response);
      setEditMode(false);
      setUpdateMessage('Profile updated successfully!');
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (err) {
      setUpdateMessage('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-6 offset-md-3">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-6 offset-md-3">
      <Card className="profile-container">
        <Card.Body>
          <h2 className="text-center mb-4">My Profile</h2>

          {updateMessage && (
            <Alert variant="success">{updateMessage}</Alert>
          )}

          <div className="profile-info">
            {editMode ? (
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData?.email || ''}
                    disabled
                    readOnly
                  />
                  <Form.Text className="text-muted">
                    Email cannot be changed
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <div className="mb-3">
                  <strong>Name:</strong> {userData?.name}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setEditMode(true)}
                    className="ms-2"
                  >
                    Edit
                  </Button>
                </div>

                <div className="mb-3">
                  <strong>Email:</strong> {userData?.email}
                </div>

                <div className="mb-3">
                  <strong>User ID:</strong>
                  <small className="text-muted ms-2">{userData?.id}</small>
                </div>
              </>
            )}
          </div>

          <Alert variant="info" className="mt-4">
            <strong>Account Status:</strong> Active
          </Alert>

          <div className="text-center mt-3">
            <small className="text-muted">
              Logged in as: {currentUser?.user?.email}
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;



