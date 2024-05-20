import React from 'react';
import './navigationBar.css';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t } = useTranslation(); 

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container px-0 py-1 sm:px-4">
      <nav className="border-t">
        <ul className="text-center whitespace-no-wrap max-w-full scrollbar-hidden overflow-x-auto" style={{ transform: 'translateY(-1px)' }}>
          <li className="inline text-mid">
            <button className="opacity-50 font-medium btn border-t border-primary opacity-100" onClick={() => scrollToSection('about-us')}>
              <span className="btn__content p-4">{t('navigation.aboutUs')}</span>
            </button>
          </li>
          <li className="inline text-mid">
            <button className="opacity-50 font-medium btn" onClick={() => scrollToSection('services')}>
              <span className="btn__content p-4">{t('navigation.services')}</span>
            </button>
          </li>
          <li className="inline text-mid">
            <button className="opacity-50 font-medium btn" onClick={() => scrollToSection('team')}>
              <span className="btn__content p-4">{t('navigation.team')}</span>
            </button>
          </li>
          <li className="inline text-mid">
            <button className="opacity-50 font-medium btn" onClick={() => scrollToSection('faq')}>
              <span className="btn__content p-4">{t('navigation.faq')}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
