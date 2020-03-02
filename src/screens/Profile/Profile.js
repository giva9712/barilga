import React, { Component, useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import { removeAuth } from "../../store/actions";

import {
  Button,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Input
} from "@ui-kitten/components";

import { useSafeArea } from "./extra/3rd-party";
import { ProfileAvatar } from "./extra/ProfileAvatar";
import { ProfileSetting } from "./extra/ProfileSetting";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import api from "../../provider/interceptors";

const PasswordIcon = style => (
  <Icon {...style} name="ios-lock" pack="ionicons" />
);

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

  const gotoPasswordChange = () => {
    navigation.navigate("PasswordChange");
  };

  const renderSearchAction = () => (
    <TopNavigationAction icon={PasswordIcon} onPress={gotoPasswordChange} />
  );

  const [showModal, setShowModal] = useState(false);

  const handlePasswordChangeModal = () => {
    setShowModal(true);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const EyeOldIcon = ({ style }) => (
    <Icon
      {...style}
      onPress={() => setShowOldPassword(!showOldPassword)}
      name={showOldPassword ? "md-eye" : "md-eye-off"}
      pack="ionicons"
    />
  );
  const EyeNewIcon = ({ style }) => (
    <Icon
      {...style}
      onPress={() => setShowNewPassword(!showNewPassword)}
      name={showNewPassword ? "md-eye" : "md-eye-off"}
      pack="ionicons"
    />
  );
  const handleUpdatePassword = () => {
    api
      .post("/change-password", {
        id: profile.id,
        username: profile.username,
        password: oldPassword,
        new_password: newPassword
      })
      .then(res => {
        setShowModal(false);
        ToastAndroid.showWithGravityAndOffset(
          "Амжилттай солигдлоо!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
      })
      .catch(err => {
        console.log(err.request.data);
      });
  };

  return (
    <Layout style={[styles.container, { paddingTop: safeArea.top }]} level="2">
      <TopNavigation
        style={styles.header}
        alignment="center"
        title="Миний"
        // rightControls={renderSearchAction()}
        // leftControl={renderBackAction()}
      />

      <ProfileAvatar style={styles.profileAvatar} source={profile.photo} />
      <Modal
        transparent={true}
        animationType={"none"}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalBackground}
          onPress={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.activityIndicatorWrapper}>
              <View
                style={{ position: "absolute", zIndex: 99, top: 20, right: 20 }}
              >
                <AntDesign
                  onPress={() => setShowModal(false)}
                  name="closecircle"
                  size={32}
                />
              </View>
              <View>
                <Input
                  style={{
                    marginHorizontal: 16,
                    marginTop: 16,
                    marginBottom: 8,

                    width: 300
                  }}
                  icon={EyeOldIcon}
                  placeholder="Хуучин нууц үг"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry={!showOldPassword}
                />
              </View>
              <View>
                <Input
                  style={{
                    marginHorizontal: 16,
                    marginTop: 16,
                    marginBottom: 8,

                    width: 300
                  }}
                  placeholder="Шинэ нууц үг"
                  value={newPassword}
                  secureTextEntry={!showNewPassword}
                  icon={EyeNewIcon}
                  onChangeText={setNewPassword}
                />
              </View>
              <View>
                <Button
                  style={styles.doneButton}
                  onPress={handleUpdatePassword}
                >
                  Хадгалах
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Button
        style={styles.doneButton}
        status="basic"
        onPress={handlePasswordChangeModal}
      >
        Нууц үг солих
      </Button>
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
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 400,
    width: 330,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

const mapStateToProps = state => ({
  userInfo: state.rootReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  removeAuth: () => dispatch(removeAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
