import React, { useEffect, memo, useState } from 'react';
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

import StyledTable from './StyledTable'

const key = 'home';

export function Users({
  users,
  getUsers,
  loading,
  error,
}) {
  const [sort, setSort] = useState({ field: null, isDesc: false });
  const [sortedUsers, sortUsers] = useState([])
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {
    sortUsers(users)
  }, [users]);

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
    sortUsers(sortedUsers)
  }

  function displaySort( isDesc ) {
    return (
      isDesc
        ? <FontAwesomeIcon icon={faSortUp} />
        : <FontAwesomeIcon icon={faSortDown} />
    )
  }

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
        <Col className="user-list">
          <StyledTable>
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
                  sortedUsers && sortedUsers.map((user, index) => (
                    <tr key={user.id}>
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
          </StyledTable>
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
    getUsers: () => dispatch(getUsers()),
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