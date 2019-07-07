import React, { useEffect, memo, useState, useReducer } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid'
import { datetimeFormat } from '../../helper/datetimeHelper'

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom"
import { Row, Col, Button, Form, Input, Label, FormGroup, CustomInput } from 'reactstrap';

import { getUsers } from './actions';
import { makeSelectUsers } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

// export function Users({
//   users,
//   getUsers,
//   loading,
//   error,
// }) {
//   const [sort, setSort] = useState({ field: null, isDesc: false });

//   useInjectReducer({ key, reducer });
//   useInjectSaga({ key, saga });

//   useEffect(() => {
//       getUsers();
//   }, [getUsers]);

//   function handleSort(field) {
//     let sortedUsers = []
//       , isDesc = sort.isDesc
      
//     if( isDesc ) { 
//       sortedUsers = _.orderBy(users, [`${field}`], ['asc']);
//       isDesc = false
//     } else {
//       sortedUsers = _.orderBy(users, [`${field}`], ['desc']);
//       isDesc = true
//     }
//     setSort({ field, isDesc: isDesc })
//     setUser(sortedUsers)
//   }

//   function displaySort( isDesc ) {
//     return (
//       isDesc
//         ? <FontAwesomeIcon icon={faSortUp} />
//         : <FontAwesomeIcon icon={faSortDown} />
//     )
//   }

//   return (
    // <main>
    //   <Helmet>
    //     <title>Home Page</title>
    //     <meta
    //       name="description"
    //       content="A React.js Boilerplate application homepage"
    //     />
    //   </Helmet>
    //   <Row>
    //     <Col>
    //       <h1>Signup</h1>
    //       <Form>
    //         <FormGroup>
    //           <Label for="exampleEmail">Email</Label>
    //           <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
    //         </FormGroup>
    //         <FormGroup>
    //           <Label for="examplePassword">Password</Label>
    //           <Input type="password" name="password" id="examplePassword" placeholder="Password" />
    //         </FormGroup>
    //         <FormGroup required>
    //           <Label for="examplePassword">Confirm Password</Label>
    //           <Input 
    //             type="password" 
    //             name="confirm_password" 
    //             id="confirm_password" 
    //             placeholder="Password" />
    //         </FormGroup>
    //         <FormGroup>
    //           <CustomInput type="checkbox" id="exampleCustomInline" label="Check me out" inline />
    //         </FormGroup>
    //         <FormGroup>
    //           <Button 
    //             type="submit">
    //             Signup
    //           </Button>
    //           <Link
    //             className="btn"
    //             to="/login">
    //             Back
    //           </Link>
    //         </FormGroup>
    //       </Form>
    //     </Col>
    //   </Row>
    // </main>
//   );
// }

// const mapStateToProps = createStructuredSelector({
//   users: makeSelectUsers(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//     getUsers: getUsers
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(
//   withConnect,
//   memo,
// )(Users);

import { NotificationManager } from 'react-notifications';
import { doLogin, doSignup } from '../api'
    
const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);
    doSignup({ email, password }).then(
      User => {
        NotificationManager.success('You are now logged in', 'Login Success');
        console.log('Login Successful:', { User });
        //props.setUser(User);
      },
      error => {
        NotificationManager.error('Please try again', 'Login Failed');
        console.log('Login failed with exception:', { error });
        setIsSubmitting(false);
      }
    );
  };
    
  return (
    // <div className='row'>
    //   <div className='col-md-6 login-form mx-auto'>
    //     <h3>Login to Awesome Chat</h3>
    //     <form className='mt-5' onSubmit={handleSubmit}>
    //       <div className='form-group'>
    //         <input
    //           type='text'
    //           name='username'
    //           className='form-control'
    //           placeholder='Your Username'
    //           value={uidValue}
    //           onChange={event => setUidValue(event.target.value)}
    //         />
    //       </div>
    //       <div className='form-group'>
    //         <input
    //           type='submit'
    //           className='btn btn-primary btn-block'
    //           value={`${isSubmitting ? 'Loading...' : 'Login'}`}
    //           disabled={isSubmitting}
    //         />
    //       </div>
    //     </form>
    //   </div>
    // </div>
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
)(Signup);