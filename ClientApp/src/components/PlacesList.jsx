import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getPlace } from '../store/actions/place.actions';

class PlacesList extends React.Component{

    render(){
        var places = Array.from(this.props.places);
        if(places==undefined){
            return (<div>Loading...</div>)
        }
        else{
            return(
                
                <div className="container py-3 text-center" >
                    <h1 className="my-5 pb-3">Discover places</h1>
                    <div className="row">
                {
                    places.slice(0,3).map(place => {
                        return(
                      
                                  <div className="col-md-4" key={place.name}>
                                    <div className="card mb-2">
                                    <NavLink to={`/places/${place.name}`} onClick={() => this.props.getPlace(`${place.name}`)} style={{textDecoration:"none"}}>
                                      <img className="card-img-top"
                                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                                        alt="Card image cap"></img>
                                      </NavLink>
                                      <div className="card-body">
                                      <NavLink to={`/places/${place.name}`} onClick={() => this.props.getPlace(`${place.name}`)} style={{textDecoration:"none",color:"#000000"}}>
                                        <h4 className="card-title">{place.name}</h4>
                                        </NavLink>
                                        <p className="card-text">{place.address}</p>
                                      </div>
                                    </div>
                                  </div>
                          )
                        })
                        
                    }
                    </div>
                    <NavLink className="text-light" to="/places"><div className="btn btn-lg my-5" style={{backgroundColor:"#FE7447", color:"#ffffff"}}>See more</div></NavLink>
                </div>
            )}
    }
}


function mapDispatchToProps(dispatch){
    return{
            getPlace: (id) => (dispatch(getPlace(id)))
    }
}

export default connect(null,mapDispatchToProps)(PlacesList);