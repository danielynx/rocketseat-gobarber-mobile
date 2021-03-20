import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 15px;
  padding-top: ${getStatusBarHeight() + 15}px;
  background: #28262e;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 20;
`;

export const HeaderTitle = styled.Text`
  flex: 38;
  font-size: 25px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 40px;
  background: #312e38;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 98px;
  align-self: center;
`;
