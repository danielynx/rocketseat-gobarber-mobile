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
import { Alert, RefreshControl } from 'react-native';

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
  const [refreshing, setRefreshing] = useState(false);
  const [appointments, setAppointments] = useState<FormatedAppointment[]>([]);

  const formatAppointments = (appointments: Appointment[]): FormatedAppointment[] => {
    const now = new Date();

    return appointments.map(({ id, date, provider }: Appointment) => {
      const parsedDate = parseISO(date);

      return {
        id,
        day: format(parsedDate, "eee', 'MMM' 'dd', 'yyyy"),
        hour: format(parsedDate, "HH:ss' h'"),
        past: isBefore(parsedDate, now),
        provider,
      };
    });
  }

  useEffect(() => {
    (async () => {
      const response = await api.get<Appointment[]>('appointments/user/me');

      const formatedAppointments = formatAppointments(response.data);

      setAppointments(formatedAppointments);
    })();
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);

    (async () => {
      const response = await api.get<Appointment[]>('appointments/user/me');

      const formatedAppointments = formatAppointments(response.data);

      setAppointments(formatedAppointments);

      setRefreshing(false);
    })();

  }, []);

  return (
    <Container>
      <Header />

      <AppointmentList
        data={appointments}
        keyExtractor={appointment => appointment.id}
        ListEmptyComponent={<AppointmentsEmpty>There isn't any appointment</AppointmentsEmpty>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
