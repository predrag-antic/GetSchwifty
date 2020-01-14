import React from 'react';
import { connect } from 'react-redux';
import { getPlace } from '../store/actions/place.actions';
import ReviewForm from './ReviewForm';
import {store} from '../App'
import {thunk_action_addPlaceToFavorite} from '../store/actions/user-actions'
import { Link } from 'react-router-dom';

class Place extends React.Component {

    componentDidMount(){
        const name = this.props.match.params.id;
        this.props.getPlace(name);
    }

    handleAddToFavorite=(placeName)=>{
        const userIdPlaceName ={
          userId:localStorage.getItem("id"),
          name:placeName
        }
        store.dispatch(thunk_action_addPlaceToFavorite(userIdPlaceName));
      }

    alreadyFavorite=()=>{
        var isFavorite=false;
        if(this.props.current_user.favoritePlaces){
          this.props.current_user.favoritePlaces.map((place)=>{
            if(place.name===this.props.place.name){
                isFavorite= true;
            }
          })
        }
        return isFavorite;
      }

    render(){
        const {place} = this.props;
        const reviews = Array.from(this.props.place.placeReviews);
        const parties = Array.from(this.props.place.placeBands);
        const events = Array.from(this.props.place.listOfEvents);
        var moment = require('moment');

        return(
            <div className="container">
                {
                    place!==undefined?
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <img className="card-img-top"
                                src={place.imageUrl}
                                alt="Place img"></img>
                                <div className="card-body">
                                    <h1 className="card-title text-center">{place.name}</h1>
                                    <hr/>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Address: <h5 className="card-text ml-2"> {place.address}</h5></div>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Phone: <h5 className="card-text ml-2"> {place.phone}</h5></div>
                                    <hr/>
                                    {
                                        place.averageRate===0?
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> ∅</h5></div>
                                        :
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> {parseFloat(place.averageRate).toFixed(2)}</h5></div>

                                    }
                                    {
                                        localStorage.getItem("id")?
                                        (<div className="text-center mt-2"> 
                                        {
                                            this.alreadyFavorite()?
                                            (<button onClick={()=>this.handleAddToFavorite(place.name)} type="button" className="btn btn-danger">
                                                Favorite
                                            </button>)
                                            :
                                            (<button onClick={()=>this.handleAddToFavorite(place.name)} type="button" className="btn btn-outline-danger">
                                                Add To Favorite
                                            </button>)
                                        }
                                        </div>)
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div>
                                <h3 className="text-center" style={{color:"#ffffff"}}>Events</h3>
                                    <div className="card mb-2">
                                        <div className="card-body">
                                {   events[0]!==null?
                                    events.map(event => {
                                        var parseDate = Date.parse(event.time);
                                        var datetime = moment(parseDate).format("lll");
                                        return(
                                            <div key={event.id}>
                                                    <p className="card-text"><strong><Link to={`/event/${event.id}`}  style={{textDecoration:"none", color:"#000000"}}>{event.name}</Link></strong>  - {datetime}</p>
                                                    <hr/>
                                            </div>
                                        )
                                    })
                                    :
                                    'No events'
                                }
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-center" style={{color:"#ffffff"}}>Parties</h3>
                                    <div className="card mb-2">
                                        <div className="card-body">
                                {   parties[0]!==null?
                                    parties.map(party => {
                                        return(
                                            <div key={party.bandName+party.day+party.time}>
                                                    <p className="card-text"><strong>{party.day} - {party.time}h</strong> - <Link to={`/bands/${party.bandName}`}  style={{textDecoration:"none", color:"#000000"}}>{party.bandName}</Link> - {party.type}</p>
                                                    <hr/>
                                            </div>
                                        )
                                    })
                                    :
                                    'No Parties'
                                }
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-center" style={{color:"#ffffff"}}>Reviews</h3>
                                    {
                                        reviews.map(review => {
                                            return(
                                            <div className="card mb-2" key={review.rating+review.comment}>
                                                <div className="card-body">
                                                    <h4 className="card-title">{review.rating} - <Link to={`/user/${review.userId}`}  style={{textDecoration:"none", color:"#000000"}}>{review.userName}</Link></h4>
                                                    <p className="card-text">{review.comment}</p>
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
                                    
                        </div>
                    </div>
                    :
                    'There is no such place.'
                }
                <div className="row">
                    <div className="col-md-7 my-5">
                        <ReviewForm name={this.props.match.params.id}></ReviewForm>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPlace: (id) => (dispatch(getPlace(id)))
    }
}

function mapStateToProps(state){
    return {
        place: state.place,
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Place)