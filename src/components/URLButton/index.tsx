import React, { useCallback } from "react";
import { Alert, Linking } from "react-native";
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

interface URLButtonProps extends RectButtonProperties {
  url: string,
  children: any;
}

const URLButton: React.FC<URLButtonProps> = ({ url, children, ...rest }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the
      // web link should be opened by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <RectButton {...rest} onPress={handlePress}>
      {children}
    </RectButton>
  );
};

export default URLButton;
