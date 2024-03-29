import React, {useState} from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { BiSearchAlt2 } from "react-icons/bi";

function NavSearch(props) {
  return (
    <form action="" className="navForm">
      <input
        type="text"
        id="navsearch-uppernav"
        className="navbarSearch"
        placeholder="Search for products..."
        name="searchProducts"
        autocomplete="off"
        onChange={(event) => props.typedOnSearchbar(event)}
      />
      <button type="submit" htmlFor="searchProducts" className="navSearchBtn">
        <BiSearchAlt2 className="search-icon" />
      </button>
    </form>
  );
}

export default NavSearch;
