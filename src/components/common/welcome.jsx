// WelcomeMessage.js
import React, { useEffect, useState } from 'react';

const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Hide the welcome message after 1 second
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showMessage ? (
    <div className="welcome-message size-[500]">
      Welcome 
    </div>
  ) : null;
};

export default WelcomeMessage;
