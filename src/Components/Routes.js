import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Routes/Home';
import ClassRoom from '../Routes/Class/ClassRoom';
import Gallary from '../Routes/Gallary';
import SignIn from '../Routes/Auth/SignIn';
import Profile from '../Routes/Profile';
import PostDetail from '../Routes/PostDetail';
import ImageUpload from '../Routes/ImageUpload';
import SeeProfile from '../Routes/SeeProfile';
import EditProfile from '../Routes/EditProfile';
import UploadDemerit from '../Routes/UploadDemerit';
import ClassDetail from '../Routes/Class/ClassDetail';
import ClassUser from '../Routes/Class/ClassUser';
import SearchUser from '../Routes/SearchUser';
import UploadMerit from '../Routes/UploadMerit';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/upload/demerit" component={UploadDemerit} />
    <Route exact path="/upload/merit" component={UploadMerit} />
    <Route exact path="/searchUser" component={SearchUser} />
    <Route exact path="/classroom" component={ClassRoom} />
    <Route exact path="/classroom/:id" component={ClassDetail} />
    <Route exact path="/classroom/:id/user" component={ClassUser} />
    <Route exact path="/gallary" component={Gallary} />
    <Route exact path="/gallary/upload/image" component={ImageUpload} />
    <Route exact path="/gallary/:id" component={PostDetail} />
    <Route exact path="/me" component={Profile} />
    <Route exact path="/profile/:username" component={SeeProfile} />
    <Route exact path="/profile/:username/edit" component={EditProfile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/SignIn" component={SignIn} />
    <Route exact path="/gallary" component={Gallary} />
    <Route exact path="/gallary/:id" component={PostDetail} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
