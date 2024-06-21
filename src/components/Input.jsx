import React from "react";

export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props}></input>
      {error && <div className="control-error">{error}</div>}
    </div>
  );
}
