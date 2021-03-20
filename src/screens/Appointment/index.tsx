import React from 'react';

import Header from '../partials/Header';

import {
  Container,
  Title,
} from './styles';

const Appointment: React.FC = () => {
  return (
    <Container>
      <Header />
      <Title>Appointment</Title>
    </Container>
  );
};

export default Appointment;

