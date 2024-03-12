import React from 'react';
import { render, screen } from '@testing-library/react'; 
import Navbar from './components/navbar'; 

test('renders the navbar with navigation links', () => {
  render(<Navbar />); 

  const homeLink = screen.getByText('Home'); // Assumes your links have text content
  const servicesLink = screen.getByText('Services');
  const contactsLink = screen.getByText('Contacts');

  expect(homeLink).toBeInTheDocument();
  expect(servicesLink).toBeInTheDocument();
  expect(contactsLink).toBeInTheDocument();
});
