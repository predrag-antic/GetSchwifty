import React from 'react';
import { connect } from 'react-redux';

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
          
                      <div className="col-md-4 mb-3">
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
    </div>
    );
  }
}
}

function mapStateToProps(state){
  return{
    places: state.places
  }
}

export default connect(mapStateToProps,null)(Places);