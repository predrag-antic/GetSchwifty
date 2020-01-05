import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

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
                      
                                  <div className="col-md-4">
                                    <div className="card mb-2">
                                      <img className="card-img-top"
                                        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                                        alt="Card image cap"></img>
                                      <div className="card-body">
                                        <h4 className="card-title">{place.name}</h4>
                                        <p className="card-text">{place.address}</p>
                                        <p className="card-text">{place.phone}</p>
                                      </div>
                                    </div>
                                  </div>
                          )
                        })
                        
                    }
                    </div>
                    <NavLink tag={Link} className="text-light" to="/places"><div className="btn btn-primary my-5">See more</div></NavLink>
                </div>
            )}
    }
}


function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(null,mapDispatchToProps)(PlacesList);