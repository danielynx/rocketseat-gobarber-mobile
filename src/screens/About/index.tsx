import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Body,
  HiThere,
  Title,
  Description,
  ButtonRow,
  CodeButton,
  WebsiteButton,
  GooglePlayButton,
  GithubButton,
  StackOverflowButton,
  LinkedinButton,
  ProtonButton,
} from './styles';

const About: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}>
              <FeatherIcon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <HeaderTitle>
              About
            </HeaderTitle>
          </Header>
          <Body>

            <HiThere>Hi there, I'm Daniel Backes</HiThere>
            <Description>
              I devoloped this app during the Rocketseat GoStack course.
            </Description>
            <Description>
              After that, I added some more features to finish them.
            </Description>

            <Title>See also:</Title>
            <ButtonRow>
              <CodeButton url="https://github.com/danielbackes/rocketseat-gobarber-mobile">
                <FontAwesomeIcon name="git" size={24} color="#fff" />
              </CodeButton>
              <WebsiteButton url="https://gobarber.danielbackes.dev">
                <FontAwesomeIcon name="globe" size={24} color="#fff" />
              </WebsiteButton>
              <GooglePlayButton url="https://play.google.com/store/apps/details?id=dev.danielbackes.gobarber">
                <FontAwesomeIcon name="google" size={24} color="#fff" />
              </GooglePlayButton>
            </ButtonRow>

            <Title>Connect with me:</Title>
            <ButtonRow>
              <GithubButton url="https://github.com/danielbackes">
                <FontAwesomeIcon name="github" size={24} color="#fff" />
              </GithubButton>
              <StackOverflowButton url="https://stackoverflow.com/users/10463549/daniel-backes">
                <FontAwesomeIcon name="stack-overflow" size={24} color="#fff" />
              </StackOverflowButton>
              <LinkedinButton url="https://www.linkedin.com/in/daniel-backes-73177224">
                <FontAwesomeIcon name="linkedin" size={24} color="#fff" />
              </LinkedinButton>
              <ProtonButton url="mailto:danielbackes@protonmail.com">
                <FontAwesomeIcon name="envelope" size={24} color="#fff" />
              </ProtonButton>
            </ButtonRow>
          </Body>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default About;

