import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { removeUserToken } from "../store/actions";

class Profile extends Component {
  static navigationOptions = {
    title: "Миний"
  };

  constructor(props) {
    super(props);
    // this.onLogout = this.onLogout.bind(this);
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {
        this.props.navigation.navigate("LoggedOut");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <View style={styles.base}>
        <Button title="Logout" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
