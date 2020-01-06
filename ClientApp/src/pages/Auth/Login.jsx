import React, { Component } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import {thunk_action_login} from '../../store/actions/auth-actions'
import {store} from '../../App'

class Login extends Component {    

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
         }
    }


    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    handleSubmit=()=>{
        const {username,password} = this.state;
        const credentials = {
            name:username,
            password:password
        }

        store.dispatch(thunk_action_login(credentials))

    }

  render () {
    const {username,password} = this.state;
    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label>Username</label>
                        <input onChange={this.onChange} type="text" name="username" className="form-control" id="validationCustom01" placeholder="Username" value={username} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Password</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="inputPassword" placeholder="Password"
                        value={password} name="password" required/>
                    </div>
                </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
            <small className='ml-3'>Don't have an account? <Link to="/register">Register</Link></small>
        </div>
    );
  }
}

export default Login;