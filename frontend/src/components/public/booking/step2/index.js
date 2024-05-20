import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Row } from './row'; 

const Step2 = ({ services, selectedBarberId, onSelectedServiceChange, setSelectedServices, selectedRows, setSelectedRows }) => {

  useEffect(() => {
    
    setSelectedRows([]);
    setSelectedServices([]);
  }, [selectedBarberId, setSelectedRows, setSelectedServices]); 

  const handleRowClick = (rowId) => {
    setSelectedRows([rowId]); 

    const selectedService = services.find(service => service.serviceId === rowId);
    setSelectedServices([selectedService]); 


    if (onSelectedServiceChange) {
        onSelectedServiceChange(rowId);
    }
};

  const filteredServices = services.filter((service) => service.barberId === selectedBarberId || selectedBarberId === null);

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
  onSelectedServiceChange: PropTypes.func,
  setSelectedServices: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
};

export default Step2;
