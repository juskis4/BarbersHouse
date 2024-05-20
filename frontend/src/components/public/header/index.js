// src/components/public/header/index.js
import React, { useState } from 'react';
import './index.css';
import logoImg from '../../../assets/barbershop_logo.png';
import { FaInstagram, FaWhatsapp, FaTiktok, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Booking from '../booking';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="header">
        <div className="logo-section">
          <img src={logoImg} alt="Barber's House Logo" />
        </div>
        <div className="info-section">
          <h1>{t('welcome')}</h1>
          <p>
            {t('address')}
            <a href="https://www.google.com/maps/dir/?api=1&destination=55.8718491,9.8391846" target="_blank" rel="noopener noreferrer"> {t('showOnMap')}</a>
          </p>
          <div className="ratings">
            <a href="https://g.co/kgs/7pbeYDN" target="_blank" rel="noopener noreferrer" className="rating-link">⭐ 5.0</a>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/barbershouse.dk/?igsh=ZDh4bXNmbzRjbXhv&fbclid=IwZXh0bgNhZW0CMTAAAR2sTq7qQTSqCnw9b5VLs8WIwFSlfSZlsbzGPlpj5m4CEJh1ApJPIXPhy28_aem_AU9buw4ul_h-PqGCkLjpE0p2OAcLdw_57YkAkT6I4mOEo5eitYyIf6g5aQdSRnQ-FC9mVY4xH0xblh8s6WMCHF4c" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://api.whatsapp.com/send/?phone=4552644296&text&type=phone_number&app_absent=0&fbclid=IwZXh0bgNhZW0CMTAAAR1l-znpdTw_wgLqQmLVhFDQYjOuqUYlSx16q300LEc7YxHp5cvRjqMgmY8_aem_AU-X_fD54DQKMSX8Q0rPPM8nYeyYyYnC8IhhqcvWCQcH0DQMic53OoGAtEbggWXAbgjoMy_aV3uUttGoYO8JsjbX" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
          <div className="phone-number">
            <FaPhone style={{ color: 'orange', marginRight: '5px' }} /> <span>{t('phone')}</span>
          </div>
        </div>
        <div className="book-now">
          <Button variant="contained" onClick={handleClickOpen}>
            <FaCalendarAlt style={{ marginRight: '8px' }} /> {t('bookNow')}
          </Button>
          <p>{t('appointment')}</p>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Booking')}</DialogTitle>
        <DialogContent>
          <Booking />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Close')}</Button>
        </DialogActions>
      </Dialog>

      <button className="floating-button" onClick={handleClickOpen}>
        <FaCalendarAlt className="floating-button-icon" />
        <span className="floating-button-text">{t('bookNow')}</span>
      </button>

      <LanguageSwitcher /> {}
    </div>
  );
}

export default Header;
