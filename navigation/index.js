import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Browse from "../screens/Browse";
import Login from "../screens/Login";
import Explore from "../screens/Explore";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import { Image, View } from "react-native";
import Signup from "../screens/Signup";
import { theme } from "../constants";
import Forgot from "../screens/Forgot";
import { Block, Button, Input } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: theme.sizes.base * 4,
            backgroundColor: theme.colors.white,
            borderBottomColor: "transparent",
            elevation: 0,
          },
          headerShown: true,
          headerBackImage: () => (
            <Image source={require("../assets/icons/back.png")} />
          ),
          headerBackTitle: null,
          headerLeftContainerStyle: {
            alignItems: "center",
            marginLeft: 16,
            paddingRight: theme.sizes.base,
          },
          headerRightContainerStyle: {},
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Browse"
          component={Browse}
          options={{
            headerRight: () => {
              const navigation = useNavigation();
              return (
                <Button onPress={() => navigation.navigate("Settings")}>
                  <Image
                    style={{
                      height: theme.sizes.base * 2.2,
                      width: theme.sizes.base * 2.2,
                    }}
                    source={require("../assets/images/avatar.png")}
                  />
                </Button>
              );
            },
          }}
        />

        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: true,
            headerTitle: "Forgot your password",
          }}
        />
        <Stack.Screen
          name="Explore"
          component={Explore}
          options={{
            headerRight: () => (
              <Input
                placeholder="Search"
                placeholderTextColor={theme.colors.gray2}
                rightStyle={{
                  top: 0,
                  marginVertical: 0,
                  backgroundColor: "transparent",
                }}
                style={{
                  fontSize: theme.sizes.caption,
                  height: theme.sizes.base * 2,
                  width: 150,
                  backgroundColor: "rgba(142, 142, 147, 0.06)",
                  borderColor: "rgba(142, 142, 147, 0.06)",
                  paddingLeft: theme.sizes.base / 1.333,
                  paddingRight: theme.sizes.base * 1.5,
                }}
                // rightStyle={styles.searchRight}
                rightLabel={
                  <Ionicons
                    // name={isEditing ? "close" : "search"}
                    name="search"
                    size={theme.sizes.base / 1.6}
                    color={theme.colors.gray2}
                    style={{
                      position: "absolute",
                      right: theme.sizes.base / 1.333,
                      top: theme.sizes.base / 1.6,
                    }}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
