import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, price, description) {
  return { name, price, description };
}

const rows = [
  createData('Haircut', 25, 'A complete haircut and styling service.'),
  createData('Beard Trim', 15, 'Precision beard trimming and shaping.'),
  createData('Hair Coloring', 40, 'Professional hair coloring services.'),
  createData('Shave', 20, 'Traditional wet shave with hot towels.'),
  createData('Facial', 30, 'Cleansing facial treatment.'),
];

function Row(props) {
  const { row, isSelected, onRowClick } = props;

  const [open, setOpen] = React.useState(false);

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
    }
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ ...rowStyles.common, ...(isSelected ? rowStyles.selected : rowStyles.default) }} 
        onClick={onRowClick}
        hover
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">${row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom>
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

function Step2() {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleRowClick = (rowName) => {
    setSelectedRows(prev => {
      if (prev.includes(rowName)) {
        return prev.filter(name => name !== rowName);
      } else {
        return [...prev, rowName];
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Service Name</TableCell>
            <TableCell align="right">Price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.name}
              row={row}
              isSelected={selectedRows.includes(row.name)}
              onRowClick={() => handleRowClick(row.name)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Step2;
