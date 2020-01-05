import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

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
                      
                                  <div className="col-md-4">
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
                        <NavLink tag={Link} className="text-light" to="/bands"><div className="btn btn-primary my-5">See more</div></NavLink>
                </div>
            )}
    }
}


function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(null,mapDispatchToProps)(BandsList);