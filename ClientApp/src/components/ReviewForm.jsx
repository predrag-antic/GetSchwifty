import React from 'react';
import { connect } from 'react-redux';
import { addPlaceReview, addBandReview } from '../store/actions/review.actions';
import { withRouter } from 'react-router';

class ReviewForm extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {
            userId: '',
            userName: '',
            rating: 0,
            comment:'',
            nameOfBandOrPlace: '',
            errors: false
        }
    }
    

    isFormEmpty = () => {
        return !this.state.rating.length || !this.state.comment.length;
    }

    handleRatingChange = (event) => {
        this.setState({rating:event.target.value})
    }

    handleCommentChange = (event) => {
        this.setState({comment:event.target.value})
    }

    handleSubmit = (event) => {
        const name = this.props.name;
        event.preventDefault();
        if(!this.isFormEmpty()){
            var review = {
                userId: localStorage.getItem('id'),
                userName: localStorage.getItem('name'),
                comment: this.state.comment,
                rating: Number(this.state.rating),
                nameOfBandOrPlace: name
            }

            if(this.props.match.path==="/places/:id")
                this.props.addPlaceReview(review);
            else
                this.props.addBandReview(review);
            this.setState({errors:false});
            this.setState({
                comment: '',
                rating: '',
            })
        }
        else {
            this.setState({errors:true})
        }
    }

    render(){
        const {rating,comment} = this.state;
        return(
            <div>
                {localStorage.getItem('name')!==null?
                    <div className="px-4 py-3" style={{backgroundColor:'white',color:'black'}}>
                        {this.state.errors===true && (
                            <div className="alert alert-danger" role="alert">
                                Fill all fields!
                            </div>
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Rating: </label>
                                <input type="number" name="rating" value={rating} className="form-control" onChange={this.handleRatingChange} min="1" max="10"></input>
                            </div>
                            <div className="form-group">
                                <label>Comment: </label>
                                <textarea className="form-control" name="comment" value={comment} onChange={this.handleCommentChange} rows={3} ></textarea>     
                            </div>
                            <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    :
                    <div className="px-4 py-3" style={{backgroundColor:'white',color:'black'}}>
                        {this.state.errors===true && (
                            <div className="alert alert-danger" role="alert">
                                Fill all fields!
                            </div>
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Rating: </label>
                                <input type="number" name="rating" value={rating} className="form-control" onChange={this.handleRatingChange} min="1" max="10"></input>
                            </div>
                            <div className="form-group">
                                <label>Comment: </label>
                                <textarea className="form-control" name="comment" value={comment} onChange={this.handleCommentChange} rows={3} ></textarea>     
                            </div>
                            <div style={{display:'flex', verticalAlign:'middle'}}>
                            <button type="submit" value="Submit" className="btn btn-primary mr-3" disabled>Submit</button>
                            <h6 style={{color:"red"}}>*Login if you want to comment!</h6>
                            </div>
                        </form>
                    </div>
                }
            </div>
        )
    }

}

function mapDispatchToProps(dispatch){
    return{
        addBandReview: (review) => (dispatch(addBandReview(review))),
        addPlaceReview: (review) => (dispatch(addPlaceReview(review)))
    }
}

export default withRouter(connect(null,mapDispatchToProps)(ReviewForm));