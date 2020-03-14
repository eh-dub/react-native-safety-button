import React, { useState } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image
} from "react-native";

import styles from "./style";

export default function({ buttonAction }) {
  const imagePrefix = "../assets/images/";
  const images = {
    "Save Image": require(`${imagePrefix}icons8-download-300.png`),
    "Add Ingredient": require(`${imagePrefix}icon-add-ingredient.png`),
    "Clear Recipe": require(`${imagePrefix}icons8-recurring-appointment.png`),
    "View Your Recipes": require(`${imagePrefix}icons8-thumbnails.png`)
  };

  const label = "Clear Recipe";

  const [buttonFill, updateButtonFill] = useState(0);
  const [fillAnimationValue] = useState(new Animated.Value(0)); //
  fillAnimationValue.addListener(({ value }) => updateButtonFill(value));

  const [fillAnimation, updateFillAnimation] = useState(
    Animated.timing(fillAnimationValue, { toValue: 100, duration: 1000 })
  );
  const [emptyAnimation, updateEmptyAnimation] = useState(
    Animated.timing(fillAnimationValue, { toValue: 0, duration: 500 })
  );

  function startAction() {
    emptyAnimation.stop();
    fillAnimation.start(({ finished }) => {
      if (finished) {
        buttonAction();
        console.log("button action fired");
        fillAnimationValue.setValue(0);
      } else {
        emptyAnimation.start();
      }
    });
  }

  function stopAction() {
    fillAnimation.stop();
    emptyAnimation.start();
  }

  return (
    <TouchableWithoutFeedback onPressIn={startAction} onPressOut={stopAction}>
      <View style={[styles.iconButton]}>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 5
            }
          ]}
        >
          {images[label] && (
            <Image
              style={[
                {
                  width: 25,
                  height: 25,
                  marginRight: 5,
                  alignSelf: "flex-start"
                }
              ]}
              source={images[label]}
            ></Image>
          )}
          <Text style={[styles.iconText]} numberOfLines={2}>
            {label}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: `${buttonFill}%`,
            backgroundColor: "white"
          }}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}
