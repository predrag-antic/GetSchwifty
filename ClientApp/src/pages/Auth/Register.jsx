import React, { Component } from 'react';
import './login.css'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import {registerNewUser} from '../../service/service.user'
const uuidv1 = require('uuid/v1');

class Register extends Component {    

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            gender:"",
            isOwner:false,
            age:18
         }
    }


    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    handleCheckBoxChange=(isChecked)=>{
        this.setState({'isOwner':isChecked})
    }

    handleGender=(gender)=>{
        this.setState({'gender':gender})
    }

    handleAgeChange=(event)=>{
        const age=Number(event.target.value);
        this.setState({'age':age})
    }

    handleSubmit=()=>{
        const {username,password,gender,isOwner,age} = this.state;
        const userInfo = {
            id:uuidv1(),
            name:username,
            password:password,
            age:age,
            gender:gender,
            isOwner:isOwner
        }
        
        registerNewUser(userInfo).then(response=>{
            if(response.status===200){
                Swal.fire('Register success','','success')
            }else {
                Swal.fire('Error','Somethnig went wrong! Try again!','error')
            }
        })
    }

  render () {
    const {username,password,isOwner,age} = this.state;
    return (
        <div className="container form-width">
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
                <div className="form row mt-3">
                    <div className="col">
                        <label>Age</label>
                        <input onChange={(e)=>this.handleAgeChange(e)} type="number" min={18} className="form-control" id="inputAge" placeholder="age..."
                        value={age} name="age" required/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm">
                    <label >Gender:</label>
                    </div>
                    <div className="custom-control custom-radio col-sm">
                        <input onChange={()=>this.handleGender("male")} type="radio" id="customRadio1" name="gender" className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="customRadio1">Male</label>
                    </div>
                    <div className="custom-control custom-radio col-sm">
                        <input onChange={()=>this.handleGender("female")} type="radio" id="customRadio2" name="gender" className="custom-control-input"/>
                        <label className="custom-control-label" htmlFor="customRadio2">Female</label>
                    </div>
                </div>
                <div className="custom-control custom-checkbox mt-3">
                    <input onChange={()=>{this.handleCheckBoxChange(!isOwner)}} type="checkbox" className="custom-control-input" id="customCheck1"
                    value={isOwner} name="isOwner"/>
                    <label className="custom-control-label" htmlFor="customCheck1">You own some places?</label>
                </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
            <small className="ml-3">Already a user? <Link to="/login">Login</Link></small>
        </div>
    );
  }
}

export default Register;