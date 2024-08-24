import React from 'react';
import CarCard from './carCard';

const CarList = ({ cars, highlightedCars = [], onHighlight }) => {
    const isHighlighted = (car) => highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid);

    return (
    <div className="row">
        {cars.map(car => (
        <div key={car.Cid} className="col-md-4 col-sm-6 mb-4">
            <CarCard car={car} onClick={onHighlight} isHighlighted={isHighlighted(car)} />
        </div>
        ))}
    </div>
    );
};

export default CarList;