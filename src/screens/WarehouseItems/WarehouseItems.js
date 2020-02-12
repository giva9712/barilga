import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import {
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  Text,
  Spinner,
  Icon,
  Input
} from "@ui-kitten/components";
import { Item } from "./extra/Item";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import api from "../../provider/interceptors";

import _ from "lodash";

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

const SearchIcon = style => <Icon {...style} name="search" pack="feather" />;

const WarehouseItems = props => {
  const { navigation } = props;

  const warehouse_id = navigation.state.params.item.id;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => navigation.goBack()}
    />
  );

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  const InputIcon = style => (
    <Icon
      {...style}
      onPress={onIconPress}
      name={!!searchQuery ? "md-close-circle" : "search"}
      pack={!!searchQuery ? "ionicons" : "feather"}
    />
  );

  useEffect(() => {
    _isMounted = true;
    _fetchData();
  }, []);

  const getAndLoadImage = async BASE64_URI => {
    const response = await api.get(BASE64_URI);
    return response.data;
  };

  const _fetchData = () => {
    setLoading(true);
    api
      .get(`/get-items?warehouse_id=${warehouse_id}`)
      .then(res => {
        let tempVar = [...res.data.data];
        for (let index = 0; index < tempVar.length; index++) {
          tempVar[index]["warehouse_id"] = warehouse_id;
        }
        console.log(tempVar);
        setFilteredProducts(tempVar);
        setProducts(tempVar);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const _refresh = () => {
    _fetchData();
  };

  const onItemActionPress = item => {
    // console.log(item);
    navigation.navigate("ItemDetail", {
      ...item
    });
  };

  const renderProductItem = info => (
    <Item
      style={styles.item}
      index={info.index}
      product={info.item}
      onPress={() => onItemActionPress(info)}
    />
  );

  const showSearchSection = () => {
    setShowSearch(!showSearch);
  };

  const onIconPress = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchQuery && searchQuery != "") {
      setFilteredProducts(
        _.filter(products, function(el) {
          return el.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery]);

  const renderSearchAction = () => (
    <TopNavigationAction icon={SearchIcon} onPress={showSearchSection} />
  );

  return (
    <SafeAreaLayout insets="top" level="2" style={{ flex: 1 }}>
      <TopNavigation
        title="Барааны жагсаалт"
        alignment="center"
        leftControl={renderBackAction()}
        rightControls={renderSearchAction()}
      />
      <PTRView onRefresh={_refresh}>
        <View style={{ flex: 1 }}>
          {showSearch && (
            <Input
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
        {loading ? (
          <View
            style={{
              paddingVertical: 30,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner size="giant" />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={{ flex: 1 }}>
              {filteredProducts.length > 0 ? (
                <List data={filteredProducts} renderItem={renderProductItem} />
              ) : (
                <View>
                  <Text style={styles.noData}>Мэдээлэл алга</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </PTRView>
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

WarehouseItems.defaultProps = {};

export default WarehouseItems;
