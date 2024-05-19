import React, { useState } from 'react';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import carouselImage1 from '../../../assets/carousel_1.png'; 
import carouselImage2 from '../../../assets/carousel_2.png'; 
import carouselImage3 from '../../../assets/carousel_3.png'; 
import carouselImage4 from '../../../assets/carousel_4.png'; 
import carouselImage5 from '../../../assets/carousel_5.jpg'; 
import Booking from '../booking';
import "./index.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, 
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <button type="button" className="slick-prev">❮</button>,
  nextArrow: <button type="button" className="slick-next">❯</button>,
};

function CarouselBarber() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section id="carousel" className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={carouselImage1} alt="First slide" />
        </div>
        <div>
          <img src={carouselImage2} alt="Second slide" />
        </div>
        <div>
          <img src={carouselImage3} alt="Third slide" />
        </div>
        <div>
          <img src={carouselImage4} alt="Fourth slide" />
        </div>
        <div>
          <img src={carouselImage5} alt="Fifth slide" />
        </div>
      </Slider>

      <section id="about-us" className="about-us">
        <h2>About Us</h2>
        <p>I'm Ciprian Maftei, and what started as a hobby for me has grown into a passion and now it became my dream job.</p>
        <p>I guide my craft by a simple yet powerful motto: 'Attitude is Everything'. In my work, this motto is a constant reminder that a good haircut is key in crafting an attitude that speaks of confidence, success, and positivity. I understand that when you look great, you feel great, and that's what I aim to achieve with every client who walks through the doors.</p>
        <p>As I work, I enjoy getting to know my clients, understanding their styles, and their stories. These interactions turn a routine haircut into a personalized experience. I am here to craft a look that suits you, and in the process, build lasting connections that go beyond the barber chair. Join the Barber's House community. Looking forward to welcoming you and creating a style that’s all about you!</p>
      </section>
    </section>
  );
}

export default CarouselBarber;