import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import  Login  from '../ui/Login';
import  Signup  from '../ui/Signup';
import  Dashboard  from '../ui/Dashboard';
import  NotFound  from '../ui/NotFound';

window.browserHistory = browserHistory;

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/Dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()){
    browserHistory.replace('/Dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()){
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }

};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/Dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/Dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);
