import React, { useState } from "react";

import Typewriter from "typewriter-effect";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const DynamicTypist = () => {
  let texts = [
    "transportartion",
    "environment",
    "trade",
    "economic",
    "agriculture",
    "election",
    "police",
    "demographic",
  ];
//   shuffleArray(texts);

  return (
    <Typewriter
      options={{
        strings: texts,
        autoStart: true,
        loop: true,
      }}
    />
  );
};
