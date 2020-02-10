import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, View, ActivityIndicator } from "react-native";

const ImageLoader = props => {
  const { style, imageStyle, source } = props;
  console.log(style);

  const [parsedData, setParsedData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const getData = async URL => {
      setLoading(true);
      const response = await axios.get(URL);
      if (isSubscribed) {
        setParsedData({ uri: response.data });
        setLoading(false);
      }
    };
    if (source instanceof Object) {
      getData(source.uri);
    }
    return () => (isSubscribed = false);
  }, []);
  return (
    <View style={style}>
      {!loading ? (
        <Image
          style={imageStyle}
          source={parsedData != "" ? parsedData : source}
        />
      ) : (
        <View style={{ ...imageStyle }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default ImageLoader;
