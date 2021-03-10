import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import URLButton from '../../components/URLButton';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Header = styled.View`
  padding: 15px;
  padding-top: ${getStatusBarHeight() + 15}px;
  background: #28262e;
`;

export const BackButton = styled.TouchableOpacity``;

export const Body = styled.View`
  flex: 1;
  padding: 0 30px 0;
  background: #312e38;
`;

export const HiThere = styled.Text`
  font-size: 15px;
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
  margin: 35px 0 15px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 45px 0 20px;
`;

export const Description = styled.Text`
  font-size: 13px;
  color: #bab8b5;
  font-family: 'RobotoSlab-Medium';
  margin-top: 5px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const URLButtonBase = styled(URLButton)`
  padding: 15px;
  width: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

export const CodeButton = styled(URLButtonBase)`
  background-color: #f05032;
`;

export const WebsiteButton = styled(URLButtonBase)`
  background-color: #006d77;
`;

export const GooglePlayButton = styled(URLButtonBase)`
  background-color: #414141;
`;

export const GithubButton = styled(URLButtonBase)`
  background-color: #181717;
`;

export const StackOverflowButton = styled(URLButtonBase)`
  background-color: #FE7A16;
`;

export const LinkedinButton = styled(URLButtonBase)`
  background-color: #0A66C2;
`;

export const ProtonButton = styled(URLButtonBase)`
  background-color: #8B89CC;
`;
