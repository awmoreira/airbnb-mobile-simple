import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '~/services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  SuccessMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
    error: '',
    success: '',
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  handleSignUpPress = async () => {
    const { username, email, password } = this.setState;
    if (email.length === 0 || password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        await api.post('/users', {
          username,
          email,
          password,
        });

        this.setState({
          success: 'Conta criada com sucesso! Redirecionando para o login',
          error: '',
        });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, tente novamente mais tarde!' });
      }
    }
  };

  goToLogin = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    });
    navigation.dispatch(resetAction);
  };

  render() {
    const {
      username, email, password, success, error,
    } = this.state;
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('~/images/airbnb_logo.png')} resizeMode="contain" />
        {success.length !== 0 && <SuccessMessage>{success}</SuccessMessage>}
        <Input
          placeholder="Seu nome de usuário"
          value={username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço de e-mail"
          value={email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
        <Button onPress={this.handleSignUpPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleBackToLoginPress}>
          <SignUpLinkText>Voltar ao login</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}
