import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {connect} from 'react-redux'
import {store} from '../../App'
import {thunk_action_getUserById} from '../../store/actions/user-actions'

class NavMenu extends Component {
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

  handleLogout=()=>{
    localStorage.clear();
    window.location.reload(true);
  }

  handleClick=(userId)=>{
    store.dispatch(thunk_action_getUserById(userId));
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
                {
                  localStorage.getItem("id")?
                  this.props.current_user.isOwner?
                  <NavItem>
                    <NavLink tag={Link} className="text-light" to="/create-place">Create Place</NavLink>
                  </NavItem>
                  :
                  null
                  :
                  null
                }
                {
                  localStorage.getItem("id")?
                  this.props.current_user.isOwner?
                  <NavItem>
                    <NavLink tag={Link} className="text-light" to="/play">Add event</NavLink>
                  </NavItem>
                  :
                  null
                  :
                  null
                }
                {
                localStorage.getItem("id")?
                <NavItem>
                  <div onClick={()=>this.handleClick(this.props.current_user.id)}>
                    <NavLink tag={Link} className="text-light" to={{pathname:`/user/${this.props.current_user.id}`}}>
                      Profile
                    </NavLink>
                  </div>
                </NavItem>
                :
                null
                }
                {
                !localStorage.getItem("id")?
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/login">Login</NavLink>
                </NavItem>
                :
                null
                }
                {
                !localStorage.getItem("id")?
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                </NavItem>
                :
                <div className="btn btn-outline-primary" onClick={this.handleLogout}>
                  Logout
                </div>
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state){
  return {
      current_user:state.current_user
  }
}


export default connect(mapStateToProps,null)(NavMenu);