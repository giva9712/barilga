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
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { Item } from "./extra/Item";

import _ from "lodash";

const datas = {
  1: [
    {
      id: 1,
      title: "Тоосго",
      subtitle: "Материал",
      image: {
        uri: "https://www.sabatradebd.com/wp-content/uploads/2015/12/81.jpg"
      },
      price: 123,
      amount: 5300
    },
    {
      id: 2,
      title: "Төмөр",
      subtitle: "Материал",
      image: {
        uri:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_JK2aov6C_ZaTV_mOerk_Dl0fm92Hhkgf42M-jc7lmXGD1Ok&s"
      },
      price: 123,
      amount: 1500
    },
    {
      id: 3,
      title: "Hooloi",
      subtitle: "Шугам, хоолой",
      image: {
        uri:
          "https://www.borghesegardens.com/wp-content/uploads/2019/01/plumbing-pipes.png"
      },
      price: 123,
      amount: 1120
    },
    {
      id: 4,
      title: "Hollow Polycarbonate",
      subtitle: "Материал",
      image: {
        uri:
          "https://image.made-in-china.com/202f0j00fKJtMbQaqRYc/High-Light-Building-Materials-Hollow-Polycarbonate-PC-Roofing-Sheet.jpg"
      },
      price: 123,
      amount: 800
    }
  ],
  2: [],
  3: []
};

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

const SearchIcon = style => <Icon {...style} name="search" pack="feather" />;

const WarehouseItems = props => {
  const { navigation } = props;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={IOSArrowBack}
      onPress={() => navigation.goBack()}
    />
  );

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    _isMounted = true;
    _fetchData();
  }, []);

  const _fetchData = () => {
    setLoading(true);
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      setLoading(false);
      setProducts(datas[navigation.state.params.item.id]);
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

  const onItemRemove = (product, index) => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const onItemChange = (product, index) => {
    products[index] = product;
    setProducts([...products]);
  };
  const renderProductItem = info => (
    <Item
      style={styles.item}
      index={info.index}
      product={info.item}
      onPress={() => onItemActionPress(info)}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  const showSearchSection = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    if (searchQuery && searchQuery != "") {
      setProducts(
        _.filter(datas[navigation.state.params.item.id], function(el) {
          return el.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    } else {
      setProducts(datas[navigation.state.params.item.id]);
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
              icon={SearchIcon}
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
              {products.length > 0 ? (
                <List data={products} renderItem={renderProductItem} />
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
