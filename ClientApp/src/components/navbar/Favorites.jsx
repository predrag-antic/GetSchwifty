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
        <div className="container text-center my-4" >
            <h3 className="mb-4" style={{color:"#FE7447"}}>Favorite bands and places</h3>
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
                        <Link to={`/bands/${band.name}`} style={{textDecoration:"none", color:"#000000"}}>{band.name}</Link>
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
                        <Link to={`/places/${place.name}`} style={{textDecoration:"none", color:"#000000"}}>{place.name}</Link>
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