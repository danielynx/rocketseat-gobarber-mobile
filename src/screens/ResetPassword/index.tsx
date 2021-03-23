import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  EmailSending
} from './styles';

interface RouteParams {
  token: string;
}

interface ResetPasswordFormData {
  newPassword: string;
}

const ResetPassword: React.FC = () => {
  const [isSending, setIsSending] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const route = useRoute();
  const { token } = route.params as RouteParams;

  const handleResetPassword = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          newPassword: Yup.string().required('Password required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsSending(true);

        await api.post('/passwords/reset', {
          password: data.newPassword,
          password_confirmation: data.newPassword,
          token,
        });

        Alert.alert(
          'Password recovery success.',
          'The password was changed with success.',
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Password recovery error',
          'An error happened on the password recovery.',
        );
      } finally {
        setIsSending(false);
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Reset password</Title>
            </View>

            <Form ref={formRef} onSubmit={handleResetPassword}>
              <Input
                name="newPassword"
                icon="lock"
                placeholder="New password"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              enabled={!isSending}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirm
            </Button>

            {isSending &&
              <View>
                <EmailSending>Wait until your password is changed.</EmailSending>
              </View>
            }

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="x-square" size={20} color="#fff" />

        <BackToSignInText>Cancel</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default ResetPassword;
