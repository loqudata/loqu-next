import React from "react";
import Tracker from "@openreplay/tracker/cjs";
import { getUserID } from "utils/userId";

// Based on https://github.com/thundermiracle/openreplay-examples/blob/main/examples/with-next-dynamic-import/components/OpenReplayTracker.tsx
const tracker = new Tracker({
  projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_API_KEY,
  __DISABLE_SECURE_MODE: true,
  onStart: () => {
    tracker.setUserID(getUserID());
  },
});
tracker.start();

const OpenReplay = () => {
  return null;
};

export default OpenReplay;
