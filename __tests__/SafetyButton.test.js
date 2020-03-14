import React from "react";
import renderer from "react-test-renderer";

import SafetyButton from "../";

test("renders correctly", () => {
  const tree = renderer.create(<SafetyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
