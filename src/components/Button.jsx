import React from 'react';

function Button({ isEnabled, eventHandler }) {
  return (
    <button
      disabled={!isEnabled}
      onClick={() => {
        eventHandler();
      }}
    >
      Register
    </button>
  );
}

export default Button;
