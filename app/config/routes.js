import LoginForm from '../components/LoginForm';
import Repositories from '../components/Repositories';
import Commits from '../components/Commits';
import { StackNavigator } from 'react-navigation';

const Routes = {
  Login: {screen: LoginForm},
  Repositories: {screen: Repositories},
  Commits: {screen: Commits}
}

export default Routes;
