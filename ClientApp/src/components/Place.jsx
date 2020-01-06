import React from 'react';
import { connect } from 'react-redux';
import { getPlace } from '../store/actions/place.actions';
import Swal from 'sweetalert2'
import ReviewForm from './ReviewForm';
import {store} from '../App'
import {thunk_action_addPlaceToFavorite} from '../store/actions/user-actions'

class Place extends React.Component {

    componentDidMount(){
        const name = this.props.match.params.id;
        this.props.getPlace(name);
    }

    zoomPic = () => {
        Swal.fire({imageUrl:"https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"})
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
        return(
            <div className="container">
                {
                    place!==undefined?
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <img className="card-img-top"
                                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                                alt="Card image cap" onClick={()=>this.zoomPic()}></img>
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
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> {place.averageRate}</h5></div>

                                    }
                                    <div className="d-flex" style={{alignItems:"baseline"}}> 
                                    {
                                        this.alreadyFavorite()?
                                        (<button onClick={()=>this.handleAddToFavorite(place.name)} type="button" class="btn btn-danger">
                                            Favorite
                                        </button>)
                                        :
                                        (<button onClick={()=>this.handleAddToFavorite(place.name)} type="button" class="btn btn-outline-danger">
                                            Add To Favorite
                                        </button>)
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-5">
                            <h3 className="text-center" style={{color:"#ffffff"}}>Reviews</h3>
                                    {
                                        reviews.map(review => {
                                            return(
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    <h4 className="card-title">{review.rating}</h4>
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