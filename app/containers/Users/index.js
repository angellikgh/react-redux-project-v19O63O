// import React, { Component, useEffect, memo } from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { Row, Table } from 'reactstrap';
// import { createStructuredSelector } from 'reselect';

// import { makeSelectUsers } from './selectors';
// import { getUsers } from './actions';

// class Users extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentWillMount() {
//     console.log('[Users] props:', this.props);
//     this.props.getUsers();
//   }

//   render() {
//     const { users } = this.props;
//     console.log('[User] user:', users)
//     return (
//       <Row>
//         <Table>
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Email</th>
//               <th>Created Date</th>
//               <th />
//             </tr>
//           </thead>
//           <tbody>
//             {
//               users && users.map((user, index) => (
//                 <tr key={index}>
//                   <td>{ index }</td>
//                   <td>{ user.id }</td>
//                   <td>{ user.email }</td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </Table>
//       </Row>
//     );
//   }
// }

// const mapStateToProps = createStructuredSelector({
//   users: makeSelectUsers(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//     getUsers,
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


import React, { useEffect, memo, useState } from 'react';
import axios from 'axios'
import _ from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid'
import { datetimeFormat } from '../../helper/datetimeHelper'


import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Table, Button } from 'reactstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { getUsers } from './actions';
import { makeSelectUsers } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Users({
  // users,
  // getUsers,
  loading,
  error,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  const [users, setUser] = useState([]);
  const [sort, setSort] = useState({ field: null, isDesc: false });

  function handleSort(field) {
    let sortedUsers = []
      , isDesc = sort.isDesc
      
    if( isDesc ) { 
      sortedUsers = _.orderBy(users, [`${field}`], ['asc']);
      isDesc = false
    } else {
      sortedUsers = _.orderBy(users, [`${field}`], ['desc']);
      isDesc = true
    }
    setSort({ field, isDesc: isDesc })
    setUser(sortedUsers)
  }

  function displaySort( isDesc ) {
    return (
      isDesc
        ? <FontAwesomeIcon icon={faSortUp} />
        : <FontAwesomeIcon icon={faSortDown} />
    )
  }

  useEffect(() => {
      async function getUsers() {

        const result = await axios(
          'http://localhost:8000/users',
        );

        setUser(result.data);

      }

      getUsers()

    }, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Row>
        <Col>
          <Table striped>
            <thead>
                <tr>
                  <th>
                    No
                  </th>
                  <th onClick={() => { handleSort('email') }}>
                    Email
                    { 
                      sort.field === "email" 
                      && displaySort( sort.isDesc )
                    }                                   
                  </th>
                  <th onClick={() => { handleSort('created_at') }}>
                    Created Date
                    { 
                      sort.field === "created_at" 
                      && displaySort( sort.isDesc )
                    }
                  </th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {
                  users && users.map((user, index) => (
                    <tr key={index}>
                      <td>{ index + 1 }</td>
                      <td>{ user.email }</td>
                      <td>{ datetimeFormat( user.created_at ) }</td>
                      <td>
                        <Button color="danger">
                          <FontAwesomeIcon icon="trash" />
                        </Button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </article>
  );
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUsers: evt => dispatch(getUsers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Users);