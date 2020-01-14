import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import {createNewEvent} from '../service/service.user'
import {addPlaceToMyPlaces} from '../store/actions/user-actions'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker';

class CreateEvent extends Component {    

    constructor(props){
        super(props);
        this.state={
            name:"",
            topic:"",
            description:"",
            time:new Date(),
            mintime:new Date(),
            imageUrl:"",
            placeName:"",
            sponsorName:"",
            sponsorDesc:"",
            listOfSponsors:[],
            error:false,
            sponsorError:false
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

   checkInput=()=>{
        const {name,imageUrl,topic,description,time,placeName,listOfSponsors} = this.state;
        if(name.length===0 || 
            imageUrl.length===0 || 
            topic.length===0 || 
            description.length===0 || 
            time===null|| 
            placeName.length===0|| 
            listOfSponsors.length===0)
            {
                this.setState({"error":true})
                return false;
            }
            return true;
    }

    clearFields=()=>{
        this.setState({"name":""});    
        this.setState({"topic":""});    
        this.setState({"description":""});    
        this.setState({"time":""});    
        this.setState({"imageUrl":""});    
        this.setState({"sponsorName":""});    
        this.setState({"sponsorDesc":""});    
        this.setState({"placeName":""});    
        this.setState({"listOfSponsors":[]});  
        this.setState({"error":false});    
        this.setState({"sponsorError":false})
    }

    handleSubmit=()=>{
        const {name,topic,description,imageUrl,time,placeName,listOfSponsors} = this.state;
        if(this.checkInput()){

            const event = {
                name:name,
                topic:topic,
                description:description,
                time:time,
                imageUrl:imageUrl,
                placeName:placeName,
                listOfSponsors:listOfSponsors
            }
            createNewEvent(event).then(response=>{
                if(response.status===200){
                    const eventName=response.data.name;
                    Swal.fire('Success',`You just created ${eventName}`,'success')
                    this.clearFields();
                }else {
                    Swal.fire('Error','Somethnig went wrong! Try again!','error')
                }
            })
        }
    }

    onChangeTime = time => this.setState({ time })
    checkSponsor= ()=>{
        const {sponsorDesc,sponsorName}=this.state;
        if(sponsorDesc.length===0 || sponsorName.length===0){
            this.setState({"sponsorError":true})
            return false
        }
        return true
    }
    addSponsor=()=>{
        const {sponsorDesc,sponsorName}=this.state;
        if(this.checkSponsor()){
        var listOfSponsors=this.state.listOfSponsors;
        if(sponsorDesc.length!==0 && sponsorName.length!==0){
            const sponsor={
                name:sponsorName,
                description:sponsorDesc
            }
            listOfSponsors=[...listOfSponsors,sponsor];
            this.setState({"listOfSponsors":listOfSponsors})
            this.setState({"sponsorDesc":""})
            this.setState({"sponsorName":""})
            this.setState({"sponsorError":false})
        }
    }
    }

  render () {
    const {name,topic,description,imageUrl,placeName,time,listOfSponsors,sponsorName,sponsorDesc} = this.state;

    if(!localStorage.getItem("id") || this.props.current_user.isOwner===false)
    {
        return <Redirect to="/home" />
    }

    return (
        <div className="container form-width pt-5" style={{color:"#ffffff"}}>
            <form className="mb-3">
                <div className="form-row">
                    <div className="col">
                        <label>Name:</label>
                        <input onChange={this.onChange} type="text" name="name" className="form-control" placeholder="Please insert event name" value={name} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Topic:</label>
                        <input onChange={this.onChange} type="text" name="topic" className="form-control" placeholder="Please insert topic of event" value={topic} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Event Description:</label>
                        <input onChange={this.onChange} type="text" name="description" className="form-control" placeholder="Description" value={description} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Image url:</label>
                        <input onChange={this.onChange} type="text" name="imageUrl" className="form-control" placeholder="Please add image url of event" value={imageUrl} required/>
                    </div>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label className="mr-3">Time:</label>
                        <div style={{"backgroundColor":"white","display":"inline"}}>
                            <DateTimePicker
                                minDate={this.state.mintime}
                                onChange={this.onChangeTime}
                                value={this.state.time}
                                />
                        </div>
                    </div>
                </div>
                <div className="form row mt-3">
                    <label className=" mx-3">Select place :</label>
                    <select name="placeName" className="form-control mx-3" onChange={this.onChange}>
                        <option value="" key="test">{"..."}</option>
                        {
                            this.props.current_user.myPlaces.map((place)=>{
                                return (
                                    <option value={place} key={place} >{place}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form row mt-3">
                    <div className="col">
                        <label>Sopnsors:</label>
                        <div>
                            <small>Name:</small>
                            <input onChange={this.onChange} type="text" name="sponsorName" className="form-control" placeholder="Please add name of sponsor" value={sponsorName} required/>
                            <small>Description:</small>
                            <input onChange={this.onChange} type="text" name="sponsorDesc" className="form-control" placeholder="Please add sponsor description" value={sponsorDesc} required/>
                        </div>
                        {
                            this.state.sponsorError===true?
                            <div className="alert alert-danger mt-3" role="alert">
                                Please fill name and description!
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </form>
            <button className="btn btn-primary mt-3" onClick={this.addSponsor}>+</button>
            <p>add sponsor</p>
            <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Submit event</button>
            {
                this.state.error===true?
                <div className="alert alert-danger mt-3" role="alert">
                    Please fill all fields!
                </div>
                :
                null
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

function mapDispatchToProps(dispatch){
    return {
        //addPlaceToMyPlaces:(name)=>(dispatch(addPlaceToMyPlaces(name)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateEvent);