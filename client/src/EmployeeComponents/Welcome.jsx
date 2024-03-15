import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div>
      <h1>Welcome, {email}!</h1>
      {/* You can add more content here */}
    </div>
  );
}

export default Welcome;
