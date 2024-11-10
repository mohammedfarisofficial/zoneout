import {useEffect, useRef, useState, Fragment} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';

import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
  ShapeSource,
  FillLayer,
} from '@rnmapbox/maps';
import type {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';

import {Slider} from '@miblanchard/react-native-slider';

import Geolocation from '@react-native-community/geolocation';

import {REACT_APP_MAPBOX_ACCESS_TOKEN} from '@env';

import * as turf from '@turf/turf';  // Turf.js for generating polygons
import axios from 'axios';
import { requestLocationPermission } from '../../../utils/geolocation';
import { socket } from '../../../services/socketio';
import { useAuth } from 'src/context/AuthContext';

// Test coords
const IES_COORDS = [76.14814461016903, 10.564417196053261];
const NGO_QUARTERS = [76.33303251966987, 10.02020933776492];
// Test user id
const USER_ID = '66e6fdde8b16924feae61f5f';

Mapbox.setAccessToken(REACT_APP_MAPBOX_ACCESS_TOKEN);

const MapScreen = ({navigation}:any) => {
  const cameraRef = useRef<Camera | null>(null);
  const [eventCoords, setEventCoords] = useState(null);
  const [radius, setRadius] = useState(10);
  const [events, setEvents] = useState([]);

  const { logout } = useAuth();

  useEffect(() => {
    const startWatchingPosition = async () => {
      const hasLocationPermission = await requestLocationPermission();
      if (!hasLocationPermission) return;

      const watchId = Geolocation.watchPosition(
        handlePosition,
        (error: any) => {
          console.error('Error getting position:', error);
        },
        {
          enableHighAccuracy: true, 
          distanceFilter: 1,
        },
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    };

    // startWatchingPosition();
  }, []);

  const handlePosition = (position: any) => {
    console.log('change position', position.coords);
    socket.emit('user-location', {
      text: 'hello',
      user_id: USER_ID,
      coords: position.coords,
    });
  };

  const myCoords: Position = [76.33284407131775, 10.020271744113368];
  const insideUserCheckCoords : Position = [76.1492354074162, 10.56544717046485]

  const gotoCollege = () => {
    if (cameraRef.current != null) {
      cameraRef.current.setCamera({
        centerCoordinate: NGO_QUARTERS,
        zoomLevel: 16.2,
        animationDuration: 2000,
      });
    }
  };

  const createEventPolygon = (coords:any, radius:any) => {
    // Create a polygon (approximating a circle) using Turf.js
    const polygon = turf.circle(coords, radius, {
      steps: 64, // More steps for smoother polygon
      units: 'meters',
    });
    return polygon;
  };

  const createEventHandler = async () => {
    const polygon = createEventPolygon(eventCoords, radius);
    
    const newEvent = {
      created_by: USER_ID,
      coords:eventCoords,
      polygon,  // Store the GeoJSON polygon instead of coords and radius
    };
    try {
      const response = await axios.post("http://192.168.0.122:3001/events/create",newEvent)
      console.log("Response",response.data)
    } catch (error:any) {
      console.log(error.message)
    }
    console.log("newEvent",newEvent)
    // setEvents(prevEvents => [...prevEvents, newEvent]);
    // setEventCoords(null);
    // setRadius(100);
  };

  const eventDetailsHandler = () => {
    console.log('Event details');
  };

  console.log("eventCoords",eventCoords)

  return (
    <MapView
      attributionEnabled
      style={styles.map}
      pitchEnabled={true}
      logoEnabled={false}
      scaleBarEnabled={false}
      compassPosition={{top: 30, right: 10}}
      styleURL="mapbox://styles/mapbox/light-v11"
      onPress={(e:any) => setEventCoords(e.geometry.coordinates)}>

      {/* Clear events button */}
      <TouchableOpacity
        onPress={() => setEvents([])}
        style={{position: 'absolute', top: 65, right: 10, zIndex: 99}}
        activeOpacity={0.5}>
        <View style={{
          width: 44,
          height: 44,
          backgroundColor: '#788D5D',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logout}
        style={{position: 'absolute', top: 150, right: 10, zIndex: 99}}
        activeOpacity={0.5}>
        <View style={{
          width: 44,
          height: 44,
          backgroundColor: '#783D5D',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      </TouchableOpacity>

      <Mapbox.Camera
        ref={cameraRef}
        zoomLevel={16.2}
        centerCoordinate={IES_COORDS}
        animationMode={'flyTo'}
        pitch={45}
        heading={35}
      />

      {events &&
        events.map((event:any, index) => (
          <Fragment key={index}>
            {/* Event Marker */}
            <MarkerView coordinate={turf.center(event.polygon).geometry.coordinates}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'gray',
                  borderRadius: 50,
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={eventDetailsHandler}
              />
            </MarkerView>

            {/* Polygon (Circle) ShapeSource */}
            <ShapeSource id={`event-polygon-${index}`} shape={event.polygon}>
              <FillLayer
                id={`event-fill-${index}`}
                style={{
                  fillColor: 'rgba(0, 150, 255, 0.3)',
                  fillOutlineColor: 'rgba(0, 150, 255, 1)',
                }}
              />
            </ShapeSource>
          </Fragment>
        ))
      }

      {eventCoords && (
        <>
          {/* Event Marker */}
          <MarkerView coordinate={eventCoords}>
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                borderRadius: 50,
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </MarkerView>

          {/* Preview of the event polygon before creation */}
          <ShapeSource
            id="event-preview"
            shape={createEventPolygon(eventCoords, radius)}>
            <FillLayer
              id="event-fill-preview"
              style={{
                fillColor: 'rgba(0, 150, 255, 0.3)',
                fillOutlineColor: 'rgba(0, 150, 255, 1)',
              }}
            />
          </ShapeSource>
        </>
      )}

      <MarkerView coordinate={myCoords} />

      <LocationPuck
        visible={true}
        pulsing={{
          isEnabled: true,
          color: 'teal',
          radius: 50.0,
        }}
      />

      {eventCoords && (
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 10,
            right: 10,
          }}>
          <Slider
            minimumValue={10}
            maximumValue={100}
            value={radius}
            onValueChange={(value:any) => setRadius(value)}
          />
          <Button
            onPress={() => {
              setRadius(100);
              setEventCoords(null);
            }}
            title="clear"
          />
          <Button onPress={createEventHandler} title="Create" />
        </View>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
