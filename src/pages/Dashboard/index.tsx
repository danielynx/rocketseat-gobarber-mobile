import { useNavigation } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/stack';
import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <Title>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </Title>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
