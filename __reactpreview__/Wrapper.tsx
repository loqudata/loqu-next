import React from "react";

import { CoreApp } from "../src/components/CoreApp";

// A hack for this environment
import "./main.css";


import "flexlayout-react/style/light.css"

// No-op wrapper.
export const Wrapper = ({ children }) => {
  return <CoreApp>{children}</CoreApp>;
};
