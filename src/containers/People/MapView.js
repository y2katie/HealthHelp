import React, { PureComponent } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Container, Col, Row } from "reactstrap";
import Geocoder from "react-mapbox-gl-geocoder";
import { Icon, Input, Button } from 'semantic-ui-react'

const mapStyle = {
  width: "100%",
  height: 600,
};

const TOKEN = process.env.REACT_APP_API_KEY;

const mapboxApiKey = TOKEN;

const params = {
  country: "us",
};


const navControlStyle= {
  right: 10,
  top: 10
};

const CustomPopup = ({index, marker, closePopup, remove}) => {
  return (
    <Popup
      latitude={marker.latitude}
      longitude={marker.longitude}
      onClose={closePopup}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
     >
     <p>{marker.name}</p>
    <div>
      <Button color="secondary" onClick={() => remove(index)}>Remove</Button>
    </div>
    </Popup>
  )};


  const CustomMarker = ({index, marker, openPopup}) => {
      return (
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}>
          <div className="marker" onClick={() => openPopup(index)}>
            <span><b>{index + 1}</b></span>

          </div>

        </Marker>
    )};


class MapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 40.7557,
        longitude: -73.8831,
        zoom: 10,
      },
      tempMarker:null,
      markers:[],
      selectedIndex:null
    };
  }



  onSelected = (viewport, item) => {
    this.setState({
      viewport,
      tempMarker: {
        name: item.place_name,
        longitude: item.center[0],
        latitude: item.center[1],
      },
    });
  };

    setSelectedMarker = (index) => {
        this.setState({ selectedIndex: index })
    }

    closePopup = () => {
        this.setSelectedMarker(null)
    };

    openPopup = (index) => {
        this.setSelectedMarker(index)
    }

  add = () => {
      var { tempMarker } = this.state
      this.setState(prevState => ({
         markers: [...prevState.markers, tempMarker],
         tempMarker: null
       }))
  }

  remove = (index) => {
    this.setState(prevState => ({
      markers: prevState.markers.filter((marker, i) => index !== i),
      selectedIndex: null
    }))
  }


  render() {
    const { viewport, tempMarker, markers, selectedIndex } = this.state;
    return (
      <Container fluid={true} >

        <Row className="py-8 texting">
        <h1 className="bigHeader"> Is Invisibility in Your Area? </h1>
          <h3> Search Invisibility</h3>
          <p> Where would you like to add invisiblity?</p>

          <Col sm={6}>
        <Input type="text" placeholder='Search...'>
            <Geocoder
              mapboxApiAccessToken={mapboxApiKey}
              onSelected={this.onSelected}
              viewport={viewport}
              hideOnSelect={true}
              value=""
              className="ui input"
              queryParams={params}>
              <Icon name='users' />
              </Geocoder>
              </Input>

          </Col>
          <Button color="primary" onClick={this.add}>
            Add <Icon disabled name='search' />
          </Button>

        </Row>
        <Row>
          <Col>
            <ReactMapGL
              mapboxApiAccessToken={mapboxApiKey}
              mapStyle="mapbox://styles/mapbox/light-v10"
              {...viewport}
              {...mapStyle}
              onViewportChange={(viewport) => this.setState({ viewport })}
            >
            <Marker
              latitude={40.7557} longitude={-73.8831}>
              <div className="marker" >
                <span><b>{1}</b></span>
              </div>
            </Marker>
            <Marker
            index={1}
              openPopup={this.openPopup}
              marker = {1}
              latitude={40.7557} longitude={-73.8740}>
              <div className="marker" >
                <span><b>{2}</b></span>
              </div>
            </Marker>
            { tempMarker &&
              <Marker
                longitude={tempMarker.longitude}
                latitude={tempMarker.latitude}>
                <div className="marker temporary-marker"><span></span></div>
              </Marker>
            }
            {
              this.state.markers.map((marker, index) => {
                return(
                  <CustomMarker
                    key={`marker-${index}`}
                    index={index}
                    marker={marker}
                    openPopup={this.openPopup}

                  />
                 )
              })
            }
            {
          selectedIndex !== null &&
           <CustomPopup
             index={selectedIndex}
             marker={markers[selectedIndex]}
             closePopup={this.closePopup}
             remove={this.remove}
            />
        }
        <NavigationControl style={navControlStyle} />

            </ReactMapGL>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MapView;