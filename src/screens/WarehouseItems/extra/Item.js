import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { Entypo } from "@expo/vector-icons";

export const Item = props => {
  const {
    style,
    product,
    index,
    onProductChange,
    onRemove,
    ...listItemProps
  } = props;

  const decrementButtonEnabled = () => {
    return product.amount > 1;
  };

  const onRemoveButtonPress = () => {
    onRemove(product, index);
  };

  const onMinusButtonPress = () => {
    const updatedProduct = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount - 1
    );

    onProductChange(updatedProduct, index);
  };

  const onPlusButtonPress = () => {
    const updatedProduct = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount + 1
    );

    onProductChange(updatedProduct, index);
  };

  return (
    <ListItem {...listItemProps} style={[styles.container, style]}>
      <Image style={styles.image} source={{ uri: product.img_paths }} />
      <View style={styles.detailsContainer}>
        <Text category="s1">{product.name}</Text>
        <Text appearance="hint" category="p2">
          {product.category_name}
        </Text>
        {/* <Text category="s2">{product.formattedPrice}</Text> */}
        <View style={styles.amountContainer}>
          {/* <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            icon={() => <Entypo name="minus" size={25} />}
            onPress={onMinusButtonPress}
            disabled={!decrementButtonEnabled()}
          /> */}
          <Text style={styles.amount} category="s2">
            Тоо ширхэг: {`${product.minimum_balance}`}
          </Text>
          {/* <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            icon={() => <Entypo name="plus" size={25} />}
            onPress={onPlusButtonPress}
          /> */}
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  image: {
    width: 120,
    height: 144
  },
  detailsContainer: {
    height: "100%",
    padding: 16
  },
  amountContainer: {
    flexDirection: "row"
  },
  amountButton: {
    borderRadius: 16
  },
  amount: {
    textAlign: "center"
  },
  removeButton: {
    position: "absolute",
    right: 0
  },
  iconButton: {
    paddingHorizontal: 0
  }
});
