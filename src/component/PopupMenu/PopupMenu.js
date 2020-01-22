import React from "react";
import { View, UIManager, findNodeHandle } from "react-native";
import { Button, Icon } from "native-base";

class PopupMenu extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  handleMenuPress = () => {
    const { actions, onPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      actions,
      this.handleShowPopupError,
      onPress
    );
  };

  render() {
    return (
      <View>
        {this.props.children}
        <Button
          dark
          androidRippleColor={{ color: "#eee" }}
          transparent
          onPress={this.handleMenuPress}
        >
          <Icon name="more" size={30} ref="menu" />
        </Button>
      </View>
    );
  }
}

export default PopupMenu;
