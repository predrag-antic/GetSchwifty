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
        return(
            <div className="container">
                {
                    event!==undefined?
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <img className="card-img-top"
                                src={event.imageUrl}
                                alt="Event img"></img>
                                <div className="card-body">
                                    <h1 className="card-title text-center">{event.name}</h1>
                                    <hr/>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Topic: <h5 className="card-text ml-2"> {event.topic}</h5></div>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Name: <h5 className="card-text ml-2"> {event.name}</h5></div>
                                    <hr/>
                                    {/* {
                                        band.bandAvgRating===0?
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> ∅</h5></div>
                                        :
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> {parseFloat(band.bandAvgRating).toFixed(2)}</h5></div>

                                    } */}
                                    {
                                    // localStorage.getItem("id")?
                                    // (<div className="text-center mt-2"> 
                                    // {
                                    //     this.alreadyFavorite()?
                                    //     (<button  type="button" className="btn btn-danger">
                                    //         GOING
                                    //     </button>)
                                    //     :
                                    //     (<button  type="button" className="btn btn-outline-danger">
                                    //         GO ON EVENT?
                                    //     </button>)
                                    // }
                                    // </div>)
                                    // :
                                    // null
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