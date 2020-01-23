import React from "react";
import { StyleSheet, View } from "react-native";

import { connect } from "react-redux";
import { removeUserToken } from "../store/actions";
import PTRView from "react-native-pull-to-refresh";
import { Platform, StatusBar } from "react-native";
import PopupMenu from "../component/PopupMenu/PopupMenu";
import { Entypo } from "@expo/vector-icons";

import {
  Container,
  Content,
  Text,
  Separator,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Header,
  Title,
  Subtitle,
  Icon,
  Spinner,
  Item,
  Input
} from "native-base";
import _ from "lodash";

class WarehouseItems extends React.Component {
  _isMounted = false;

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    // title: "Warehouse details"
    header: null
  });
  constructor(props) {
    super(props);
  }

  state = {
    bookMarked: false,
    loading: false,
    WarehouseItems: []
  };

  componentDidMount() {
    this._isMounted = true;
    this._fetchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _fetchData = () => {
    this.setState({
      loading: true
    });
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      this.setState({
        WarehouseItems: [...this.props.WarehouseItems],
        loading: false
      });
    });
  };
  _seeDetail = item => {
    this.props.navigation.navigate("ItemDetail", {
      item
    });
  };
  _refresh = () => {
    this._fetchData();
  };
  _popMenuHandler = (e, i) => {
    console.log(e, i);
    if (i == 0) {
      this._refresh();
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "white" }}>
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
              {this.props.navigation.state.params.name}
            </Title>
          </Body>
          <Right style={styles.flex}>
            {/* <PopupMenu
              actions={["Refresh", "Bookmark"]}
              onPress={(e, i) => this._popMenuHandler(e, i)}
            /> */}
            <Button
              dark
              androidRippleColor={{ color: "#eee" }}
              transparent
              rounded
              large
              onPress={() => this._refresh()}
            >
              <Icon name="md-refresh" />
            </Button>
          </Right>
        </Header>
        <Header searchBar rounded>
          <Item style={styles.searchInput}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            {/* <Icon name="md-search" /> */}
          </Item>

          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <PTRView onRefresh={this._refresh}>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Content>
              <List>
                <ListItem itemDivider>
                  <Text>
                    {/* Items in {this.props.navigation.state.params.name} */}
                    {this.state.WarehouseItems.length} types,{" "}
                    {_.sumBy(this.state.WarehouseItems, "stock")} items
                  </Text>
                </ListItem>
                {this.state.WarehouseItems.map((item, index) => (
                  <ListItem
                    onPress={() => this._seeDetail(item)}
                    key={index}
                    thumbnail
                  >
                    <Left>
                      <Thumbnail
                        square
                        source={{
                          uri: item.image
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>{item.title}</Text>
                      {/* <Text note numberOfLines={1}>
                        {item.location}
                      </Text> */}
                      <Text note numberOfLines={1}>
                        <Entypo name="box" /> Stock: {item.stock}
                      </Text>
                    </Body>
                    {/* <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right> */}
                  </ListItem>
                ))}
              </List>
            </Content>
          )}
        </PTRView>
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
  header: {
    backgroundColor: "red"
  },
  search: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  searchInput: {
    width: "80%"
  },
  header: {
    position: "absolute",
    top: 20
  },
  flex: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  removeUserToken: () => dispatch(removeUserToken())
});

WarehouseItems.defaultProps = {
  WarehouseItems: [
    {
      image:
        "https://contents.mediadecathlon.com/p1744688/k$74318222cb61e90373583c42db630b8f/f100-hybrid-size-5-football-ball-orange-blue.jpg?&f=800x800",
      title: "Smark Ball",
      stock: 120
    },
    {
      image:
        "https://www.lenovo.com/medias/lenovo-tablet-m10-hero-1-.png?context=bWFzdGVyfHJvb3R8NjI0MTF8aW1hZ2UvcG5nfGgyMi9oMmIvOTk4ODM0NjQ0NTg1NC5wbmd8MDYxMDlmYTE0M2YxZDMyM2VjYTUyMThjNDQwM2VlNzgyYTQ5ZTM0OTVlZmM4OWI3OTc0ZjA1NjI4YjYwNTQxZQ",
      title: "Lenovo tablet",
      stock: 50
    },
    {
      image:
        "https://images.giant-bicycles.com/b_white,c_pad,h_650,q_80/eke5h70f5dgtgigg6wzu/MY19FathomE+1Pro_ColorA.jpg",
      title: "Fathom E+ 1 Pro",
      stock: 31
    }
  ]
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseItems);
