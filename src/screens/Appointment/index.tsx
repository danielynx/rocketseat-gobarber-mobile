import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format, parseISO, isBefore } from 'date-fns';

import api from '../../services/api';
import noAvatarImg from '../../assets/no-avatar.png';
import Header from '../partials/Header';

import {
  Container,
  AppointmentList,
  AppointmentContainer,
  AppointmentAvatar,
  AppointmentInfo,
  ProviderName,
  AppointmentMeta,
  AppointmentMetaText,
  AppointmentsEmpty
} from './styles';
import { Alert } from 'react-native';

export interface Appointment {
  id: string;
  date: string,
  provider: {
    name: string;
    avatar_url: string;
  };
}

export interface FormatedAppointment {
  id: string;
  day: string;
  hour: string;
  past: boolean;
  provider: {
    name: string;
    avatar_url: string;
  };
}

const Appointment: React.FC = () => {
  const [appointments, setAppointments] = useState<FormatedAppointment[]>([]);

  useEffect(() => {
    api.get<Appointment[]>('appointments/user/me')
      .then(response => {
        const now = new Date();

        const formatedAppointments = response.data.map(({ id, date, provider }: Appointment) => {
          const parsedDate = parseISO(date);

          return {
            id,
            day: format(parsedDate, "eee', 'MMM' 'dd', 'yyyy"),
            hour: format(parsedDate, "HH:ss' h'"),
            past: isBefore(parsedDate, now),
            provider,
          };
        });

        setAppointments(formatedAppointments);
      });
  }, []);

  return (
    <Container>
      <Header />

      <AppointmentList
        data={appointments}
        keyExtractor={appointment => appointment.id}
        ListEmptyComponent={<AppointmentsEmpty>There isn't any appointment</AppointmentsEmpty>}
        renderItem={({ item: { id, day, hour, past, provider: { name, avatar_url } } }) => (
          <AppointmentContainer past={past}>
            {avatar_url
              ? (<AppointmentAvatar source={{ uri: avatar_url }} />)
              : (<AppointmentAvatar source={noAvatarImg} />)
            }

            <AppointmentInfo>
              <ProviderName>{name}</ProviderName>

              <AppointmentMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <AppointmentMetaText>{day}</AppointmentMetaText>
              </AppointmentMeta>

              <AppointmentMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <AppointmentMetaText>{hour}</AppointmentMetaText>
              </AppointmentMeta>
            </AppointmentInfo>
          </AppointmentContainer>
        )}
      />
    </Container>
  );
};

export default Appointment;
