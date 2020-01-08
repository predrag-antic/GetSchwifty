import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { createNewBand } from '../store/actions/band.actions';
import { createBandService } from '../services/band.service';

class CreatePlace extends Component {    

    constructor(props){
        super(props);
        this.state={
            name:"",
            phone:"",
            type:"",
            imageUrl:"",
            nameError:false,
            uniqueNameError:false,
            phoneError:false,
            typeError:false,
            imageUrlError:false
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    checkInput=()=>{
        const {name,imageUrl,phone,type} = this.state;
        var noError=true;
        var bands = Array.from(this.props.bands);
        
        bands = bands.map(band => {
           return band.name
        })

        if(name.length<=2){
            this.setState({"nameError":true})
            noError=false;
        }else {
            this.setState({"nameError":false})
        }

        if(bands.includes(name)){
            this.setState({"uniqueNameError":true})
            noError=false;
        }else {
            this.setState({"uniqueNameError":false})
        }

        if(imageUrl.length===0){
            this.setState({"imageUrlError":true})
            noError=false;
        }else {
            this.setState({"imageUrlError":false})
        }

        if(type.length===0){
            this.setState({"typeError":true})
            noError=false;
        }else {
            this.setState({"typeError":false})
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
        const {name,phone,type,imageUrl} = this.state;
        if(this.checkInput()){

            const newBand = {
                name:name,
                type:type,
                phone:phone,
                imageUrl:imageUrl
            }
            createBandService(newBand).then(response=>{
                if(response.status===200){
                    const bandName=response.data.name;
                    this.props.createNewBand(bandName);
                    Swal.fire('Success',`You just created ${bandName}`,'success')
                }else {
                    Swal.fire('Error','Somethnig went wrong! Try again!','error')
                }
            })
            
            
        }
    }

  render () {
    const {name,nameError,typeError,phone,phoneError,imageUrl,imageUrlError,uniqueNameError,type} = this.state;

    if(!localStorage.getItem("id") )
    {
        return <Redirect to="/home" />
    }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label>Name:</label>
                        <input onChange={this.onChange} type="text" name="name" className="form-control" placeholder="Please insert band name" value={name} required/>
                        {
                            nameError?
                            <small  style={{"color":"red"}}>Band name must contain at least 2 characters!</small>
                            :
                            <small/>
                        }
                        {
                            uniqueNameError?
                            <small  style={{"color":"red"}}>Band name already exists!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Type:</label>
                        <input onChange={this.onChange} type="text" name="type" className="form-control" placeholder="Please insert music type of band" value={type} required/>
                        {
                            typeError?
                            <small  style={{"color":"red"}}>Type can not be empty!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Phone:</label>
                        <input onChange={this.onChange} type="text" name="phone" className="form-control" placeholder="Please insert contact phone" value={phone} required/>
                        {
                            phoneError?
                            <small  style={{"color":"red"}}>Phone must contain at least 8 numbers!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Image url:</label>
                        <input onChange={this.onChange} type="text" name="imageUrl" className="form-control" placeholder="Please add image url of band" value={imageUrl} required/>
                        {
                            imageUrlError?
                            <small  style={{"color":"red"}}>ImageUrl can not be empty!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
            </form>
            <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Add band</button>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return {
        createNewBand:(name)=>(dispatch(createNewBand(name)))
    }
}

function mapStateToProps(state){
    return {
        bands : state.bands
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePlace);