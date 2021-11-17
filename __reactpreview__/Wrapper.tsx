import React from "react";

import { CoreApp } from "../src/components/CoreApp";

// A hack for this environment
import "./main.css";
// No-op wrapper.
export const Wrapper = ({ children }) => {
  return <CoreApp>{children}</CoreApp>;
};
