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
                <div className="row">
                <div className="col">
                </div>
                <div className="col img ">
                    <div className=" text-center">
                    <img src={photo} alt="" className="img-rounded"/>
                    </div>
                    {
                      !this.isMyProfile()?
                      localStorage.getItem("id")?
                      (<div className="mt-1 text-center">
                      {
                          this.alreadyFollow()?
                          <button onClick={()=>this.handleFollow(user_info.id)} type="button" className="btn btn-primary">
                          FOLLOWING
                          </button>
                          :
                          <button onClick={()=>this.handleFollow(user_info.id)} type="button" className="btn btn-outline-primary">
                          +FOLLOW
                          </button>
                      }
                      </div>)
                      :
                      null
                      :
                      null
                    }
                </div>
                <div className="col details ">
                <blockquote>
                    <h4>{user_info.name}</h4>
                </blockquote>
                <p>
                    Gender: {user_info.gender} <br/>
                    Age: {user_info.age}<br/>
                </p>
                My places:
                {
                    user_info.isOwner?
                    user_info.myPlaces.map((placeName)=>{
                    const color='#'+(Math.random()*0xFFFFFF<<0).toString(16);
                    return (
                        <Link key={placeName} className="btn ml-3 mt-1" 
                        style={{"backgroundColor":`${color}`}} to={`/places/${placeName}`}>
                            <small  style={{"color":`white`}}>{placeName}</small>
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