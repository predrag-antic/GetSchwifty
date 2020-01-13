import React from 'react';
import { connect } from 'react-redux';
import { getBand } from '../store/actions/band.actions';
import ReviewForm from './ReviewForm';
import {store} from '../App'
import {thunk_action_addBandToFavorite} from '../store/actions/user-actions'
import { Link } from 'react-router-dom';

class Band extends React.Component {

    componentDidMount(){
        const name = this.props.match.params.id;
        this.props.getBand(name);
    }

    handleAddToFavorite=(bandName)=>{
        const userIdBandName ={
          userId:localStorage.getItem("id"),
          name:bandName
        }
        store.dispatch(thunk_action_addBandToFavorite(userIdBandName));
      }

    alreadyFavorite=()=>{
        var isFavorite=false;
        if(this.props.current_user.favoriteBands){
          this.props.current_user.favoriteBands.map((band)=>{
            if(band.name===this.props.band.name){
                isFavorite= true;
            }
          })
        }
        return isFavorite;
      }

    render(){
        const {band} = this.props;
        const reviews = Array.from(this.props.band.bandReviews);
        return(
            <div className="container">
                {
                    band!==undefined?
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <img className="card-img-top"
                                src={band.imageUrl}
                                alt="Band img"></img>
                                <div className="card-body">
                                    <h1 className="card-title text-center">{band.name}</h1>
                                    <hr/>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Type: <h5 className="card-text ml-2"> {band.type}</h5></div>
                                    <div className="d-flex" style={{alignItems:"baseline"}}>Phone: <h5 className="card-text ml-2"> {band.phone}</h5></div>
                                    <hr/>
                                    {
                                        band.bandAvgRating===0?
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> ∅</h5></div>
                                        :
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> {parseFloat(band.bandAvgRating).toFixed(2)}</h5></div>

                                    }
                                    {
                                    localStorage.getItem("id")?
                                    (<div className="text-center mt-2"> 
                                    {
                                        this.alreadyFavorite()?
                                        (<button onClick={()=>this.handleAddToFavorite(band.name)} type="button" className="btn btn-danger">
                                            Favorite
                                        </button>)
                                        :
                                        (<button onClick={()=>this.handleAddToFavorite(band.name)} type="button" className="btn btn-outline-danger">
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
                    'There is no such band.'
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
        getBand: (id) => (dispatch(getBand(id)))
    }
}

function mapStateToProps(state){
    return {
        band: state.band,
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Band)