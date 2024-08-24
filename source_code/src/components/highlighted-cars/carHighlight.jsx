import React from 'react';
import CarCard from './carCard';

const CarHighlight = ({ highlightedCars, onRemove }) => {
    if (!Array.isArray(highlightedCars) || highlightedCars.length === 0) {
        return <p>No cars highlighted.</p>;
    }

    return (
        <div className="row">
            {highlightedCars.map(car => (
                <div key={car.Cid} className="col-md-4 col-sm-6 mb-4">
                  <CarCard car={car} onRemove={onRemove} isHighlighted={true} /> {/* Always pass true for isHighlighted */}
                </div>
            ))}
        </div>
    );
};

export default CarHighlight;