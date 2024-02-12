import React from "react";
import StyledButton from "../common/StyledButton";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick, rightButton }) => {
  return (
    <div className="ListFilter d-flex justify-content-between py-1">
      <div>
        {filterTypes.map((type, index) => (
          <React.Fragment key={type.value}>
            <StyledButton
              name={type.label}
              styleType={`link ${currentFilter.value === type.value ? "selectedFilter" : ""}`}
              onClick={() => onFilterClick(type)}
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
