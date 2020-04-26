import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import {getAllVendorsReducer,signupReducer,getAllCategoryReducer,cartReducer,orderplacedReducer} from './signup-reducer';
import {headerReducer} from './header-reducer';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    vendors:ActiveUserReducer,
    isSignupSuccess:signupReducer,
    isLogedIn:headerReducer,
    allVendors:getAllVendorsReducer,
    getAllCategory:getAllCategoryReducer,
    cartlistdatas:cartReducer,
    orderplaced:orderplacedReducer,
});

export default allReducers