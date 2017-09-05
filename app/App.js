import React,  { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import getRootReducer from "./reducers";
import ReduxThunk from 'redux-thunk';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import LoginForm from './components/LoginForm';
import Repositories from './components/Repositories';
import Routes from './config/routes';

const AppNavigator = StackNavigator(Routes);

export const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const AppIndex = connect(state => ({nav: state.nav}))(AppWithNavigationState);

export default App = () => {
  const store = createStore(getRootReducer(navReducer), {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};
