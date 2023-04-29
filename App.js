import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

import Navigation from "./navigation";
import { Block } from "./components";
import MainStackNavigator from "./navigation";

// import all used images
const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/avatar.png"),
];

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Show the splash screen
        await SplashScreen.preventAutoHideAsync();

        // Load images and other resources needed by the app
        await Promise.all(
          images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
          })
        );

        // Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Block white>
      <MainStackNavigator />
    </Block>
  );
}
