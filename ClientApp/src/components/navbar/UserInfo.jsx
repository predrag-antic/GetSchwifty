import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {store} from '../../App'
import {thunk_action_followUser} from '../../store/actions/user-actions'
import {connect} from 'react-redux'
import photo from '../../resources/user.png'

class UserInfo extends Component { 
    
    handleFollow=(userId)=>{
        const userIds ={
          userId:localStorage.getItem("id"),
          followedUserId:userId
        }
        store.dispatch(thunk_action_followUser(userIds));
      }

    alreadyFollow=()=>{
        var isFollower=false;
        if(this.props.current_user.followedUsers){
          this.props.current_user.followedUsers.map((followedUser)=>{
            if(followedUser.id===this.props.user_info.id){
              isFollower= true;
            }
          })
        }
        return isFollower;
      }

      isMyProfile=()=>{
        var isMyProfile=false;
        if(this.props.current_user.id===this.props.user_info.id){
          isMyProfile=true;
        }
        return isMyProfile;
      }

    render () {
        const {user_info} =this.props;
        return (
                <div className="row my-4" style={{color:"#ffffff"}}>
                <div className="col">
                </div>
                <div className="col img ">
                    <div className=" text-center">
                    <img src={photo} alt="" className="img-rounded"/>
                    </div>
                </div>
                <div className="col details ">
                <div className="d-flex pb-2">
                    <h4 className="mb-0 mr-3 pt-1" style={{color:"#FE7447"}}>{user_info.name}</h4>
                    {
                      !this.isMyProfile()?
                      localStorage.getItem("id")?
                      (<div>
                      {
                          this.alreadyFollow()?
                          <button onClick={()=>this.handleFollow(user_info.id)} type="button" className="btn btn-primary">
                          FOLLOWING
                          </button>
                          :
                          <button onClick={()=>this.handleFollow(user_info.id)} type="button" className="btn btn-outline-primary">
                          FOLLOW
                          </button>
                      }
                      </div>)
                      :
                      null
                      :
                      null
                    }
                </div>
                <p className="d-flex m-0">Gender: <h5 className="ml-2">{user_info.gender}</h5></p>
                <p className="d-flex m-0">Age: <h5 className="ml-2">{user_info.age}</h5></p>
                <p>Owner of:</p>
                {
                    user_info.isOwner?
                    user_info.myPlaces.map((placeName)=>{
                    return (
                        <Link key={placeName} className="btn mr-1" 
                        style={{"backgroundColor":"#FE7447"}} to={`/places/${placeName}`}>
                            <small style={{"color":`white`}}>{placeName}</small>
                        </Link>
                    )
                    })
                    :
                    <p> / </p>
                }
                <br/>
                
                </div>
                <div className="col">
                </div>
                </div>
        )
}
}

function mapStateToProps(state){
    return {
        user_info:state.user_info,
        current_user:state.current_user
    }
}


export default connect(mapStateToProps,null)(UserInfo);