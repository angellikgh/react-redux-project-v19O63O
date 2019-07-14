/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { Switch, Route } from 'react-router-dom';

import UsersPage from 'containers/Users/Loadable';
import LoginPage from 'containers/Login/Loadable';
import SignupPage from 'containers/Signup/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import AuthRoute from '../../components/AuthRoute'
import { logout } from './actions'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.Component {
  
  handleLogout = () => {
    const { logout } = this.props
    console.log(this.props)
    logout()  
    window.locaiton.href = "./"
  }

  render() {
    let authToken = localStorage.getItem("token") ? true : false;
    return (
      <AppWrapper>  
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Header logout={this.handleLogout} isLogin={authToken}/>
        {authToken ? (
          <Switch>
            <Route path="/users" component={UsersPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>) : (
          <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          </Switch>
        )}
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

const mapPropsState = () => {

}

const mapProp = () => {

}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
