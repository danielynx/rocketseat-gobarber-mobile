import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { useAuth } from '../../../hooks/auth';
import noAvatarImg from '../../../assets/no-avatar.png';
import type { DrawerParamList } from '../../../navigations/app';

import {
  Container,
  Title,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

type AppDrawerNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<AppDrawerNavigationProp>();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon
          size={24}
          color={'#999591'}
          name={'align-justify'}
        />
      </TouchableOpacity>

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
    </Container >
  );
};

export default Header;
