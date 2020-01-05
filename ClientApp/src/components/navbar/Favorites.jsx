import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

class Favorites extends Component {    

    constructor(props){
        super(props);
        this.state={
         }
    }

  render () {
    const {user_info} =this.props;
    return (
        <div className="container text-center">
            <h3>Favorite bands and places</h3>
            <div className="row">
                <div className="col">
                
                </div>
                <div className="col">
                <ul className="list-group">
                {
                user_info.favoriteBands.length!==0?
                user_info.favoriteBands.map((band)=>{
                    return (
                    <li key={band.name} className="list-group-item">
                        <Link to={`/band/${band.name}`} >{band.name}</Link>,
                        {band.type}
                        <img className=" ml-1 rounded-circle" src={band.imageUrl} 
                        alt="band photo" width="30" height="30"/>
                    </li>
                    )
                })
                :
                <li className="list-group-item">
                        No favorite bands!
                </li>
                }
                </ul>
                </div>
                <div className="col">
                <ul className="list-group">
                {
                user_info.favoritePlaces.length!==0?
                user_info.favoritePlaces.map((place)=>{
                    return (
                    <li key={place.name} className="list-group-item">
                        <Link to={`/place/${place.name}`}>{place.name}</Link>
                        <img className=" ml-1 rounded-circle" src={place.imageUrl} 
                        alt="place photo" width="30" height="30"/>
                    </li>
                    )
                })
                :
                <li className="list-group-item">
                        No favorite places!
                </li>
                }
                </ul>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
    
    }
}


function mapStateToProps(state){
    return {
        user_info:state.user_info
    }
}

export default connect(mapStateToProps,null)(Favorites);