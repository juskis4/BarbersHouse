import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

import ukFlag from '../../../assets/uk_flag.png';
import dkFlag from '../../../assets/dk_flag.png';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="floating-language-switcher">
      <button onClick={() => changeLanguage('en')}>
        <img src={ukFlag} alt="English" />
      </button>
      <button onClick={() => changeLanguage('da')}>
        <img src={dkFlag} alt="Danish" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
