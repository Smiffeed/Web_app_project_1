import React, { useState, useEffect } from 'react';
import CarHighlight from "./components/highlightedCars/carHighlight";
import carData from "./data/taladrod-cars.min.json";
import CarList from './components/highlightedCars/carList';
import CarPicker from "./components/highlightedCars/Carpicker";
import { Container } from "react-bootstrap";
import "./highlighted-cars.css";


function highlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState(carData.Cars); // Initialize with all cars

  // Load highlighted cars from localStorage on initial load
  useEffect(() => {
    const savedHighlights = JSON.parse(localStorage.getItem('highlightedCars'));
    if (savedHighlights) {
      setHighlightedCars(savedHighlights);
    }
  }, []);

  // Save highlighted cars to localStorage whenever the highlightedCars state changes
  useEffect(() => {
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
  }, [highlightedCars]);

  const handleHighlight = (car) => {
    if (!highlightedCars.some(c => c.Cid === car.Cid)) {
      setHighlightedCars([...highlightedCars, car]);
    }
  };

  const handleRemove = (car) => {
    setHighlightedCars(highlightedCars.filter(c => c.Cid !== car.Cid));
  };

  const handleFilter = (filtered) => {
    setFilteredCars(filtered);
  };


  return (
    <div className="App">
      <Container className="mt-5">
        <h2>Car Searching</h2>
        <CarPicker cars={carData.Cars} onFilter={handleFilter} />

        <h2 className="mt-5">Highlighted Cars</h2>
        <CarHighlight highlightedCars={highlightedCars} onRemove={handleRemove} />

        <h2 className="mt-5">Available Cars</h2>
        <CarList cars={filteredCars} highlightedCars={highlightedCars} onHighlight={handleHighlight} />
      </Container>
    </div>
  );
}

export default highlightedCars;