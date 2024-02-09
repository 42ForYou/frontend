import React from "react";
import StyledButton from "./StyledButton";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick, rightButton }) => {
  return (
    <header className="row mt-1 mb-1">
      <div className="col">
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
      <div className="col d-flex justify-content-end">{rightButton}</div>
    </header>
  );
};

export default ListFilter;
