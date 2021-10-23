import React from "react";

export const Input = ({ type, placeholder, onChange, value, onKeyPress }) => {
  return ( 
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
