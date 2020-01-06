import React from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { getBand } from '../store/actions/band.actions';
import ReviewForm from './ReviewForm';

class Band extends React.Component {

    componentDidMount(){
        const name = this.props.match.params.id;
        this.props.getBand(name);
    }

    zoomPic = () => {
        Swal.fire({imageUrl:"https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"})
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
                                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                                alt="Card image cap" onClick={()=>this.zoomPic()}></img>
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
                                        <div className="d-flex" style={{alignItems:"baseline"}}>Average rate: <h5 className="card-text ml-2"> {band.bandAvgRating}</h5></div>

                                    }
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
        band: state.band
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Band)