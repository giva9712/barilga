import React, { Component, useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from "react-native";
import {
  Input,
  TopNavigation,
  TopNavigationAction,
  Icon
} from "@ui-kitten/components";
import { Item } from "./extra/Item";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import PTRView from "react-native-pull-to-refresh";
import api from "../../provider/interceptors";

// Screen Dimensions
const { height, width } = Dimensions.get("window");

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

const SearchIcon = style => <Icon {...style} name="search" pack="feather" />;

const WarehouseItems = props => {
  const { navigation } = props;

  const _isMounted = useRef(true);

  const warehouse_id = navigation.state.params.item.id;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const InputIcon = style => (
    <Icon
      {...style}
      onPress={onIconPress}
      name={!!searchQuery ? "md-close-circle" : "search"}
      pack={!!searchQuery ? "ionicons" : "feather"}
    />
  );

  useEffect(() => {
    const did_focus = navigation.addListener("didFocus", payload => {
      _isMounted.current = true;
      _fetchData();
    });
    const did_blur = navigation.addListener("didBlur", payload => {
      _isMounted.current = false;
    });
    _fetchData();
    return () => {
      console.log("screen unmounted");
      did_focus.remove();
      did_blur.remove();
    };
  }, [navigation, page]);

  useEffect(() => {
    setProducts([]);
    if (page == 0) {
      _fetchData();
    } else {
      setPage(0);
    }
    return () => {
      //
    };
  }, [searchQuery]);

  const onItemActionPress = item => {
    navigation.navigate("ItemDetail", {
      item: { ...item, description: "", id: null, item_id: item.id }
    });
  };

  const renderProductItem = info => (
    <Item
      style={styles.item}
      index={info.index}
      product={info.item}
      onPress={() => onItemActionPress(info.item)}
    />
  );

  const onIconPress = () => {
    setSearchQuery("");
  };

  inputRef = React.useRef();

  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const _fetchData = () => {
    setLoading(true);
    api
      .get(
        `/get-items?warehouse_id=${warehouse_id}&balance=1&page=${page}&limit=${10}&search=${searchQuery}`
      )
      .then(res => {
        let tempVar = [...res.data.data];
        for (let index = 0; index < tempVar.length; index++) {
          tempVar[index]["warehouse_id"] = warehouse_id;
        }
        setProducts([...products, ...tempVar]);
        setLoading(false);
        if (tempVar.length == 0) {
          ToastAndroid.showWithGravityAndOffset(
            "Мэдээлэл алга!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            25,
            50
          );
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleEnd = () => {
    setPage(page + 1);
    console.log(page);
  };

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => navigation.goBack()}
    />
  );

  const renderSearchAction = () => (
    <TopNavigationAction
      icon={SearchIcon}
      onPress={() => setShowSearch(!showSearch)}
    />
  );

  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <TopNavigation
        title="Барааны жагсаалт"
        alignment="center"
        leftControl={renderBackAction()}
        rightControls={renderSearchAction()}
      />
      <View>
        {showSearch && (
          <Input
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Хайх"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            icon={InputIcon}
            onIconPress={onIconPress}
          />
        )}

        {products.length > 0 && (
          <Text style={styles.headerTitle} appearance="hint">
            {navigation.state.params.item.name}-ын бараанууд
          </Text>
        )}
      </View>
      <View
        style={{
          height: showSearch ? height - 250 : height - 180,
          width: width
        }}
      >
        <FlatList
          data={products}
          keyExtractor={(x, i) => String(i)}
          onEndReached={() => {
            if (!loading) handleEnd();
          }}
          onEndReachedThreshold={0.000001}
          ListFooterComponent={() =>
            loading ? null : <ActivityIndicator size="large" animating />
          }
          refreshing={loading}
          renderItem={renderProductItem}
        />
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    marginHorizontal: 16,
    marginVertical: 20
  },
  searchInput: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  },
  container: {
    flex: 1
    // paddingBottom: 70
  },
  base: {
    paddingTop: 15
  },
  badges: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  noData: {
    paddingVertical: 20,
    textAlign: "center"
  }
});

export default WarehouseItems;
