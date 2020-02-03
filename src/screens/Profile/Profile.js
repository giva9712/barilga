import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { removeAuthInfo } from "../../store/actions";

import {
  Button,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";

import { useSafeArea } from "./extra/3rd-party";
import { ProfileAvatar } from "./extra/ProfileAvatar";
import { ProfileSetting } from "./extra/ProfileSetting";

const Profile = props => {
  const { navigation } = props;
  const safeArea = useSafeArea();
  console.log(props.auth);

  const profile = {
    firstName: "Татах-хүч",
    lastName: "Соронзон-Болд",
    photo: require("./assets/profile.jpg"),
    Gender: "Эрэгтэй",
    email: "magnet-power@gmail.com",
    phoneNumber: "+976 9181 1504"
  };

  _showMoreApp = () => {
    navigation.navigate("Other");
  };

  _signOutAsync = () => {
    props
      .removeAuthInfo()
      .then(() => {
        navigation.navigate("LoggedOut");
      })
      .catch(error => {});
  };

  return (
    <Layout style={[styles.container, { paddingTop: safeArea.top }]} level="2">
      <TopNavigation
        style={styles.header}
        alignment="center"
        title="Миний"
        // leftControl={renderBackAction()}
      />
      <ProfileAvatar style={styles.profileAvatar} source={profile.photo} />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Овог"
        value={profile.lastName}
      />
      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="Нэр"
        value={profile.firstName}
      />

      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="Email"
        value={profile.email}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Утас"
        value={profile.phoneNumber}
      />
      <Button style={styles.doneButton} onPress={_signOutAsync}>
        Гарах
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginBottom: 24
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: "center"
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24
  },
  profileSetting: {
    padding: 16
  },
  section: {
    marginTop: 24
  },
  doneButton: {
    margin: 24
  }
});

const mapStateToProps = state => ({
  auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
  removeAuthInfo: () => dispatch(removeAuthInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
