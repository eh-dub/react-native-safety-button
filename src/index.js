import React, { useState } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  Image
} from "react-native";

export default function({
  children,
  style,
  activationThreshold = 1000,
  deactivationTime = 500,
  onPressAndHold = () => {},
  progressColor = "white"
}) {
  const [progress, updateProgress] = useState(0);
  const [fillAnimationValue] = useState(new Animated.Value(0)); //
  fillAnimationValue.addListener(({ value }) => updateProgress(value));

  const fillAnimation = Animated.timing(fillAnimationValue, {
    toValue: 100,
    duration: activationThreshold
  });

  const emptyAnimation = Animated.timing(fillAnimationValue, {
    toValue: 0,
    duration: deactivationTime
  });

  function startAction() {
    emptyAnimation.stop();
    fillAnimation.start(({ finished }) => {
      if (finished) {
        onPressAndHold();
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
      <View style={[style]}>
        {children}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: `${progress}%`,
            backgroundColor: progressColor
          }}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}
