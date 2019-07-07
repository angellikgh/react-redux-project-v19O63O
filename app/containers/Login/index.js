import React, { useEffect, memo, useState, useReducer } from 'react';
import _ from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid'

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom"
import { Row, Col, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { getUsers } from './actions';
import { makeSelectUsers } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Login({
  users,
  getUsers,
  loading,
  error,
}) {
  const [sort, setSort] = useState({ field: null, isDesc: false });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
      getUsers();
  }, [getUsers]);

  function handleSubmit(field) {
    
  }

  return (
    <main>
      <Helmet>
        <title>Login in</title>
        <meta
          name="description"
          content="A React.js Boilerplate application | Sign up"
        />
      </Helmet>
      
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1>Login</h1>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <CustomInput type="checkbox" id="exampleCustomInline" label="Check me out" inline />
            </FormGroup>
            <FormGroup>
              <Button 
                click={() => {}} >
                Login
              </Button>
            </FormGroup>
            <Link to="/signup">
              Not signup?
            </Link>
          </Form>
        </Col>
      </Row>
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUsers: getUsers
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);