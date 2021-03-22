import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import noAvatarImg from '../../assets/no-avatar.png';
import Header from '../partials/Header';

import {
  Container,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersEmpty
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Hairdresser: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('providers')
      .then(response => {
        setProviders(response.data);
      })
      .catch(() => signOut());
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header />

      <ProviderList
        data={providers}
        keyExtractor={provider => provider.id}
        ListEmptyComponent={<ProvidersEmpty>There isn't any hairdresser</ProvidersEmpty>}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            {provider.avatar_url
              ? (<ProviderAvatar source={{ uri: provider.avatar_url }} />)
              : (<ProviderAvatar source={noAvatarImg} />)
            }

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Monday to Friday</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h to 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Hairdresser;
