import React from "react";
import StyledButton from "../common/StyledButton";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick, rightButton }) => {
  return (
    <div className="ListFilter d-flex justify-content-between mt-1 mb-1">
      <div>
        {filterTypes.map((type, index) => (
          <React.Fragment key={type.value}>
            <StyledButton
              name={type.label}
              styleType={"link"}
              onClick={() => onFilterClick(type)}
              overrideStyle={currentFilter.value === type.value ? { fontSize: "18px", fontWeight: "bold" } : {}}
            />
            {index < filterTypes.length - 1 && " | "}
          </React.Fragment>
        ))}
      </div>
      <div>{rightButton}</div>
    </div>
  );
};

export default ListFilter;
