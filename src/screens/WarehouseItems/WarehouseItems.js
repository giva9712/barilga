import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PTRView from "react-native-pull-to-refresh";

import {
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  Text,
  Spinner,
  Icon
} from "@ui-kitten/components";
import { SafeAreaLayout } from "../../component/SafeAreaLayoutComponent/SafeAreaLayoutComponent";
import { LayoutList } from "../../component/ListItem/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "./extra/Item";

const IOSArrowBack = style => (
  <Icon {...style} name="ios-arrow-back" pack="ionicons" />
);

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
      setProducts([
        {
          id: 1,
          title: "Бараа 1",
          subtitle: "Шугам, хоолой",
          image: {
            uri: "https://www.sabatradebd.com/wp-content/uploads/2015/12/81.jpg"
          },
          price: 123,
          amount: 3
        },
        {
          id: 2,
          title: "Бараа 2",
          subtitle: "Шугам, хоолой",
          image: {
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_JK2aov6C_ZaTV_mOerk_Dl0fm92Hhkgf42M-jc7lmXGD1Ok&s"
          },
          price: 123,
          amount: 3
        },
        {
          id: 1,
          title: "Бараа 3",
          subtitle: "Шугам, хоолой",
          image: {
            uri:
              "https://www.borghesegardens.com/wp-content/uploads/2019/01/plumbing-pipes.png"
          },
          price: 123,
          amount: 3
        }
      ]);
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

  return (
    <SafeAreaLayout insets="top" level="2">
      <PTRView onRefresh={_refresh}>
        <TopNavigation
          title="Барааны жагсаалт"
          alignment="center"
          leftControl={renderBackAction()}
        />
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
          <View>
            {products.length > 0 && (
              <Text style={styles.headerTitle} appearance="hint">
                {navigation.state.params.item.title}-ын бараанууд
              </Text>
            )}
            <List data={products} renderItem={renderProductItem} />
          </View>
        )}
        {/* <Button style={styles.checkoutButton} size="giant">
          CHECKOUT
        </Button> */}
      </PTRView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    marginHorizontal: 16,
    marginVertical: 20
  },
  base: {
    paddingTop: 15
  },
  badges: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start"
  }
});

WarehouseItems.defaultProps = {
  warehouses: [
    {
      id: 1,
      name: "Warehouse 1",
      description: "Bairshil 1",
      types: 1,
      total_items: 123
    },
    {
      id: 2,
      name: "Warehouse 2",
      description: "Bairshil 2",
      types: 4,
      total_items: 521
    },
    {
      id: 3,
      name: "Warehouse 3",
      description: "Bairshil 3",
      types: 9,
      total_items: 2313
    },
    {
      id: 4,
      name: "Warehouse 4",
      description: "Bairshil 4",
      types: 4,
      total_items: 341
    },
    {
      id: 5,
      name: "Warehouse 5",
      description: "Bairshil 5",
      types: 7,
      total_items: 5133
    },
    {
      id: 6,
      name: "Warehouse 6",
      description: "Bairshil 6",
      types: 2,
      total_items: 5123
    },
    {
      id: 7,
      name: "Warehouse 7",
      description: "Bairshil 7",
      types: 8,
      total_items: 412
    }
  ]
};

export default WarehouseItems;
