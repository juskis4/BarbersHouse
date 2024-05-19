import React from "react";
import "./index.css";
import logo from "../../../assets/barbershop_logo.png";
import { FaInstagram, FaPhone, FaMapPin } from "react-icons/fa";

function Footer() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img src={logo} alt="Barber's House" className="footer-logo" />
          <div className="footer-logo-circle"></div>
        </div>
        <ul className="footer-links">
          <li onClick={() => scrollToSection("about-us")}>About Us</li>
          <li onClick={() => scrollToSection("services")}>Services</li>
          <li onClick={() => scrollToSection("team")}>Team</li>
          <li onClick={() => scrollToSection("faq")}>FAQ</li>
        </ul>
        <h3 className="footer-contacts-title">Contacts</h3>
        <ul className="footer-contacts">
          <li>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=55.8718491,9.8391846"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapPin style={{ color: "orange", marginRight: "5px" }} /> Show
              on map
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/send/?phone=4552644296&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhone style={{ color: "orange", marginRight: "5px" }} /> +45 52
              64 42 96
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/barbershouse.dk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram style={{ color: "orange", marginRight: "5px" }} />{" "}
              barbershouse.dk
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
