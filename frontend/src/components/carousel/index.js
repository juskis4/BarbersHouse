import "./index.css";
import Carousel from 'react-bootstrap/Carousel';
import exampleImage from '../../assets/barbershop.png'; 

function CarouselBarber() {
  return (
    <div className="carousel-container"> {/* Wrapper for positioning */}
      <Carousel>
        <Carousel.Item>
          <img src={exampleImage} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <button type="button" className="btn btn-primary">Click Me</button> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={exampleImage} alt="First slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button type="button" className="btn btn-primary">Click Me</button> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={exampleImage} alt="First slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <button type="button" className="btn btn-primary">Click Me</button> 
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselBarber;