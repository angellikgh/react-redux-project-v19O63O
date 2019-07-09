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
                    defaultValue={`${isSubmitting ? 'Doing register...' : 'Singup'}`}
                    disabled={isSubmitting}>
                    Signup
                  </Button>
                </Col>
                <Col sm={{ size: 12 }}>
                  <Link
                    className="btn"
                    to="/login">
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