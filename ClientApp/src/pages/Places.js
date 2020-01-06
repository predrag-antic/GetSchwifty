import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPlace } from '../store/actions/place.actions';

class Places extends React.Component {
  

  render () {
    var places = Array.from(this.props.places);
    if(places==undefined){
        return (<div>Loading...</div>)
    }
    else{
    return (
        <div className="container py-3" >
        <div className="row">
    {
        places.map(place => {
            return(
              <div className="col-md-4 mb-3" key={place.name}>
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
                            <p className="card-text">{place.phone}</p>
                          </div>
                        
                        </div>
                      </div>
              )
            })
            
        }
        </div>
    </div>
    );
  }
}
}

function mapDispatchToProps(dispatch){
    return{
        getPlace: (id) => (dispatch(getPlace(id)))
    }
}

function mapStateToProps(state){
  return{
    places: state.places
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Places);