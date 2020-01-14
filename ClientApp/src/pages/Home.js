import React from 'react';
import { connect } from 'react-redux';
import PlacesList from '../components/PlacesList';
import BandsList from '../components/BandsList';

class Home extends React.Component {
  

  render () {
    const {places,bands} = this.props;

    return (
      <div>
        <div className="container">
          <div className="row" style={{height:'600px', alignItems:'center', color:"#FFFFFF"}}>
            <div className="col-5" >
              <h2 style={{color:'#FE7447'}} className="mb-4">Welcome to GetSchwifty!</h2>
              <p>Web application, where you can find about parties, places and events in your town!</p>
              <p>Find your friends and see where they go, so you can be with them.</p>
            </div>
            <div className="col-6 ml-auto">
              <img src="https://zone1-ibizaspotlightsl.netdna-ssl.com/sites/default/files/styles/auto_1500_width/public/article-images/135251/slideshow-1572267562.jpg" alt="home img" className="img-fluid"></img>
            </div>
          </div>
        </div>

        <div style={{backgroundColor:'#FFFFFF'}}>
          <div className="container">
            <PlacesList places={places}></PlacesList>
          </div>
        </div>

        <div className="container">
          <BandsList bands={bands}></BandsList>
        </div>
        

        <div style={{backgroundColor:'#FFFFFF'}}>
          <div className="container text-center">
            <h4 className="m-0 p-4">© 2020 GetSchwifty, All Rights Reserved</h4>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    places: state.places,
    bands: state.bands
  }
}

export default connect(mapStateToProps,null)(Home);