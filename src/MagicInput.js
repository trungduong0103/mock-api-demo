import React from "react";

function MagicInput({ defaultValue, size, ...otherProps }) {
  const labelRef = React.useRef(undefined);

  function handleChange(event) {
    labelRef.current.setAttribute("data-value", event.target.value);
  }

  return (
    <label title="magic-input" ref={labelRef} className="magic-input">
      <input
        defaultValue={defaultValue}
        size={size}
        onChange={handleChange}
        {...otherProps}
      />
    </label>
  );
}

export default MagicInput;
