import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import noAvatarImg from '../../assets/no-avatar.png';

import {
  Container,
  Header,
  BackButton,
  Title,
  Body,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .required('E-mail required')
            .email('Invalid e-mail'),
          password: Yup.string(),
          password_confirmation: Yup.string().when('password', {
            is: val => !!val.length,
            then: Yup.string().equals(
              [Yup.ref('password')],
              'Passwords must match',
            ),
          }),
          old_password: Yup.string().when('password', {
            is: val => !!val.length,
            then: Yup.string().required('Current password required'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          password_confirmation,
          old_password,
        } = data;

        const formData = {
          name,
          email,
          ...(password
            ? { password, password_confirmation, old_password }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Profile updated!',
          'Your profile information was successfully updated.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Profile update error', 'An error happend, try again.');
      }
    },
    [updateUser, navigation],
  );

  const handleUpdateAvatar = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0 });

    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('An error happend, try again.');

        return;
      }

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('/users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      });
    });
  }, [updateUser, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      if (nameInputRef.current?.isFocused() || emailInputRef.current?.isFocused()) {
        scrollViewRef.current?.scrollTo({ y: 0 });
      } else {
        scrollViewRef.current?.scrollToEnd();
      }
    });

    return () => Keyboard.removeAllListeners('keyboardDidShow');
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <Title>
              My profile
            </Title>
          </Header>

          <ScrollView ref={scrollViewRef}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              style={{ flex: 1 }}
            >
              <Body>
                <UserAvatarButton onPress={handleUpdateAvatar}>
                  {user.avatar_url
                    ? (<UserAvatar source={{ uri: user.avatar_url }} />)
                    : (<UserAvatar source={noAvatarImg} />)
                  }
                </UserAvatarButton>

                <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    ref={nameInputRef}
                    name="name"
                    icon="user"
                    placeholder="Name"
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                  />
                  <Input
                    ref={emailInputRef}
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                  />
                  <Input
                    ref={passwordInputRef}
                    name="password"
                    icon="lock"
                    placeholder="New password"
                    secureTextEntry
                    textContentType="newPassword"
                    returnKeyType="next"
                    containerStyle={{ marginTop: 16 }}
                    onSubmitEditing={() => {
                      passwordConfirmationInputRef.current?.focus();
                    }}
                  />

                  <Input
                    ref={passwordConfirmationInputRef}
                    name="password_confirmation"
                    icon="lock"
                    placeholder="Confirmation password"
                    secureTextEntry
                    textContentType="newPassword"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      oldPasswordInputRef.current?.focus();
                    }}
                  />

                  <Input
                    ref={oldPasswordInputRef}
                    name="old_password"
                    icon="lock"
                    placeholder="Current password"
                    secureTextEntry
                    textContentType="newPassword"
                    returnKeyType="send"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                  />
                </Form>

                <Button
                  onPress={() => formRef.current?.submitForm()}
                >
                  Confirm
                </Button>
              </Body>
            </TouchableWithoutFeedback>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
