import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isLogin, logout } = this.props

    return (
      <div>
        <Navbar>
          <NavbarBrand href="/">Best Practice!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
            { !!isLogin &&
              <NavItem>              
                <NavLink href="javascript:;" onClick={logout} className="navbar-link">Logout</NavLink>
              </NavItem>
            }
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
