import React from 'react';
import { connect } from 'react-redux';

class Bands extends React.Component {
  

  render () {
    var bands = Array.from(this.props.bands);
    if(bands==undefined){
        return (<div>Loading...</div>)
    }
    else{
    return (
        <div className="container py-3" >
        <div className="row">
    {
        bands.map(band => {
            return(
          
                      <div className="col-md-4 mb-3">
                        <div className="card mb-2">
                          <img className="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                            alt="Card image cap"></img>
                          <div className="card-body">
                            <h4 className="card-title">{band.name}</h4>
                            <p className="card-text">{band.type}</p>
                            <p className="card-text">{band.phone}</p>
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
    bands: state.bands
  }
}

export default connect(mapStateToProps,null)(Bands);