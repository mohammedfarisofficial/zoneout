import { useEffect, useRef, useState, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import Geolocation from "@react-native-community/geolocation";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import { requestLocationPermission } from "src/utils/geolocation";

import * as ROUTES from "@constants/routes";
import { Camera, FillLayer, LocationPuck, MapView, ShapeSource } from "@rnmapbox/maps";
import { checkCollege } from "@helper/zoneout-api";
import { setCurrentCollege } from "../../../store/data/reducer";
import { useAppDispatch } from "../../../store/index";

const IES_COORDS = [76.14814461016903, 10.564417196053261];
const NGO_QUARTERS = [76.33303251966987, 10.02020933776492];

const SelectCollegeScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};
  const [userCoords, setUserCoords] = useState({ lat: 0, lng: 0 });
  const [college, setCollege] = useState<any>(null);

  const cameraRef = useRef<Camera | null>(null);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      const startWatchingPosition = async () => {
        const hasLocationPermission = await requestLocationPermission();
        if (!hasLocationPermission) {
          console.log("Location service not enabled");
          return;
        }

        const watchId = Geolocation.watchPosition(
          updateLocation,
          (error: any) => {
            console.error("Error getting position:", error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 0,
          },
        );

        return () => {
          Geolocation.clearWatch(watchId);
        };
      };

      startWatchingPosition();
    }, []),
  );

  console.log("userCoords",userCoords)

  useEffect(() => {
    (async () => {
      const formData = { userId, coords: userCoords };
      const { success, error, data } = await checkCollege(formData);

      if (error) {
        console.log("Something went wrong!!");
        return;
      }
      if (success && data) {
        setCollege(data.college);
      }
    })();
  }, [userCoords]);

  const updateLocation = ({ coords: { latitude, longitude } }: any) => {
    console.log(latitude, longitude);
    if (latitude && longitude) {
      setUserCoords({ lat: latitude, lng: longitude });
    }
  };

  console.log("college render", college);

  const selectCampusHandler = () => {
    if (college === null) {
      // Please select college to continue
      return;
    }
    dispatch(setCurrentCollege(college));
    navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SET_DOB, params: { userId } });
  };
  return (
    <View>
      <Typography>Select College Screen</Typography>
      <View style={styles.mapContainer}>
        <MapView
          attributionEnabled
          style={styles.mapInnerContainer}
          pitchEnabled={true}
          logoEnabled={false}
          scaleBarEnabled={false}
          compassPosition={{ top: 30, right: 10 }}
          styleURL="mapbox://styles/mapbox/light-v11"
          onMapIdle={e => console.log("Region Changed:", e)}
          scrollEnabled={true}>
          <LocationPuck
            visible={true}
            puckBearing="course" // For the movement
            pulsing={{
              isEnabled: true,
              color: "teal",
              radius: 50.0,
            }}
          />
          <Camera ref={cameraRef} zoomLevel={16.2} followUserLocation animationMode={"moveTo"} pitch={45} heading={35} />
          {college && (
            <ShapeSource id={`event-polygon-test`} shape={college}>
              <FillLayer
                id={`event-fill-test`}
                style={{
                  fillColor: "rgba(0, 150, 255, 0.3)",
                  fillOutlineColor: "rgba(0, 150, 255, 1)",
                }}
              />
            </ShapeSource>
          )}
        </MapView>
      </View>
      {college &&  <Typography>Campus found!</Typography>}
      {college &&  <Typography>Name : {college?.name}</Typography>}
      {college &&  <Typography>Campus ID : {college?._id}</Typography>}
      <Button variant="secondary" onPress={selectCampusHandler} text="Select" />
    </View>
  );
};

export default SelectCollegeScreen;
