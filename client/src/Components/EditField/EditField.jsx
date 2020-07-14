import React from "react";

export const EditField = ({ name, data, handleData }) => {
  return (
    <textarea
      className="recipe-detailed__edit-field"
      name={name}
      value={data}
      rows="10"
      onChange={handleData}
    ></textarea>
  );
};
