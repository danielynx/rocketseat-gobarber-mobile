import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import noAvatarImg from '../../assets/no-avatar.png';

import {
  Container,
  Title,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Title>
        Bem vindo,
        {'\n'}
        <UserName>{user.name}</UserName>
      </Title>

      <ProfileButton onPress={navigateToProfile}>
        {user.avatar_url
          ? (<UserAvatar source={{ uri: user.avatar_url }} />)
          : (<UserAvatar source={noAvatarImg} />)
        }
      </ProfileButton>
    </Container>
  );
};

export default Header;
