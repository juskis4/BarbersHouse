import React from 'react';
import PropTypes from 'prop-types';
import BookingTest from '../bookingtest';

const Step3 = ({ selectedServices, selectedBarberId }) => {
  return (
    <div>
        {selectedServices.length === 0 ? (
        <p>No services selected.</p>
        ) : (
        <ul>
            {selectedServices.map((service) => (
            <li key={service.serviceId}>
                {service.title} - ${service.price} ({service.duration} min)
            </li>
            ))}
        </ul>
        )}
        <BookingTest selectedServices={selectedServices} selectedBarberId={selectedBarberId} />
    </div>
    );
};

Step3.propTypes = {
  selectedServices: PropTypes.arrayOf(PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    barberId: PropTypes.number.isRequired,
  })).isRequired,
};

export default Step3;
