import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { ListItem, Text } from "@ui-kitten/components";
// import ImageLoader from "../../../component/ImageLoader/ImageLoader";

const noAvailableImage = require("../../../../assets/images/No_picture_available.png");

export const Item = props => {
  const { style, product, index, ...listItemProps } = props;

  return (
    <ListItem {...listItemProps} style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={
          !!product.img_path ? { uri: product.img_path } : noAvailableImage
        }
      />
      <View style={styles.detailsContainer}>
        <Text category="s1">{product.name}</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginVertical: 15,
              flexShrink: 1
            }}
            appearance="hint"
            category="p2"
          >
            {product.category_name}
          </Text>
        </View>

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
    height: 144,

    justifyContent: "center"
  },
  detailsContainer: {
    height: "100%",
    padding: 16,
    flex: 8
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
