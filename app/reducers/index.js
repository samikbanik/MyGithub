import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RepositoriesReducer from './RepositoriesReducer';
import CommitsReducer from './CommitsReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: AuthReducer,
        repositories: RepositoriesReducer,
        commits: CommitsReducer
    });
}
