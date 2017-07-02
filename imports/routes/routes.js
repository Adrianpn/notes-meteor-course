import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import  Login  from '../ui/Login';
import  Signup  from '../ui/Signup';
import  Dashboard  from '../ui/Dashboard';
import  NotFound  from '../ui/NotFound';

//window.browserHistory = browserHistory;

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};
const onLeaveNotePage = (nextState) => {
  Session.set('selectedNoteId', undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/Dashboard" component={Dashboard} privacy="auth" />
      <Route path="/Dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
