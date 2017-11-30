import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements';
import { usernameChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from './common';
import { StackNavigator, NavigationActions } from "react-navigation";

class LoginForm extends Component {

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password } = this.props;
    this.props.loginUser({ username, password});
  }

  static navigationOptions = ({navigation}) => ({
        title: 'Login',
        headerStyle: {height: 0}
    });

  renderButton() {
    if(this.props.loading) {
      return <Spinner size='small'/>;
    }
    return (
      <Button title='Login' fontSize={20} backgroundColor='#009688' onPress={this.onButtonPress.bind(this)}></Button>
    );
  }

  navigateToRepositories() {
    const { username, password } = this.props;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Repositories', params: {username: `${username}`, password: `${password}`}}),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidUpdate() {
    if(this.props.user){
      this.navigateToRepositories();
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#009688'}
          leftComponent={<Image style={{tintColor: '#fff', width:30, height: 30}} source={require('./img/github_logo.png')} />}
          centerComponent={{ text: 'My Github Login', style: { fontSize: 20, color: '#fff' } }}
        />
        <View style={styles.list}>
          <FormLabel labelStyle={styles.labelStyle}>Username</FormLabel>
          <FormInput
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
            placeholder='username'
          />
          <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
          <FormInput
            secureTextEntry
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            placeholder='password'
          />
        </View>
        <View>{this.renderButton()}</View>
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginTop: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 30
  },
  labelStyle: {
    fontSize: 20
  },
  errorStyle: {
    color: '#f00',
    fontSize: 20,
    alignSelf: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  const { username, password, user, error, loading } = auth;
  return { username, password, user, error, loading };
};

export default connect(mapStateToProps, { usernameChanged, passwordChanged, loginUser })(LoginForm);
