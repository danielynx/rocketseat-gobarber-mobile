import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { FormatedAppointment } from './index';

interface AppointmentContainerProps {
  past: boolean;
}

export const Container = styled.View`
  background: #312e38;
`;

export const AppointmentList = styled(FlatList as new () => FlatList<FormatedAppointment>)`
  padding: 32px 24px 16px;
`;

export const AppointmentContainer = styled(RectButton) <AppointmentContainerProps>`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  opacity: ${props => (props.past ? 0.5 : 1)};
`;

export const AppointmentAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const AppointmentInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const AppointmentMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const AppointmentMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Medium';
`;

export const AppointmentsEmpty = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Medium';
`;
