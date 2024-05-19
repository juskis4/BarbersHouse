import React from "react";
//import { Link } from 'react-router-dom';
import "./index.css";
import logoImg from "../../../assets/barbershop_logo.png";
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
//import Booking from '../booking';

function Header() {
  // Placeholder function for handling button click
  const handleBookingClick = () => {
    alert("Booking process to be implemented.");
  };

  return (
    <div className="header">
      <div className="logo-section">
        <img src={logoImg} alt="Barber's House Logo" />
      </div>
      <div className="info-section">
        <h1>Barber's House</h1>
        <p>
          Istedgade 28, 8700 Horsens, Denmark
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=55.8718491,9.8391846"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Show on map
          </a>
        </p>
        <div className="ratings">
          <span>⭐ 5.0</span>
        </div>
        <div className="social-links">
          <a
            href="https://www.instagram.com/barbershouse.dk/?igsh=ZDh4bXNmbzRjbXhv&fbclid=IwZXh0bgNhZW0CMTAAAR2sTq7qQTSqCnw9b5VLs8WIwFSlfSZlsbzGPlpj5m4CEJh1ApJPIXPhy28_aem_AU9buw4ul_h-PqGCkLjpE0p2OAcLdw_57YkAkT6I4mOEo5eitYyIf6g5aQdSRnQ-FC9mVY4xH0xblh8s6WMCHF4c"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=4552644296&text&type=phone_number&app_absent=0&fbclid=IwZXh0bgNhZW0CMTAAAR1l-znpdTw_wgLqQmLVhFDQYjOuqUYlSx16q300LEc7YxHp5cvRjqMgmY8_aem_AU-X_fD54DQKMSX8Q0rPPM8nYeyYyYnC8IhhqcvWCQcH0DQMic53OoGAtEbggWXAbgjoMy_aV3uUttGoYO8JsjbX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
        </div>
        <div className="phone-number">
          <FaPhone style={{ color: "orange", marginRight: "5px" }} />{" "}
          <span>Phone: +45 52 64 42 96</span>
        </div>
      </div>
      <div className="book-now">
        <button onClick={handleBookingClick}>
          <FaCalendarAlt style={{ marginRight: "8px" }} /> Book Now
        </button>
        <p>You can make an appointment at Barber's House.</p>
      </div>
    </div>
  );
}

export default Header;
