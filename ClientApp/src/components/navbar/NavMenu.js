import React, { Component } from 'react';
import { 
  Collapse, 
  Container, 
  Navbar, 
  NavbarBrand, 
  NavbarToggler, 
  NavItem, 
  NavLink, 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {connect} from 'react-redux'
import {store} from '../../App'
import {thunk_action_getUserById} from '../../store/actions/user-actions'
import user from "../../resources/user-xxl.png"
import list from "../../resources/add-list-xxl.png"

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isOpen: false,
      setIsOpen: false
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
    const {isOpen, setIsOpen} = this.state;
    const toggle = () => setIsOpen(!isOpen);

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
                  <NavLink tag={Link} className="text-light mr-1" to="/bands">Bands</NavLink>
                </NavItem>
                {
                  localStorage.getItem("id")?
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-light">
                    <img src={list} style={{height:"30px",width:"30px"}} alt='profile img'></img>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      {
                        this.props.current_user.isOwner?
                        <NavItem>
                          <NavLink tag={Link} className="text-dark" to="/create-place">Create Place</NavLink>
                        </NavItem>
                        :
                        null
                      }
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/create-band">Create Band</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      {
                        this.props.current_user.isOwner?
                        <NavItem>
                          <NavLink tag={Link} className="text-dark" to="/create-event">Create Event</NavLink>
                        </NavItem>
                        :
                        null
                      }
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      {
                      this.props.current_user.isOwner?
                      <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/play">Add party</NavLink>
                      </NavItem>
                      :
                      null
                      }
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                :
                null
                }
                {
                localStorage.getItem("id")?
                <NavItem>
                  <div onClick={()=>this.handleClick(this.props.current_user.id)}>
                    <NavLink tag={Link} className="text-light" to={{pathname:`/user/${this.props.current_user.id}`}}>
                       <img src={user} style={{height:"30px",width:"30px"}} alt='profile img'></img>
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
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/home" onClick={this.handleLogout}>
                    Logout
                  </NavLink>
                </NavItem>
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