import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 40px;
  background: #312e38;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 3;
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 98px;
  align-self: center;
`;
