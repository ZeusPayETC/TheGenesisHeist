// src/components/Launchpad.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Launchpad.css';

const Launchpad = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`launchpad ${fadeIn ? 'fade-in' : ''}`}>
      <div className="star-overlay" />
      <div className="launchpad-content">
        <h1>🌌 The Genesis Heist</h1>
        <p>The cosmic comic odyssey begins…</p>
        <button onClick={() => navigate('/mint')}>Enter Comic World</button>
      </div>
    </div>
  );
};

export default Launchpad;
