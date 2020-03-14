import React, { useState } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  Image
} from "react-native";

export default function({ onPressAndHold, children }) {
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
      <View>
        {children}
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
