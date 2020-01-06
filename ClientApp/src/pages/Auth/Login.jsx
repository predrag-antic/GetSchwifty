import React, { Component } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import {thunk_action_login} from '../../store/actions/auth-actions'
import {store} from '../../App'
import {connect} from 'react-redux'

class Login extends Component {    

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            usernameError:false,
            usernameCorrect:false,
            passwordError:false,
            passwordCorrect:false
         }
    }

    checkUsername=(username)=>{
        if(username.length<=8){
            this.setState({"usernameError":true})
            return false;
        }
        this.setState({"usernameError":false})
        return true;
    }

    checkPassword=(password)=>{
        if(password.length<=8){
            this.setState({"passwordError":true})
            return false;
        }
        this.setState({"passwordError":false})
        return true;
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        if(this.state.username.length>=8){
            this.setState({"usernameCorrect":true})
        }else {
            this.setState({"usernameCorrect":false})
        }
        if(this.state.password.length>=8){
            this.setState({"passwordCorrect":true})
        }else {
            this.setState({"passwordCorrect":false})
        }
     }

    handleSubmit=()=>{
        const {username,password} = this.state;
        if(this.checkUsername(username) && this.checkPassword(password)){
            const credentials = {
                name:username,
                password:password
            }
            store.dispatch(thunk_action_login(credentials))
        }

    }

  render () {
    const {username,password,passwordError,usernameError,usernameCorrect,passwordCorrect} = this.state;
    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label>Username</label>
                        <input  onChange={this.onChange} type="text" name="username" className="form-control " id="validationCustom01" placeholder="Username" value={username} required/>
                    {
                        usernameError?
                        <small  style={{"color":"red"}}>Username must contain at least 8 characters!</small>
                        :
                        usernameCorrect?
                        <small  style={{"color":"green"}}>Looks good!</small>
                        :
                        <small/>
                    }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Password</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="inputPassword" placeholder="Password"
                        value={password} name="password" required/>
                    {
                        passwordError?
                        <small style={{"color":"red"}}>Password must contain at least 8 characters!</small>
                        :
                        passwordCorrect?
                        <small  style={{"color":"green"}}>Looks good!</small>
                        :
                        <small/>
                    }
                    </div>
                </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
            <small className='ml-3'>Don't have an account? <Link to="/register">Register</Link></small>
            {
            this.props.current_user===null?
            <div class="alert alert-danger" role="alert">
                Change your username or password. And try again.
            </div>
            :
            <p/>
            }
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        current_user:state.current_user
    }
}


export default connect(mapStateToProps,null)(Login);