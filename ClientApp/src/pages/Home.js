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
              <h1 style={{color:'#FE7447'}}>Hello, user!</h1>
              <p>Welcome to your new single-page application, where you can find about parties, places, etc in your town!</p>
              <p>Mollit id in tempor exercitation id aliquip duis nisi deserunt.</p>
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
            <h1 className="m-0 p-5">Find your friends!</h1>
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