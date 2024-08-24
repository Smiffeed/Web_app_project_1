import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CarCard = ({ car, onClick, onRemove, isHighlighted }) => {
    return (
    <Card className="h-100 position-relative">
      {/* Remove button as 'x' icon in top-right */}
        {onRemove && (
        <Button
            variant="danger"
            onClick={() => onRemove(car)}
            className="position-absolute"
            style={{ top: '10px', right: '10px', padding: '5px 10px', fontSize: '1rem' }}
        >
            &times;
        </Button>
        )}
        <Card.Img variant="top" src={car.Img300} alt={`${car.Model}`} className="card-img-top" />
        <Card.Body>
        <Card.Title>{car.Model} ({car.Yr})</Card.Title>
        <Card.Text>
            Price: {car.Prc} {car.Currency}<br />
            Location: {car.Province}
        </Card.Text>
        {!isHighlighted && ( // Conditionally render Highlight button
            <Button variant="primary" onClick={() => onClick(car)}>Highlight</Button>
        )}
        </Card.Body>
    </Card>
    );
};

export default CarCard;