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
        <h3 className="my-4 text-center" style={{color:"#FE7447"}}>Following users</h3>
        <div className="d-flex mb-4 text-center">
          {
            user_info.followedUsers.length!==0?
            user_info.followedUsers.map((followedUser)=>{
              return (
                <div key={followedUser.id} className="rounded">
                    <div className="btn" onClick={()=>this.handleClick(followedUser.id)}>
                    <Link  to={`/user/${followedUser.id}`}  style={{textDecoration:"none", color:"#000000"}}><div className="btn btn-lg btn-secondary">{followedUser.name}</div></Link>
                    </div>
                </div>
              )
            })
            :
            <p style={{color:"#ffffff"}} className="text-center">No connections</p>
          }
          </div>
          <div className="dropdown-divider"></div>
          <h3 className="my-4 text-center" style={{color:"#FE7447"}}>Band reviews</h3>
          <div className="d-flex mb-4 text-center">
            {
              user_info.reviewBand.length!==0?
              user_info.reviewBand.map((band)=>{
                return (
                <div key={band.nameOfBandOrPlace} className="card mr-2" >
                    <div className="card-body py-2 px-5">
                      <h5 className="card-title mb-2"><Link to={`/bands/${band.nameOfBandOrPlace}`} style={{textDecoration:"none", color:"#000000"}}>{band.nameOfBandOrPlace}</Link></h5>
                      <h5 className="card-text mb-2" style={{color:"#FE7447"}}>{band.rating}</h5>
                      <p className="card-text">{band.comment}</p>
                    </div>
                </div>
                )
              })
              :
              <p style={{color:"#ffffff"}} className="text-center">No reviews</p>
            }
          </div>
          <div className="dropdown-divider"></div>
          <h3 className="my-4 text-center" style={{color:"#FE7447"}}>Place reviews</h3>
          <div className="d-flex mb-4 text-center">
            {
              user_info.reviewPlaces.length!==0?
              user_info.reviewPlaces.map((place)=>{
                return (
                <div key={place.nameOfBandOrPlace} className="card mr-2" >
                    <div className="card-body py-2 px-5">
                      <h5 className="card-title mb-2"><Link to={`/places/${place.nameOfBandOrPlace}`} style={{textDecoration:"none", color:"#000000"}}>{place.nameOfBandOrPlace}</Link></h5>
                      <h5 className="card-text mb-2" style={{color:"#FE7447"}}>{place.rating}</h5>
                      <p className="card-text">{place.comment}</p>
                    </div>
                </div>
                )
              })
              :
              <p style={{color:"#ffffff"}} className="text-center">No reviews</p>
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