import React from 'react';
import "./App.css";
import NavBar from './components/navbar';
import Barbers from './components/barbers'
import CarouselBarber from './components/carousel';

const App = () => {
  return (
    <div>
      <NavBar />
      <CarouselBarber />
      <Barbers />
    </div>
  );
};

export default App;
