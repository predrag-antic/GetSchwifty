import React from 'react';
import { connect } from 'react-redux';
import {store} from '../App'
import {thunk_action_getEventById} from '../store/actions/event-action'
import { Link } from 'react-router-dom';

class EventPage extends React.Component {

    componentDidMount(){
        const eventId = this.props.match.params.eventId;
      store.dispatch(thunk_action_getEventById(eventId));
      } 

    handleAddToFavorite=(eventId)=>{
        // const userIdEventId ={
        //   userId:localStorage.getItem("id"),
        //   eventId:eventId
        // }
        // store.dispatch(thunk_action_addUserGoingToEvent(userIdEventId));
      }

    // alreadyFavorite=()=>{
    //     var isFavorite=false;
    //     if(this.props.current_user.favoriteBands){
    //       this.props.current_user.favoriteBands.map((band)=>{
    //         if(band.name===this.props.band.name){
    //             isFavorite= true;
    //         }
    //       })
    //     }
    //     return isFavorite;
    //   }

    render(){
        const {event} = this.props;
        var moment = require('moment');
        var parseDate = Date.parse(event.time);
        var datetime = moment(parseDate).format("lll");

        var sponsors = Array.from(this.props.event.listOfSponsors);
        var users = Array.from(this.props.event.usersGoingTo);
        return(
            <div className="container mb-4">
                {
                    event!==undefined?
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <img className="card-img-top mx-auto"
                                src={event.imageUrl}
                                alt="Event img" style={{maxHeight:"100%",width:"500px"}}></img>
                                <div className="card-body">
                                    <h1 className="card-title text-center" style={{color:"#FE7447"}}>{event.name}</h1>
                                    <hr/>
                                    <div className="d-flex px-5">
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Topic: <h5 className="card-text ml-2"> {event.topic}</h5></div>
                                        <div className="d-flex ml-auto" style={{alignItems:"baseline"}}>Time: <h5 className="card-text ml-2"> {datetime}</h5></div>
                                    </div>
                                    <hr/>
                                    <div>
                                        <h3 className="card-title text-center">Description</h3>
                                        <p className="text-center my-3">{event.description}</p>
                                    </div>
                                    <hr/>
                                    <div>
                                        <h3 className="card-title text-center">Sponsors</h3>
                                        {
                                        sponsors!==null?
                                        sponsors.map(sponsor => {
                                            return(
                                                <div key={sponsor.name} className="btn mx-2" style={{"backgroundColor":"#FE7447", color:"#FFFFFF"}}>
                                                    {sponsor.name}
                                                </div>
                                            )
                                        })
                                        :
                                        <p style={{color:"#ffffff"}} className="text-center">There is no sponsorsfor this evenet</p>
                                        }
                                    </div>
                                    <hr/>
                                    <div>
                                    <h3 className="card-title text-center">Users</h3>
                                        {
                                        users!==[]?
                                        users.map(user => {
                                            return(
                                                <div key={user.id} className="mx-2">
                                                    <Link  to={`/user/${user.id}`}  style={{textDecoration:"none", color:"#000000"}}><div className="btn btn-sm btn-secondary">{user.name}</div></Link>
                                                </div>
                                            )
                                        })
                                        :
                                        <p style={{color:"#ffffff"}} className="text-center">There is no users intersted for this event</p>
                                        }
                                    </div>
                                    <hr/>
                                    {
                                    localStorage.getItem("id")?
                                    (<div className="text-center mt-2"> 
                                    {
                                        // this.alreadyFavorite()?
                                        (<button  type="button" className="btn btn-primary">
                                            GOING
                                        </button>)
                                        // :
                                        // (<button  type="button" className="btn btn-outline-primary">
                                        //     GO ON EVENT?
                                        // </button>)
                                    }
                                    </div>
                                    )
                                    :
                                    null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    'There is no event with this id.'
                }
            </div>
        )
    }
}



function mapStateToProps(state){
    return {
        event: state.event,
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,null)(EventPage)