import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { removeAuth } from "../../store/actions";

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
  const [profile, setProfile] = useState({
    id: props.userInfo.id,
    username: props.userInfo.username,
    email: props.userInfo.email,
    phone: props.userInfo.phone,
    photo: {
      uri:
        "https://previews.123rf.com/images/prettyvectors/prettyvectors1309/prettyvectors130900060/22545994-user-profile-avatar-man-icon.jpg"
    }
  });

  _showMoreApp = () => {
    navigation.navigate("Other");
  };

  _signOutAsync = () => {
    props.removeAuth();
    navigation.navigate("LoggedOut");
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
        hint="Username"
        value={profile.username}
      />

      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="Email"
        value={profile.email}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Утас"
        value={profile.phone}
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
    alignSelf: "center",
    marginBottom: 24
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
  userInfo: state.token.userInfo
});

const mapDispatchToProps = dispatch => ({
  removeAuth: () => dispatch(removeAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
