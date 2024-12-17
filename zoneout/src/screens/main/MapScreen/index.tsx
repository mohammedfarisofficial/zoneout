import { useEffect, useRef, useState, Fragment, useMemo, useCallback } from "react";
import { TouchableOpacity, View, Image as RNImage, Platform } from "react-native";
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
  ShapeSource,
  FillLayer,
  SymbolLayer,
  ModelLayer,
  CircleLayer,
  ModelLayerStyle,
  Light,
  LightLayerStyle,
  Models,
  PointAnnotation,
  Images,
  Image,
} from "@rnmapbox/maps";
import type { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import axios from "axios";
import { useSelector } from "react-redux";
import { Portal } from "@gorhom/portal";
import * as turf from "@turf/turf";
import { styles } from "./styles";

import { Slider } from "@miblanchard/react-native-slider";

// import Geolocation from "@react-native-community/geolocation";
import Geolocation from "react-native-geolocation-service";

import { REACT_APP_MAPBOX_ACCESS_TOKEN } from "@env";

import { requestLocationPermission } from "../../../utils/geolocation";
import { closeWebSocket, connectWebSocket, sendMessage, socket } from "@services/socketio";
import { useAuth } from "src/context/AuthContext";

import { RootState, useAppDispatch } from "@store/index";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import ZoneGallery from "@components/map/zone-gallery";
import { haptic } from "src/utils/haptic";

import * as ROUTES from "@constants/routes";
import * as FONTS from "@constants/font";
import * as COLORS from "@constants/colors";
import * as SOCKET_EVENTS from "@constants/socket-event";

import ZoneDetailsModal from "@components/modals/ZoneDetailsModal";
import useSwitch from "@hooks/useSwitch";
import UserMarker, { TEST_IMAGE_URL } from "@components/map/user-marker";
import UserDetailsModal from "@components/modals/UserDetailsModal";
import { getAllEvent } from "@helper/zoneout-api";
import { Connection, logout, updateConnectionLocation } from "@store/auth/reducer";
import { handleLogout } from "@store/auth/action";
import withAuth from "src/hoc/withAuth";
import { Avatar } from "@constants/images";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import LongPressMenuModal from "@components/modals/LongPressMenuModal";
import CreateEvent from "@components/map/create-event";
import { normalizeHeight, normalizeWidth } from "@utils/scaling";
import { BlurView } from "@react-native-community/blur";
import { forceRedirectToAuth } from "@navigation/AppContext";
import { useTabBarVisibility } from "@components/custom-tabbar/TabBarVisibilityContext";

// import LinearGradient from "react-native-linear-gradient";
// import { BlurView } from "@react-native-community/blur";

const modelLayerStyle: ModelLayerStyle = {
  modelId: "car",
  modelScale: [5, 5, 5],
  modelTranslation: [0, 0, -1], // Adjust Z-axis to move the model down
};
const lightStyle: LightLayerStyle = {
  anchor: "viewport", // "map" or "viewport"
  position: [1.5, 90, 80], // [azimuth, altitude, radius]
  intensity: 0.9, // Light intensity (0-1)
  color: "green",
};

// const circleLayerStyle = {
//   circleRadiusTransition: { duration: 5000, delay: 0 },
//   circleColor: "#ff0000",
//   circleRadius: 20,
// };

const models = {
  car: require("../../../data/3d-models/model.glb"),
};
// Test coords
const features: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "a-feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [76.33303251966987, 10.02020933776492],
      },
    },
    {
      type: "Feature",
      id: "b-feature",
      properties: {},
      geometry: {
        coordinates: [76.33286769822325, 10.020785026464779],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "c-feature",
      properties: {},
      geometry: {
        coordinates: [76.3323114772403, 10.020374722399794],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "d-feature",
      properties: {},
      geometry: {
        coordinates: [76.3320728078744, 10.020693405213521],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "e-feature",
      properties: {},
      geometry: {
        coordinates: [76.33279083859748, 10.020189487870894],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "f-feature",
      properties: {},
      geometry: {
        coordinates: [76.33197369940831, 10.02016160309401],
        type: "Point",
      },
    },
  ],
};
const users: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "user-1",
      properties: {},
      geometry: {
        coordinates: [76.33271367012276, 10.020696692844794],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-2",
      properties: {},
      geometry: {
        coordinates: [76.33271367012276, 10.020465489100204],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-3",
      properties: {},
      geometry: {
        coordinates: [76.33230115011918, 10.020528151813153],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-4",
      properties: {},
      geometry: {
        coordinates: [76.33245694224814, 10.020178104776733],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-5",
      properties: {},
      geometry: {
        coordinates: [76.3322133799071, 10.020767998638547],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-6",
      properties: {},
      geometry: {
        coordinates: [76.33288701629374, 10.020394183238892],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-7",
      properties: {},
      geometry: {
        coordinates: [76.33303403140167, 10.020258053824548],
        type: "Point",
      },
    },
    {
      type: "Feature",
      id: "user-8",
      properties: {},
      geometry: {
        coordinates: [76.33213219245874, 10.020124085138733],
        type: "Point",
      },
    },
  ],
};

const IES_COORDS = [76.14814461016903, 10.564417196053261];
const NGO_QUARTERS = [76.33303251966987, 10.02020933776492];
const MODEL_COORDS = [-74.00597, 40.71427];
// Test user id
const IS_MEMBER = false;

Mapbox.setAccessToken(REACT_APP_MAPBOX_ACCESS_TOKEN);

const MapScreen = ({ navigation }: any) => {
  const [eventCoords, setEventCoords] = useState(null);
  const [radius, setRadius] = useState(10);
  const [events, setEvents] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState(null);
  const [selectedUser, setSelectedUser] = useState<Connection | null>(null);

  const { hideTabBar } = useTabBarVisibility();

  const [selectedZoneCoords, setSelectedZoneCoords] = useState({ latitude: 0, longitude: 0 });

  const [annotations, setAnnotations] = useState([]);
  const [usersMarkers, setUsersMarkers] = useState([]);
  const [lastPressedId, setLastPressedId] = useState(null);

  const { isActive: isZoneVisible, onStart: visibleZone, onEnd: hideZone } = useSwitch(true);
  const { isActive: isUsersVisible, onStart: visibleUsers, onEnd: hideUsers } = useSwitch(true);

  const { collegeRegion } = useSelector((state: RootState) => state.data);
  const { authUser, userCampus } = useSelector((state: RootState) => state.auth);

  const cameraRef = useRef<Camera | null>(null);
  const longPressModalRef = useRef<BottomSheet>(null);
  const viewZoneModalRef = useRef<BottomSheet>(null);
  const userDetailsModalRef = useRef<BottomSheet>(null);
  const watchIdRef = useRef<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const featureAnnotations = features.features.map((feature, index) => ({
      id: `annotation-${index}`,
      coordinate: feature.geometry.coordinates,
    }));

    const formattedUsersMarkers = users.features.map((feature, index) => ({
      id: `annotation-${index}`,
      coordinate: feature.geometry.coordinates,
    }));

    setUsersMarkers(formattedUsersMarkers);
    setAnnotations(featureAnnotations);
  }, [features]);

  // useEffect(() => {
  //   (async () => {
  //     const hasLocationPermission = await requestLocationPermission();
  //     if (!hasLocationPermission) {
  //       console.log("No permission");
  //       return;
  //     }
  //     const watchId = Geolocation.watchPosition(
  //       updateUserPosition,
  //       (error: any) => {
  //         console.error("Error getting position:", error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         distanceFilter: 0, // meters
  //       },
  //     );
  //     watchIdRef.current = watchId;
  //   })();
  //   return () => {
  //     if (watchIdRef.current !== null) {
  //       Geolocation.clearWatch(watchIdRef.current);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //     (async ()=> {
  //       const hasLocationPermission = await requestLocationPermission();
  //       if (!hasLocationPermission) {
  //         console.log("No permission")
  //         return
  //       };
  //     Geolocation.watchPosition(
  //       (position) => {
  //         console.log(position);
  //       },
  //       (error) => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       { enableHighAccuracy: true, distanceFilter: 0 }
  //   );
  //     })()
  // }, []);

  console.log("authUser", authUser);

  const updateUserPosition = (position: any) => {
    // console.log("position.coords",position.coords);
    const { longitude, latitude } = position.coords;

    if (authUser === null || !latitude || !longitude) {
      return;
    }

    const message = {
      event: SOCKET_EVENTS.USER_LOCATION,
      payload: {
        user_id: authUser._id,
        coords: {
          latitude,
          longitude,
        },
      },
    };

    sendMessage(message);
  };
  // useEffect(() => {
  //   // Function to handle location updates
  //   const handleLocationUpdate = (event: any) => {
  //     try {
  //       const update = JSON.parse(event.data);
  //       const { user_id, latitude, longitude } = update.data;

  //       dispatch(updateConnectionLocation({ user_id, location: [longitude, latitude] }));
  //     } catch (error) {
  //       console.error("Error parsing WebSocket message:", error);
  //     }
  //   };
  //   // Establish WebSocket connection
  //   connectWebSocket();
  //   // Attach event listener
  //   if (typeof socket !== "undefined") {
  //     socket.onmessage = handleLocationUpdate;
  //   } else {
  //     console.error("WebSocket not initialized properly.");
  //   }

  //   // Cleanup on component unmount
  //   return () => {
  //     console.log("Cleaning up WebSocket...");
  //     closeWebSocket();
  //   };
  // }, [dispatch]);

  // Create Zone or Map Press Modal
  const openCreateZoneModal = () => {
    longPressModalRef.current?.expand();
  };
  const viewZoneModal = () => {
    viewZoneModalRef.current?.expand();
  };

  const createZoneSheetHandler = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    console.log("Event");
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
    navigation.navigate(ROUTES.MAIN, { screen: ROUTES.MAIN_CREATE_EVENT });
    return;
    const polygon = createEventPolygon(eventCoords, radius);

    const newEvent = {
      created_by: authUser?._id,
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

  const zoneClickHandler = (e: OnPressEvent | any) => {
    console.log("Model Pressed");
    const { latitude, longitude } = e.coordinates;

    if (cameraRef.current != null && longitude && latitude) {
      cameraRef.current.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 21,
        animationMode: "linearTo",
        animationDuration: 100,
      });
    }
  };

  const resetCamera = (coords = NGO_QUARTERS): any => {
    console.log(coords);
    if (!cameraRef.current) return;
    if (eventCoords) return;
    haptic(2);
    cameraRef.current.setCamera({
      centerCoordinate: coords,
      zoomLevel: 19,
      animationMode: "easeTo",
      animationDuration: 500,
      pitch: 45,
      heading: 35,
    });
  };

  const zoneViewHandler = (coordinates: any) => {
    console.log("View Pressed", coordinates);
    const offset = -0.0002;
    if (cameraRef.current != null && coordinates) {
      const newCoordinates = [coordinates[0], coordinates[1] + offset];
      setSelectedZoneCoords({ latitude: coordinates[0], longitude: coordinates[1] });
      cameraRef.current.setCamera({
        zoomLevel: 21,
        animationMode: "linearTo",
        animationDuration: 500,
        pitch: 60,
        heading: 360,
        centerCoordinate: newCoordinates,
      });
      haptic(2);
      viewZoneModalRef.current?.snapToIndex(0);
    }
  };

  const onZoneLongPress = () => {
    haptic(1);
  };

  const gotoUserDetailsScreen = () => {
    userDetailsModalRef.current?.close();
    navigation.navigate(ROUTES.MAIN, { screen: ROUTES.MAIN_USER_DETAILS, params: { userId: selectedUser?._id } });
  };

  const eventCreationHanlder = () => {
    setEventCoords(selectedPoints);
    longPressModalRef.current?.close();
  };

  return (
    <View style={styles.container}>
      {/* Bottom Modals  */}
      <Portal>
        {/* Create Zone  */}
        {/* <BottomSheet
          backgroundStyle={styles.sheetContainer}
          enablePanDownToClose
          snapPoints={snapPoints}
          ref={createZoneModalRef}
          index={-1}
          onChange={createZoneSheetHandler}>
          <BottomSheetView style={styles.contentContainer}>
            <Button
              onPress={() => {
                setEventCoords(selectedPoints);
                createZoneModalRef.current?.close();
              }}
              text="Create your Zone"
            />
            <Button onPress={() => {}} text="Leave a message" />
            <Button onPress={() => {}} text="Report" />
          </BottomSheetView>
        </BottomSheet> */}
        <LongPressMenuModal
          selectedPoints={selectedPoints}
          onEventCreation={eventCreationHanlder}
          setEventCoords={setEventCoords}
          ref={longPressModalRef}
          onChange={() => {}}
        />
        {/* Zone Click  */}
        <ZoneDetailsModal
          onChange={() => {}}
          ref={viewZoneModalRef}
          onClose={() => resetCamera([selectedZoneCoords.latitude, selectedZoneCoords.longitude])}
          isMember={IS_MEMBER}
        />
        <UserDetailsModal
          userData={selectedUser}
          ref={userDetailsModalRef}
          onUserDetails={gotoUserDetailsScreen}
          onChange={() => {}}
          onClose={() => {
            if (selectedUser) {
              resetCamera(selectedUser.location);
              setSelectedUser(null);
            }
          }}
        />
      </Portal>

      <TouchableOpacity onPress={() => forceRedirectToAuth()} style={{ position: "absolute", top: 50, right: 10, zIndex: 99 }} activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (isUsersVisible ? hideUsers() : visibleUsers())}
        style={{ position: "absolute", top: 100, right: 10, zIndex: 99 }}
        activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (isZoneVisible ? hideZone() : visibleZone())}
        style={{ position: "absolute", top: 150, right: 10, zIndex: 99 }}
        activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigation.navigate(ROUTES.MAIN, { screen: ROUTES.MAIN_NOTIFICATION })}
        onPress={hideTabBar}
        style={{ position: "absolute", top: 200, right: 10, zIndex: 99 }}
        activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ position: "absolute", top: 50, left: 10, zIndex: 99 }} activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.MAIN, { screen: ROUTES.MAIN_CAMPUS_DETAILS })}
        style={{ position: "absolute", top: 50, left: 60, zIndex: 99 }}
        activeOpacity={0.5}>
        <View
          style={{
            width: scale(32),
            height: scale(32),
            backgroundColor: "gray",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}></View>
      </TouchableOpacity>

      <View style={{ position: "absolute", top: 50, width: "100%", zIndex: 9, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        {eventCoords && (
          <BlurView
            blurType={Platform.OS === "ios" ? "ultraThinMaterialDark" : "light"}
            blurAmount={10}
            overlayColor={COLORS.GRAY_200}
            reducedTransparencyFallbackColor={COLORS.GRAY_200}
            style={{
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              width: normalizeHeight(50),
              paddingVertical: normalizeHeight(5),
            }}>
            <Typography fontFamily={FONTS.POPPINS_SEMIBOLD} style={{ color: COLORS.WHITE }}>
              {Math.round(radius)}m
            </Typography>
          </BlurView>
        )}
      </View>

      {eventCoords && (
        <CreateEvent
          radius={radius}
          onChange={(value: any) => setRadius(value)}
          onClear={() => {
            setRadius(10);
            setEventCoords(null);
          }}
          onChangeEnd={() => console.log("trigger")}
          onCreate={createEventHandler}
        />
      )}

      {/* Map  */}
      <MapView
        attributionEnabled
        style={styles.container}
        pitchEnabled={true}
        logoEnabled={false}
        scaleBarEnabled={false}
        compassPosition={{ top: 60, left: 10 }}
        // styleURL="mapbox://styles/mohammedfarisofficial1/clfgrkcas000801qxj8qp9reg"
        // styleURL="mapbox://styles/mapbox/dark-v11"
        styleURL="mapbox://styles/mapbox/light-v11"
        onMapIdle={e => console.log("Region Changed:", e)}
        onPress={(e: any) => {
          if (eventCoords != null) {
            setEventCoords(e.geometry.coordinates);
            return;
          }
        }}
        onLongPress={(e: any) => {
          if (eventCoords != null) {
            return;
          }
          setSelectedPoints(e.geometry.coordinates);
          openCreateZoneModal();
        }}>
        {/* Image Test  */}
        {/* <Images images={{ topImage: TEST_IMAGE_URL }} /> */}
        {/* Model render experiment  */}
        <Models models={models} />
        <ShapeSource onPress={zoneClickHandler} id={"shape-source-id-0"} shape={features}>
          <ModelLayer id="model-layer-id" style={modelLayerStyle} />
        </ShapeSource>
        {/* Image Gallery */}
        {isZoneVisible &&
          annotations.map(annotation => (
            <MarkerView allowOverlapWithPuck key={annotation.id} coordinate={annotation.coordinate} allowOverlap={true}>
              <ZoneGallery onLongPress={onZoneLongPress} onPress={() => zoneViewHandler(annotation.coordinate)} id={annotation.id} />
            </MarkerView>
          ))}
        {/* Dummy Users  */}
        {false &&
          usersMarkers.map((annotation, index) => (
            <MarkerView allowOverlapWithPuck key={annotation.id} coordinate={annotation.coordinate} allowOverlap={true}>
              <UserMarker index={index} onPress={() => userDetailsModalRef.current?.expand()} />
            </MarkerView>
          ))}
        {/* Users  */}
        {/* {isUsersVisible &&
          authUser?.connections.map((connection, index) => {
            if (connection.location) {
              return (
                <MarkerView allowOverlapWithPuck key={connection._id} coordinate={connection.location} allowOverlap={true}>
                  <UserMarker
                    text={connection.email}
                    index={index}
                    onPress={() => {
                      if (cameraRef.current) {
                        cameraRef.current.setCamera({
                          zoomLevel: 21,
                          animationMode: "easeTo",
                          animationDuration: 300,
                          centerCoordinate: connection.location,
                        });
                      }
                      setSelectedUser(connection);
                      userDetailsModalRef.current?.expand();
                    }}
                  />
                </MarkerView>
              );
            }
          })} */}

        {/* <Light style={lightStyle}  /> */}
        {/* Clear events button */}

        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={19}
          // maxZoomLevel={19}
          minZoomLevel={17.5}
          centerCoordinate={NGO_QUARTERS}
          animationMode={"easeTo"}
          pitch={45}
          heading={35}
        />

        {/* Show Current college region  */}
        {userCampus && (
          <ShapeSource id={`college-region`} shape={userCampus}>
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
            <MarkerView
              coordinate={eventCoords}
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
              allowOverlap={true}>
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
          // topImage="topImage"
          visible={true}
          pulsing={{
            isEnabled: true,
            color: "teal",
            radius: 50.0,
          }}
        />
      </MapView>
    </View>
  );
};

export default withAuth(MapScreen);
