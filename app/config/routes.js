import LoginForm from '../components/LoginForm';
import Repositories from '../components/Repositories';
import Commits from '../components/Commits';
import Search from '../components/Search';

const Routes = {
  Login: {screen: LoginForm},
  Repositories: {screen: Repositories},
  Commits: {screen: Commits},
  Search: {screen: Search}
}

export default Routes;
