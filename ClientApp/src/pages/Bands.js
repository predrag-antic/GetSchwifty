import React from 'react';
import { connect } from 'react-redux';
import { getBand } from '../store/actions/band.actions';
import { NavLink } from 'react-router-dom';

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
          
                      <div className="col-md-4 mb-3" key={band.name}>
                        <div className="card mb-2">
                        <NavLink to={`/bands/${band.name}`} onClick={() => this.props.getBand(`${band.name}`)} style={{textDecoration:"none"}}>
                          <img className="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                            alt="Card image cap"></img>
                          </NavLink>
                          <div className="card-body">
                          <NavLink to={`/bands/${band.name}`} onClick={() => this.props.getBand(`${band.name}`)} style={{textDecoration:"none",color:"#000000"}}>
                            <h4 className="card-title">{band.name}</h4>
                          </NavLink>
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

function mapDispatchToProps(dispatch){
  return{
      getBand: (id) => (dispatch(getBand(id)))
  }
}

function mapStateToProps(state){
  return{
    bands: state.bands
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bands);