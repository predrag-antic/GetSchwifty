import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom';
import {createNewPlace} from '../service/service.user'
import {addPlaceToMyPlaces} from '../store/actions/user-actions'
import {connect} from 'react-redux'

class CreatePlace extends Component {    

    constructor(props){
        super(props);
        this.state={
            name:"",
            address:"",
            phone:"",
            imageUrl:"",
            nameError:false,
            addressError:false,
            phoneError:false,
            imageUrlError:false
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    checkInput=()=>{
        const {name,imageUrl,phone,address} = this.state;
        var noError=true;

        if(name.length<=7){
            this.setState({"nameError":true})
            noError=false;
        }else {
            this.setState({"nameError":false})
        }

        if(imageUrl.length===0){
            this.setState({"imageUrlError":true})
            noError=false;
        }else {
            this.setState({"imageUrlError":false})
        }

        if(address.length<=7){
            this.setState({"addressError":true})
            noError=false;
        }else {
            this.setState({"addressError":false})
        }

        if(phone.length<=7){
            this.setState({"phoneError":true})
            noError=false;
        }else {
            this.setState({"phoneError":false})
        }

        return noError;
    }

    handleSubmit=()=>{
        const {name,phone,address,imageUrl} = this.state;
        if(this.checkInput()){

            const place = {
                ownerId:localStorage.getItem("id"),
                name:name,
                address:address,
                phone:phone,
                imageUrl:imageUrl
            }
            createNewPlace(place).then(response=>{
                if(response.status===200){
                    const placeName=response.data.name;
                    console.log(placeName);
                    this.props.addPlaceToMyPlaces(placeName);
                    Swal.fire('Success',`You just created ${placeName}`,'success')
                }else {
                    Swal.fire('Error','Somethnig went wrong! Try again!','error')
                }
            })
        }
    }

  render () {
    const {name,nameError,address,addressError,phone,phoneError,imageUrl,imageUrlError} = this.state;

    // if(localStorage.getItem("id"))
    // {
    //     return <Redirect to="/home" />
    // }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label>Place name</label>
                        <input onChange={this.onChange} type="text" name="name" className="form-control" id="validationCustom01" placeholder="name" value={name} required/>
                        {
                            nameError?
                            <small  style={{"color":"red"}}>Place name must contain at least 8 characters!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Address</label>
                        <input onChange={this.onChange} type="text" name="address" className="form-control" id="validationCustom01" placeholder="address" value={address} required/>
                        {
                            addressError?
                            <small  style={{"color":"red"}}>Address name must contain at least 8 characters!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Phone:</label>
                        <input onChange={this.onChange} type="text" name="phone" className="form-control" id="validationCustom01" placeholder="phone" value={phone} required/>
                        {
                            phoneError?
                            <small  style={{"color":"red"}}>Phone name must contain at least 8 characters!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>ImageUrl:</label>
                        <input onChange={this.onChange} type="text" name="imageUrl" className="form-control" id="validationCustom01" placeholder="imageUrl" value={imageUrl} required/>
                        {
                            imageUrlError?
                            <small  style={{"color":"red"}}>ImageUrl name must contain at least 8 characters!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Post place</button>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return {
        addPlaceToMyPlaces:(name)=>(dispatch(addPlaceToMyPlaces(name)))
    }
}

export default connect(null,mapDispatchToProps)(CreatePlace);