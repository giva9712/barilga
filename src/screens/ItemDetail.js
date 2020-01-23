import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Platform, StatusBar } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Button,
  H1,
  Toast
} from "native-base";

import ToggleSwitch from "toggle-switch-react-native";

import NumericInput from "react-native-numeric-input";

class ItemDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.title}`,
    header: null
  });
  constructor(props) {
    super(props);
  }

  state = {
    detail: {
      ...this.props.navigation.state.params.item
    },
    updating: {
      isIncome: false,
      value: 1
    }
  };

  componentDidMount() {}

  _saveUpdates = () => {
    Toast.show({
      text: "Successfully saved!",
      buttonText: "Okay",
      duration: 3000
    });
    this.props.navigation.goBack();
  };

  render() {
    const color = this.state.updating.isIncome ? "#66BCBF" : "#F8777D";
    return (
      <Container>
        <Header transparent>
          <Left style={styles.flex}>
            <Button
              dark
              androidRippleColor={{ color: "#eee" }}
              transparent
              rounded
              large
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={styles.flex}>
            <Title style={{ color: "black" }}>
              {this.props.navigation.state.params.item.title}
            </Title>
          </Body>
          <Right style={styles.flex}>
            <Button
              dark
              androidRippleColor={{ color: "#eee" }}
              transparent
              rounded
              large
              onPress={() => {}}
            >
              <Icon name="md-refresh" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: this.state.detail.image }}
              style={{ height: 100, width: 100, flex: 1 }}
            />
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              flex: 1,
              width: "100%",
              flexWrap: "wrap",
              alignItems: "flex-start",
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 30
            }}
          >
            <View style={{ width: "50%" }}>
              <ToggleSwitch
                isOn={this.state.updating.isIncome}
                onColor="#66BCBF"
                offColor="#F8777D"
                label={this.state.updating.isIncome ? "Income" : "Expense"}
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="large"
                onToggle={isOn =>
                  this.setState({
                    updating: {
                      ...this.state.updating,
                      isIncome: !this.state.updating.isIncome
                    }
                  })
                }
              />
            </View>
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <H1
                style={{
                  color: color
                }}
              >
                {this.state.updating.isIncome ? "+" : "-"}
                {this.state.updating.value}
              </H1>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <NumericInput
              value={this.state.updating.value}
              onChange={value =>
                this.setState({ updating: { ...this.state.updating, value } })
              }
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              minValue={1}
              valueType="real"
              rounded
              textColor="#000"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor={color}
              leftButtonBackgroundColor={color}
            />
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button onPress={() => this._saveUpdates()}>
              <Text>Done</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  flex: {
    flex: 1
  }
});

ItemDetail.defaultProps = {
  detail: {
    title: "asd",
    image: "asd",
    stock: 0
  }
};

export default ItemDetail;
