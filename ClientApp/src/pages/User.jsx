import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {thunk_action_getUserById} from '../store/actions/user-actions'
import {store} from '../App'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import UserInfo from '../components/navbar/UserInfo'
import Favorites from '../components/navbar/Favorites'
import malegender from '../resources/female-gender.jpg'
import femalegender from '../resources/male-gender.jpg'

class User extends Component {    

    componentDidMount(){
      const userId = this.props.match.params.id;
    store.dispatch(thunk_action_getUserById(userId));
    } 

    constructor(props){
        super(props);
        this.state={
         }
    }

    handleClick=(userId)=>{
      store.dispatch(thunk_action_getUserById(userId));
    }

  render () {
    const {user_info} =this.props;

    return (
      <div className="container">
        <UserInfo/>
        <div className="dropdown-divider"></div>
        <Favorites/>
        <div className="dropdown-divider"></div>
        <h5>FOLLOWING:</h5>
        <div className="d-flex">
          {
            user_info.followedUsers.length!==0?
            user_info.followedUsers.map((followedUser)=>{
              return (
                <div key={followedUser.id} className="rounded border border-primary media ml-3" style={{"width":"150px"}}>
                  <img src={followedUser.gender==="male"?malegender:femalegender} 
                  className="mr-3" alt="..." width="30" height="30"/>
                  <div className="">
                    <div className="btn" onClick={()=>this.handleClick(followedUser.id)}>
                    <Link  to={`/user/${followedUser.id}`}><small className="mt-0">{followedUser.name}</small></Link>
                    </div>
                  </div>
                </div>
              )
            })
            :
            <p>Still without connections.</p>
          }
          </div>
          <div className="dropdown-divider"></div>
          <h5>Band reviews:</h5>
          <div className="d-flex">
            {
              user_info.reviewBand.length!==0?
              user_info.reviewBand.map((band)=>{
                return (
                <div key={band.nameOfBandOrPlace} className="card" style={{"width": "18rem"}}>
                    <div className="card-body">
                      <h5 className="card-title">{band.nameOfBandOrPlace} Rating:{band.rating}</h5>
                      <p className="card-text">{band.comment}</p>
                    </div>
                </div>
                )
              })
              :
              <p>No reviews !</p>
            }
          </div>
          <div className="dropdown-divider"></div>
          <h5>Places reviews:</h5>
          <div className="d-flex">
            {
              user_info.reviewPlaces.length!==0?
              user_info.reviewPlaces.map((place)=>{
                return (
                <div key={place.nameOfBandOrPlace} className="card" style={{"width": "18rem"}}>
                    <div className="card-body">
                      <h5 className="card-title">{place.nameOfBandOrPlace} Rating:{place.rating}</h5>
                      <p className="card-text">{place.comment}</p>
                    </div>
                </div>
                )
              })
              :
              <p>No reviews !</p>
            }
          </div>
    </div>
    );
  }
}

function mapStateToProps(state){
    return {
        user_info:state.user_info,
        current_user:state.current_user
    }
}

export default connect(mapStateToProps,null)(User);