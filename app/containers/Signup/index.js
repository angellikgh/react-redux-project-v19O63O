import React, { useEffect, memo, useState, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { datetimeFormat } from '../../helper/datetimeHelper'

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom"
import { Row, Col, Button, Form, Input, Label, FormGroup, CustomInput } from 'reactstrap';

import { doSignup } from './actions';
import { userSelector } from './selectors'

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer'
import saga from './saga'

const key = 'signup';

import { NotificationManager, NotificationContainer } from 'react-notifications';
import { makeSelectError, makeSelectLoading } from '../App/selectors';

const Signup = ({ doSignup, loading, error }) => {
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    doSignup({ email, password });
  };

  useEffect((error) => {
    if( error ) NotificationManager.error('Failed! Some issue occured.')
  }, [error])
    
  return (
    <main>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <NotificationContainer />
      <Row>
        <Col>
          <div className="signup-panel">
            <span>Signup</span>
              <Form onSubmit={handleSubmit}>
              <FormGroup>
                  <Input 
                    type="email" 
                    name="email" 
                    id="exampleEmail" 
                    placeholder="Email" 
                    value={email}
                    onChange={event => { setEmail(event.target.value) }}/>
                </FormGroup>
                <FormGroup>
                <Input 
                  type="password" 
                  name="password" 
                  id="examplePassword" 
                  placeholder="Password"
                  value={password}
                  onChange={event => { setPassword(event.target.value) }} />
              </FormGroup>
              <FormGroup required>
                <Input
                  type="password" 
                  name="confirm_password" 
                  id="confirm_password" 
                  placeholder="Confirm Password" 
                  />
              </FormGroup>
              <FormGroup>
                <CustomInput type="checkbox" id="exampleCustomInline" label="I agree with Terms & Conditions" inline />
              </FormGroup>
              <FormGroup className="form-footer">
                <Col sm={{ size: 12 }}>
                  <Button
                    className="btn btn-primary"
                    defaultValue={`${loading ? 'Doing register...' : 'Singup'}`}
                    disabled={loading}>
                    Signup
                  </Button>
                </Col>
                <Col sm={{ size: 12 }}>
                  <Link
                    className="btn"
                    to="/">
                    Back
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  user: userSelector(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    doSignup: (user) => dispatch(doSignup(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Signup);