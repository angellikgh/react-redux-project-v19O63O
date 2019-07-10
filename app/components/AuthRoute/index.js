import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

class AuthRoute extends React.Component {
  static propTypes = {
    // auth: PropTypes.object,
  }

  renderByAuth = () => {
    const { component: Component, location } = this.props
    let props = this.props
    console.log(localStorage.getItem("token"))
    let redirectPath
    let isLogin = localStorage.getItem("token") ? true : false;

    if( !isLogin ) {
        redirectPath = '/'
    }

    return redirectPath ? <Redirect to={{
      pathname: redirectPath,
      state: { from: location }
    }}/> : <Component {...props}/>
  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={this.renderByAuth}/>
    )
  }
}

const mapStateToProps = (state) => ({
//   auth: state.app.token || {}
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
