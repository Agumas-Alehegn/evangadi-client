import React, { useState } from "react";
/**
 * @param {Number} maxLength
 * @returns {object}
 */

const useCharacterLimit = (maxLength = 200) => {
  const [text, setText] = useState("");
  const [limitReached, setLimitReached] = useState(false);

  const handleChange = (event) => {
    const inputText = event.target.value;

    if (inputText.length <= maxLength) {
      setText(inputText);
      setLimitReached(false);
    } else {
      setLimitReached(true);
    }
  };
  return {
    text,
    limitReached,
    handleChange,
    reset: () => {
      setText("");
      setLimitReached(false);
    },

    characterCount: text.length,
    maxLength,
  };
};

export default useCharacterLimit;
