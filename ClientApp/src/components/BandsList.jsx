import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getBand } from '../store/actions/band.actions';

class BandsList extends React.Component{

    render(){
        var bands = Array.from(this.props.bands);
        if(bands==undefined){
            return (<div>Loading...</div>)
        }
        else{
            return(
                <div className="container py-3 text-center" >
                    <h1 className="my-5 pb-3" style={{color:"#FFFFFF"}}>Discover bands</h1>
                    <div className="row">
                {
                    bands.slice(0,3).map(band => {
                        return(
                      
                                  <div className="col-md-4" key={band.name}>
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
                                      </div>
                                    </div>
                                  </div>
                          )
                        })
                        
                    }
                    </div>
                        <NavLink className="text-light" to="/bands"><div className="btn btn-lg my-5" style={{backgroundColor:"#FE7447", color:"#ffffff"}}>See more</div></NavLink>
                </div>
            )}
    }
}


function mapDispatchToProps(dispatch){
    return{
      getBand: (id) => (dispatch(getBand(id)))
    }
}

export default connect(null,mapDispatchToProps)(BandsList);