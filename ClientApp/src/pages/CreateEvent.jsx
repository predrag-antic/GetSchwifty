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
            listOfSponsors:[]
         }
    }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
     }

   /* checkInput=()=>{
        const {name,imageUrl,phone,address} = this.state;
        var noError=true;
        var places = Array.from(this.props.places);
        
        places = places.map(place => {
           return place.name
        })

        if(name.length<=2){
            this.setState({"nameError":true})
            noError=false;
        }else {
            this.setState({"nameError":false})
        }

        if(places.includes(name)){
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

        if(address.length===0){
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
    }*/

    handleSubmit=()=>{
        const {name,topic,description,imageUrl,time,placeName,listOfSponsors} = this.state;
        //if(this.checkInput()){

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
                }else {
                    Swal.fire('Error','Somethnig went wrong! Try again!','error')
                }
            })
    }

    onChangeTime = time => this.setState({ time })

    addSponsor=()=>{
        const {sponsorDesc,sponsorName}=this.state;
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
                    <label>Select place :</label>
                    <select name="placeName" className="form-control" onChange={this.onChange}>
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
                    </div>
                </div>
            </form>
            <button className="btn btn-primary mt-3" onClick={this.addSponsor}>+</button>
            <p>add sponsor</p>
            <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Submit event</button>
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