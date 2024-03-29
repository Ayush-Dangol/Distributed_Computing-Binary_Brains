import React, {useState, useEffect, useRef} from "react";
import CartItems from "./CartItems.js";
// import QuantityBtn from "../Products/QuantityBtn.jsx";
import QuantityBtnCart from "./QuantityBtnCart.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";

function CartTable(props) {

  var deleteCartItem;

  function deleteId(id) {
    deleteCartItem = JSON.parse(localStorage.getItem("sabjilandAddToCart"));

    for (let i = 0; i < deleteCartItem.length; i++){
      if (String(deleteCartItem[i]._id) === String(id)){
        deleteCartItem.splice(i, 1);
        break;
      }
    }

    localStorage.removeItem("sabjilandAddToCart");
    if (String(deleteCartItem) != String([])) {
      localStorage.setItem("sabjilandAddToCart", JSON.stringify(deleteCartItem));
    }

    if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
      props.setAddedToCart([]);
    }
    else {
      props.setAddedToCart(JSON.parse(localStorage.getItem("sabjilandAddToCart")));
    }
  }

  const [checked, setChecked] = useState([]);
  
  function handleChange(event, product_id) {
    setChecked([event.target.checked, product_id]);
  }

  useEffect(() => {
    if (checked[0] === true) {
      props.setSelectedItems((prevValue) => [...prevValue,checked[1]]);
      props.tempSelectedItems.current.push(checked[1]);
    }
    if (checked[0] === false) {
      for (let i = 0; i < props.tempSelectedItems.current.length; i++) {
        if (props.tempSelectedItems.current[i] === checked[1]) {
          props.tempSelectedItems.current.splice(i, 1);
          props.setSelectedItems(props.tempSelectedItems.current);
          break;
        }
      }
    }
  },[checked]);

    return (
        <table className="mycart-table" style={{overflowX: "scroll"}}>
            <tr className="mycart-table-row">
              <th className="mycart-table-heading ">Select</th>
              <th className="mycart-table-heading ">Items</th>
              <th className="mycart-table-heading ">Description</th>
              <th className="mycart-table-heading ">Price</th>
              <th className="mycart-table-heading ">Quantity</th>
              <th className="mycart-table-heading ">Sub Total</th>
              <th className="mycart-table-heading "></th>
            </tr>
            {props.addedToCart.map((itemValue) =>
              (
              <tr
                // key={"mycartKey" + String(itemValue._id)}
                // id={"mycartId" + String(itemValue._id)}
                className="mycart-table-row"
              >
                <td className="mycart-table-data">
                  <input
                    className="mycart-checkbox"
                    type="checkbox"
                    onChange={(event) => handleChange(event, itemValue._id)}
                    // id={"checkbox" + String(itemValue._id)}
                    // name={"checkbox" + String(itemValue._id)}
                    // value={"mycartKey" + String(itemValue._id)}
                  />
                </td>
                <td className="mycart-table-data">
                  <img
                    className="mycart-image"
                    src={`https://backend.sabjiland.com/uploads/${itemValue.image[0]}`}
                    alt={itemValue.Product}
                  />
                </td>
                <td className="mycart-table-data">
                  <div className="mycart-product-name">{itemValue.productName}</div>
                  <div className="mycart-product-stock">
                    {itemValue.stock === "InStock" ? (
                      <span style={{ color: "#216600" }}>IN STOCK</span>
                    ) : (
                      <span style={{ color: "#BE4217" }}>OUT OF STOCK</span>
                    )}
                  </div>
                </td>
                <td className="mycart-table-data">
                  <div className="mycart-product-price">
                    Rs.
                    <span style={{ color: "black" }}>{itemValue.rate}/-</span>
                  </div>
                </td>
                <td className="mycart-table-data">
                  <div className="mycart-qty-btn-container">
                    <QuantityBtnCart qtyBtn={itemValue.qtyBtn} storageId={itemValue._id} addedToCart={props.addedToCart} setAddedToCart={props.setAddedToCart}/>
                  </div>
                </td>
                <td className="mycart-table-data">
                  <div className="mycart-subtotal-product-price">Rs. {itemValue.rate * itemValue.qtyBtn}</div>
                </td>
                <td className="mycart-table-data">
                  <RiDeleteBin6Line className="mycart-delete-button" 
                  // key={"mycartKey" + String(itemValue._id)} 
                  // id={"mycartId" + String(itemValue._id)} 
                  onClick = {() => deleteId(itemValue._id)}/>
                </td>
              </tr>
            ))}
          </table>
    )
}

export default CartTable;