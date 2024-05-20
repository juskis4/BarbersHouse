import React, { useState } from 'react';
import "./index.css";
import { useTranslation } from 'react-i18next';

function FAQ() {
  const { t } = useTranslation(); 
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="faq" className="faq-container">
      <div className="faq-content">
        <h2 className="faq-header">{t('faq.header')}</h2>
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
          <div className="faq-question" onClick={handleToggle}>
            <span>📅</span> {}
            <span>{t('faq.question')}</span>
            <span className="faq-toggle">{isOpen ? '▲' : '▼'}</span>
          </div>
          {isOpen && (
            <div className="faq-answer">
              <p>
                {t('faq.answer')} <a href="#booking" className="faq-link">{t('faq.bookNow')}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
