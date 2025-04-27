import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({ activity_type: '', duration: '' });

  useEffect(() => {
    fetch('https://ideal-funicular-g54wwj5pj95cwqvg-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleAddActivity = () => {
    fetch('https://ideal-funicular-g54wwj5pj95cwqvg-8000.app.github.dev/api/activities/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newActivity),
    })
      .then(response => response.json())
      .then(data => {
        setActivities([...activities, data]);
        setShowModal(false);
        setNewActivity({ activity_type: '', duration: '' });
      })
      .catch(error => console.error('Error adding activity:', error));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Activities</h1>
        <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
          Add Activity
        </Button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Activity Type</th>
              <th>Duration (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.activity_type}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Activity Type</Form.Label>
                <Form.Control
                  type="text"
                  value={newActivity.activity_type}
                  onChange={e => setNewActivity({ ...newActivity, activity_type: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration (seconds)</Form.Label>
                <Form.Control
                  type="number"
                  value={newActivity.duration}
                  onChange={e => setNewActivity({ ...newActivity, duration: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddActivity}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Activities;