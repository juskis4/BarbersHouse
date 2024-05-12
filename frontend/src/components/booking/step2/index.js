import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Row } from './row'; 

const Step2 = ({ services, selectedBarberId, onSelectedServiceChange }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (rowId) => {
    setSelectedRows(prev => prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId]);

    // Call onSelectedServiceChange prop
    if (onSelectedServiceChange) { 
      onSelectedServiceChange(rowId); // Pass the selected/deselected serviceId
    }
  };
  
  const filteredServices = services.filter((service) => service.barberId === selectedBarberId);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Service Name</TableCell>
            <TableCell align="right">Duration (min)</TableCell>
            <TableCell align="right">Price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredServices.map((service) => (
            <Row
              key={service.serviceId}
              title={service.title}
              duration={service.duration}
              price={service.price}
              description={service.description}
              isSelected={selectedRows.includes(service.serviceId)}
              onRowClick={() => handleRowClick(service.serviceId)}
              hasDetails={true}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Step2.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    barberId: PropTypes.number.isRequired,
  })).isRequired,
  selectedBarberId: PropTypes.string.isRequired,
};

export default Step2;