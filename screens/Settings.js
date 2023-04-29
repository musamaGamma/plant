import { ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Block, Text, Divider, Switch } from "../components";
import { mocks, theme } from "../constants";
import Slider from "@react-native-community/slider";

export default function Settings(props) {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState();
  const [monthly, setMonthly] = useState(1700);
  const [notifications, setNotification] = useState(false);
  const [budget, setBudget] = useState(850);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    setProfile(props.profile);
  }, []);

  const handleEdit = (name, text) => {
    profile[name] = text;

    setProfile(profile);
  };

  const toggleEdit = (name) => {
    setEditing(!editing ? name : null);
  };

  const renderEdit = (name) => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={(text) => handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  };

  return (
    <Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Username
              </Text>
              {renderEdit("username")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("username")}>
              {editing === "username" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Location
              </Text>
              {renderEdit("location")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("location")}>
              {editing === "location" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                E-mail
              </Text>
              <Text bold>{profile.email}</Text>
            </Block>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

        <Block style={styles.sliders}>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Budget
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={budget}
              onValueChange={setBudget}
            />
            <Text caption gray right>
              ${Math.round(budget, 2)}
            </Text>
          </Block>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={monthly}
              onValueChange={setMonthly}
            />
            <Text caption gray right>
              ${Math.round(monthly, 2)}
            </Text>
          </Block>
        </Block>

        <Divider />

        <Block style={styles.toggles}>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}>
            <Text gray2>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotification} />
          </Block>

          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}>
            <Text gray2>Newsletter</Text>
            <Switch value={newsletter} onValueChange={setNewsletter} />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

Settings.defaultProps = {
  profile: mocks.profile,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
