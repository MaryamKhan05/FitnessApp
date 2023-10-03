// Timer.js
import React, { useEffect, useState } from 'react';

const TimerTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setStartTime(new Date());

    const timer = setInterval(() => {
      const now = new Date();
      const elapsed = now - startTime;
      setElapsedTime(elapsed);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [startTime]);

  // Format elapsed time for display
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  return (
    <div>
      <h1>Time Spent on App</h1>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default TimerTracker;
