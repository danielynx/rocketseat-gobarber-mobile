import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isSending, setIsSending] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Invalid e-mail'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsSending(true);

        await api.post('/passwords/forgot', {
          email: data.email,
        });

        Alert.alert(
          'Recovery e-mail sended.',
          'We sent an e-mail to complete the password recovery process.',
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Forgot password error',
          'Something goes wrong. Try again.',
        );
      } finally {
        setIsSending(false);
      }
    },
    [signIn],
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
              <Title>Forgot password</Title>
            </View>

            <Form ref={formRef} onSubmit={handleForgotPassword}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="send"
                editable={!isSending}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
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
                <EmailSending>Wait until the e-mail is sending.</EmailSending>
              </View>
            }

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />

        <BackToSignInText>Go back</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default ForgotPassword;
