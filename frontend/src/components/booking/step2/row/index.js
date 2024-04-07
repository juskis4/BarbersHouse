import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const rowStyles = {
  common: {
    '& > *': { borderBottom: 'unset' },
    cursor: 'pointer',
  },
  default: {
    backgroundColor: 'inherit',
  },
  selected: {
    backgroundColor: '#bdbdbd',
    '&:hover': { backgroundColor: '#bdbdbd !important' },
  },
};

export const Row = ({ title, duration, price, description, isSelected, onRowClick, hasDetails = true }) => {
  const [open, setOpen] = useState(false);

  if (!hasDetails) {
    return (
      <TableRow sx={{ ...rowStyles.common, ...(isSelected ? rowStyles.selected : rowStyles.default) }} onClick={onRowClick} hover>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">${price}</TableCell>
      </TableRow>
    );
  }

  return (
    <React.Fragment>
      <TableRow sx={{ ...rowStyles.common, ...(isSelected ? rowStyles.selected : rowStyles.default) }} onClick={onRowClick} hover>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{title}</TableCell>
        <TableCell align="right">{duration} min</TableCell>
        <TableCell align="right">${price}</TableCell>
      </TableRow>
      {open && (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom>{description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      )}
    </React.Fragment>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  hasDetails: PropTypes.bool,
};