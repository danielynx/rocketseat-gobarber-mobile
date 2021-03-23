import styled from 'styled-components/native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs<RectButtonProperties>(props => ({
  enabled: (props.enabled === undefined || props.enabled) ? true : false,
}))`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
  opacity: ${props => (props.enabled ? 1 : 0.5)};
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
