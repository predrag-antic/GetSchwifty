import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark mb-5" light>
          <Container>
            <NavbarBrand tag={Link} to="/" style={{color:"#FE7447"}}>GetSchwifty</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/places">Places</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/bands">Bands</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
