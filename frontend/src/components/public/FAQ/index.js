import React, { useState } from 'react';
import "./index.css";

function FAQ() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="faq" className="faq-container">
      <div className="faq-content">
        <h2 className="faq-header">FAQ</h2>
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
          <div className="faq-question" onClick={handleToggle}>
            <span>📅</span> {}
            <span>How to make an appointment at Barber's House?</span>
            <span className="faq-toggle">{isOpen ? '▲' : '▼'}</span>
          </div>
          {isOpen && (
            <div className="faq-answer">
              <p>
                Follow the link: <a href="#booking" className="faq-link">Book Now</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
