import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import {bandPlayInPlace} from '../services/place.service'
import {connect} from 'react-redux'

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

class Play extends Component {    

    constructor(props){
        super(props);
        this.state={
            placeName:"",
            bandName:"",
            time:"0",
            day:"Monday",
            type:"",
            bandNameError:false,
            typeError:false
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

    checkInput=()=>{
        const {type,bandName} = this.state;
        var noError=true;

        if(bandName.length===0){
            this.setState({"bandNameError":true})
            noError=false;
        }else {
            this.setState({"bandNameError":false})
        }

        if(type.length===0){
            this.setState({"typeError":true})
            noError=false;
        }else {
            this.setState({"typeError":false})
        }
        return noError;
    }

    handleSubmit=()=>{
        const {placeName,bandName,time,day,type} = this.state;
        if(this.checkInput()){
            const bandPlayPlace = {
                placeName:placeName,
                bandName:bandName,
                time:time,
                day:day,
                type:type
            }
            bandPlayInPlace(bandPlayPlace).then(response=>{
                if(response.status===201){
                    Swal.fire('Success',
                    `Band ${bandPlayPlace.bandName} will play at ${bandPlayPlace.placeName}`,
                    'success')
                }else if(response.status===404){
                    Swal.fire('Error','There is not a band with that name! Try again!','error')
                }else if(response.status===403){
                    Swal.fire('Error',
                    `Band ${bandPlayPlace.bandName} already play at ${bandPlayPlace.time} H in ${bandPlayPlace.time} `,
                    'error')
                }else {
                    Swal.fire('Error','Something went wrong! Try again!','error')
                }
            })
        }
    }

  render () {
    const {bandName,time,type,bandNameError,typeError} = this.state;

    if(!localStorage.getItem("id") || this.props.current_user.isOwner===false)
    {
        return <Redirect to="/home" />
    }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form row mt-3">
                    <label>Select place:</label>
                    <select name="placeName" className="form-control" onChange={this.onChange}>
                        {
                            this.props.current_user.myPlaces.map((place)=>{
                                return (
                                    <option value={place} key={place} >{place}</option>
                                )
                            })
                        }
                        <option value="" key="test">{"..."}</option>
                    </select>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Band:</label>
                        <input onChange={this.onChange} type="text" name="bandName" className="form-control"  placeholder="Please insert band name" value={bandName} required/>
                        {
                            bandNameError?
                            <small  style={{"color":"red"}}>Band name is required!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
                <div className="form row mt-3">
                    <label>Day when band will play:</label>
                    <select name="day" className="form-control" onChange={this.onChange}>
                        {
                            days.map((day)=>{
                                return (
                                    <option value={day} key={day}>{day}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Time:</label>
                        <input onChange={this.onChange} type="number" name="time" className="form-control"  min="0" max="23" placeholder="Please insert time when event starts" value={time} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Type of music:</label>
                        <input onChange={this.onChange} type="text" name="type" className="form-control"  placeholder="Please insert type of music" value={type} required/>
                        {
                            typeError?
                            <small  style={{"color":"red"}}>Type is required!</small>
                            :
                            <small/>
                        }
                    </div>
                </div>
            </form>
            <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Add event</button>
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,null)(Play);