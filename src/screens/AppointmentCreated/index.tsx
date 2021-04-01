import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: Date;
}

const AppointmentCreated: React.FC = () => {
  const route = useRoute();
  const { navigate, reset } = useNavigation();

  const { date } = route.params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Hairdresser' }],
      index: 0,
    });

    navigate('Appointments');
  }, [navigate, reset]);

  const formattedDate = useMemo(() => {
    return format(date, "EEEE, MMMM dd, yyyy, 'at' hhbbbb");
  }, [date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Appointment created</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
