import React, { useState } from 'react';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(); 
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
          <img src={carouselImage1} alt={t('carousel.firstSlide')} />
        </div>
        <div>
          <img src={carouselImage2} alt={t('carousel.secondSlide')} />
        </div>
        <div>
          <img src={carouselImage3} alt={t('carousel.thirdSlide')} />
        </div>
        <div>
          <img src={carouselImage4} alt={t('carousel.fourthSlide')} />
        </div>
        <div>
          <img src={carouselImage5} alt={t('carousel.fifthSlide')} />
        </div>
      </Slider>

      <section id="about-us" className="about-us">
        <h2>{t('aboutUs.title')}</h2>
        <p>{t('aboutUs.paragraph1')}</p>
        <p>{t('aboutUs.paragraph2')}</p>
        <p>{t('aboutUs.paragraph3')}</p>
      </section>
    </section>
  );
}

export default CarouselBarber;
