import React,{useState} from 'react';

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import AutoCompleteDialogStylesObject from '../Style/AutoCompleteDialogStylesObject';
import Grid from '@mui/material/Grid';
import {connect} from 'react-redux';
import { addAddressed } from '../Process/addAddress';


const Maps = props => {
 const [isOpen,setIsOpen] = useState(false);
 const [coords,setCoords] = useState({lat: 40.756795, lng: -73.954298});
 const [address,setAddress] = useState('');
 const [dataResult,setDataResult] = useState();

 const handleSelect = address => {
  props.addAddressRedux(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]) )
      .then((value) =>{
        setDataResult(value);
        setCoords({
          lat: parseFloat(value.lat),
          lng: parseFloat(value.lng)
        })
        
      } )
      .catch(error => console.error('Error', error));

  };

 const handleChange = address => {
    setAddress(address);
    
  };

  const handleToggleOpen = () => {
    setIsOpen(true)
  };

  const handleToggleClose = () => {
    setIsOpen(false)
  };
  
  const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap defaultCenter={coords} defaultZoom={13}>
              <Marker
                key={props.index}
                position={coords}
                onClick={() => handleToggleOpen()}
              >
                {isOpen && (
                  <InfoWindow
                    onCloseClick={props.handleCloseCall}
                    options={{ maxWidth: 100 }}
                  >
                    <span>This is InfoWindow message!</span>
                  </InfoWindow>
                )}
              </Marker>
            </GoogleMap>
      ))
    
    return (
     
        <div>
           {console.log("isi props ",props)}
          <Grid style={{height:'20vh'}} container justifyContent="center" alignItems="center">
            <Grid item md={8}>
            <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            style={AutoCompleteDialogStylesObject.autocompleteContainer}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <TextField
                 fullWidth
                 label="Search Places ..."
                  {...getInputProps({
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                        key={suggestion.placeId}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
            </Grid>
         
          </Grid>
          <GoogleMapExample
            containerElement={<div style={{ height: '100vh' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
            
}


const mapDispatchToProps = (dispatch) => {
  return {
    addAddressRedux: (newItem) => dispatch(addAddressed(newItem))
  }
}
export default connect(null,mapDispatchToProps)(Maps);