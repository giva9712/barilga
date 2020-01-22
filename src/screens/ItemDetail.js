import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

import { Container, Header, Content, Text } from "native-base";

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
    }
  };

  componentDidMount() {}
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Left style={styles.flex}>
            <Button
              dark
              androidRippleColor={{ color: "#eee" }}
              transparent
              rounded
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
              onPress={() => {}}
            >
              <Icon name="arrow-back" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Image
            source={{ uri: this.state.detail.image }}
            style={{ height: 300, width: "100%", flex: 1 }}
          />
          <Text>{"Item detail"}</Text>
        </Content>
      </Container>
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

ItemDetail.defaultProps = {
  detail: {
    title: "asd",
    image: "asd",
    stock: 0
  }
};

export default ItemDetail;
