import { useEffect, useRef, useState, Fragment, useMemo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import Mapbox, { Camera, LocationPuck, MapView, MarkerView, ShapeSource, FillLayer, SymbolLayer, ModelLayer, CircleLayer } from "@rnmapbox/maps";
import type { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import axios from "axios";
import { useSelector } from "react-redux";
import { Portal } from "@gorhom/portal";
import * as turf from "@turf/turf"; // Turf.js for generating polygons
import { styles } from "./styles";

import { Slider } from "@miblanchard/react-native-slider";

import Geolocation from "@react-native-community/geolocation";

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from "@env";

import { requestLocationPermission } from "../../../utils/geolocation";
import { socket } from "@services/socketio";
import { useAuth } from "src/context/AuthContext";

import { RootState } from "@store/index";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "@components/ui/typography";

import * as FONTS from "@constants/font";
import Button from "@components/ui/button";

import { Models } from "@rnmapbox/maps";
// import Model from "../../../data/3d-models/model.glb"
const Model = require("../../../data/3d-models/model1.glb");

const modelLayerStyle = {
  modelId: "car",
  modelScale: [10, 10, 10],
};

// const circleLayerStyle = {
//   circleRadiusTransition: { duration: 5000, delay: 0 },
//   circleColor: "#ff0000",
//   circleRadius: 20,
// };

const models = {
  car: require("../../../data/3d-models/model.glb"),
};

// const features = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       id: "a-feature",
//       properties: {
//         icon: "example",
//         text: "example-icon-and-label",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-74.00597, 40.71427],
//       },
//     },
//     {
//       type: "Feature",
//       id: "b-feature",
//       properties: {
//         text: "just-label",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-74.001097, 40.71527],
//       },
//     },
//     {
//       type: "Feature",
//       id: "c-feature",
//       properties: {
//         icon: "example",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-74.00697, 40.72427],
//       },
//     },
//   ],
// };

// Test coords
const features: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "a-feature",
      properties: {
        icon: "example",
        text: "example-icon-and-label",
      },
      geometry: {
        type: "Point",
        coordinates: [-74.00597, 40.71427],
      },
    },
  ],
};

const IES_COORDS = [76.14814461016903, 10.564417196053261];
const NGO_QUARTERS = [76.33303251966987, 10.02020933776492];
const MODEL_COORDS = [-74.00597, 40.71427];
// Test user id
const USER_ID = "66e6fdde8b16924feae61f5f";

Mapbox.setAccessToken(REACT_APP_MAPBOX_ACCESS_TOKEN);

const MapScreen = ({ navigation }: any) => {
  const [eventCoords, setEventCoords] = useState(null);
  const [radius, setRadius] = useState(10);
  const [events, setEvents] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState(null);

  const { collegeRegion } = useSelector((state: RootState) => state.data);

  const cameraRef = useRef<Camera | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  console.log(bottomSheetRef.current);

  const snapPoints = useMemo(() => ["30%"], []); // Create Zone or Map Press

  const { logout } = useAuth();

  useEffect(() => {
    const startWatchingPosition = async () => {
      const hasLocationPermission = await requestLocationPermission();
      if (!hasLocationPermission) return;

      const watchId = Geolocation.watchPosition(
        handlePosition,
        (error: any) => {
          console.error("Error getting position:", error);
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

  // Create Zone or Map Press Modal
  const openCreateZoneModal = () => {
    bottomSheetRef.current?.expand();
  };
  const handlePosition = (position: any) => {
    console.log("change position", position.coords);
    socket.emit("user-location", {
      text: "hello",
      user_id: USER_ID,
      coords: position.coords,
    });
  };

  const createZoneSheetHandler = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const myCoords: Position = [76.33284407131775, 10.020271744113368];
  const insideUserCheckCoords: Position = [76.1492354074162, 10.56544717046485];

  const gotoCollege = () => {
    if (cameraRef.current != null) {
      cameraRef.current.setCamera({
        centerCoordinate: NGO_QUARTERS,
        zoomLevel: 16.2,
        animationDuration: 2000,
      });
    }
  };

  const createEventPolygon = (coords: any, radius: any) => {
    // Create a polygon (approximating a circle) using Turf.js
    const polygon = turf.circle(coords, radius, {
      steps: 64, // More steps for smoother polygon
      units: "meters",
    });
    return polygon;
  };

  const createEventHandler = async () => {
    const polygon = createEventPolygon(eventCoords, radius);

    const newEvent = {
      created_by: USER_ID,
      coords: eventCoords,
      polygon, // Store the GeoJSON polygon instead of coords and radius
    };
    try {
      const response = await axios.post("http://172.20.10.2:3001/events/create", newEvent);
      console.log("Response", response.data);
    } catch (error: any) {
      console.log(error.message);
    }
    console.log("newEvent", newEvent);
    // setEvents(prevEvents => [...prevEvents, newEvent]);
    // setEventCoords(null);
    // setRadius(100);
  };

  const eventDetailsHandler = () => {
    console.log("Event details");
  };

  console.log("eventCoords", eventCoords);

  return (
    <View style={styles.container}>
      {/* Bottom Modals  */}
      <Portal>
        {/* Create Zone  */}
        <BottomSheet
          backgroundStyle={styles.sheetContainer}
          enablePanDownToClose
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          index={-1}
          onChange={createZoneSheetHandler}>
          <BottomSheetView style={styles.contentContainer}>
            <Button
              onPress={() => {
                setEventCoords(selectedPoints);
                bottomSheetRef.current?.close();
              }}
              text="Create your Zone"
            />
            <Button onPress={() => {}} text="Leave a message" />
            <Button onPress={() => {}} text="Report" />
          </BottomSheetView>
        </BottomSheet>
      </Portal>

      {/* Map  */}
      <MapView
        attributionEnabled
        style={styles.container}
        pitchEnabled={true}
        logoEnabled={false}
        scaleBarEnabled={false}
        compassPosition={{ top: 30, right: 10 }}
        styleURL="mapbox://styles/mapbox/light-v11"
        onMapIdle={e => console.log("Region Changed:", e)}
        onPress={(e: any) => {
          if (eventCoords != null) {
            setEventCoords(e.geometry.coordinates);
            return;
          }
          setSelectedPoints(e.geometry.coordinates);
          openCreateZoneModal();
        }}>
        {/* Model render experiment  */}
        <Models models={models} />
        <ShapeSource id={"shape-source-id-0"} shape={features}>
          {/* <CircleLayer id={"circle-layer"} style={circleLayerStyle} slot={"bottom"} /> */}
          <ModelLayer id="model-layer-id" style={modelLayerStyle} />
        </ShapeSource>
        {/* Clear events button */}
        <TouchableOpacity onPress={() => setEvents([])} style={{ position: "absolute", top: 65, right: 10, zIndex: 99 }} activeOpacity={0.5}>
          <View
            style={{
              width: 44,
              height: 44,
              backgroundColor: "#788D5D",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={{ position: "absolute", top: 150, right: 10, zIndex: 99 }} activeOpacity={0.5}>
          <View
            style={{
              width: 44,
              height: 44,
              backgroundColor: "#783D5D",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}></View>
        </TouchableOpacity>

        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={19}
          // maxZoomLevel={19}
          // minZoomLevel={17.5}
          centerCoordinate={MODEL_COORDS}
          animationMode={"easeTo"}
          pitch={45}
          heading={35}
        />

        {/* Show Current college region  */}
        {collegeRegion && (
          <ShapeSource id={`college-region`} shape={collegeRegion}>
            <FillLayer
              id={`college-region`}
              style={{
                fillColor: "rgba(0, 150, 255, 0.3)",
                fillOutlineColor: "rgba(0, 150, 255, 1)",
              }}
            />
          </ShapeSource>
        )}

        {events &&
          events.map((event: any, index) => (
            <Fragment key={index}>
              {/* Event Marker */}
              <MarkerView coordinate={turf.center(event.polygon).geometry.coordinates}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "gray",
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={eventDetailsHandler}
                />
              </MarkerView>

              {/* Polygon (Circle) ShapeSource */}
              <ShapeSource id={`event-polygon-${index}`} shape={event.polygon}>
                <FillLayer
                  id={`event-fill-${index}`}
                  style={{
                    fillColor: "rgba(0, 150, 255, 0.3)",
                    fillOutlineColor: "rgba(0, 150, 255, 1)",
                  }}
                />
              </ShapeSource>
            </Fragment>
          ))}

        {eventCoords && (
          <>
            {/* Event Marker */}
            <MarkerView coordinate={eventCoords}>
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  borderRadius: 50,
                  height: 20,
                  width: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </MarkerView>

            {/* Preview of the event polygon before creation */}
            <ShapeSource id="event-preview" shape={createEventPolygon(eventCoords, radius)}>
              <FillLayer
                id="event-fill-preview"
                style={{
                  fillColor: "rgba(0, 150, 255, 0.3)",
                  fillOutlineColor: "rgba(0, 150, 255, 1)",
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
            color: "teal",
            radius: 50.0,
          }}
        />

        {eventCoords && (
          <View
            style={{
              position: "absolute",
              bottom: 100,
              left: 10,
              right: 10,
            }}>
            <Slider minimumValue={10} maximumValue={100} value={radius} onValueChange={(value: any) => setRadius(value)} />
            <Button
              onPress={() => {
                setRadius(10);
                setEventCoords(null);
              }}
              text="Clear"
            />
            <Button onPress={createEventHandler} text="Create" />
          </View>
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
