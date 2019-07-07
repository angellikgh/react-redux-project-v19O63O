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

import { NotificationManager } from 'react-notifications';

const Signup = ({ doSignup }) => {
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);
    doSignup({ email, password });
  };
    
  return (
    <main>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Row>
        <Col>
          <h1>Signup</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input 
                type="email" 
                name="email" 
                id="exampleEmail" 
                placeholder="Email" 
                value={email}
                onChange={event => { setEmail(event.target.value) }}/>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="examplePassword" 
                placeholder="Password"
                value={password}
                onChange={event => { setPassword(event.target.value) }} />
            </FormGroup>
            <FormGroup required>
              <Label for="examplePassword">Confirm Password</Label>
              <Input
                type="password" 
                name="confirm_password" 
                id="confirm_password" 
                placeholder="Password" 
                />
            </FormGroup>
            <FormGroup>
              <CustomInput type="checkbox" id="exampleCustomInline" label="Check me out" inline />
            </FormGroup>
            <FormGroup>
              <Button
                className="btn btn-primary"
                defaultValue={`${isSubmitting ? 'Doing register...' : 'Singup'}`}
                disabled={isSubmitting}>
                Signup
              </Button>
              <Link
                className="btn"
                to="/login">
                Back
              </Link>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  user: userSelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    doSignup: () => dispatch(doSignup()),
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