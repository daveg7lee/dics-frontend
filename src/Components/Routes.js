import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../Routes/Auth/SignIn';
import Profile from '../Routes/Profile';
import SeeProfile from '../Routes/SeeProfile';
import EditProfile from '../Routes/EditProfile';
import UploadDemerit from '../Routes/UploadDemerit';
import SearchUser from '../Routes/SearchUser';
import UploadMerit from '../Routes/UploadMerit';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Profile} />
    <Route exact path="/upload/demerit" component={UploadDemerit} />
    <Route exact path="/upload/merit" component={UploadMerit} />
    <Route exact path="/searchUser" component={SearchUser} />
    <Route exact path="/:username" component={SeeProfile} />
    <Route exact path="/:username/edit" component={EditProfile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
