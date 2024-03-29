import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { ToastContainer, toast } from "react-toastify";
function OrderNow(props) {
 

  const navigate = useNavigate();
  const [buyProduct, setBuyProduct] = useState(JSON.parse(localStorage.getItem("sabjilandBuyProduct")));
  const [quantity, setQuantity] = useState(JSON.parse(localStorage.getItem("sabjilandQuantity")));


  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartItemsList,setCartItemsList] = useState(0);
  var subTotal = 0;
  var cartList;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
      cartList = [];
      
    }
    else {
      cartList = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
    }
    setCartItemsList (cartList.length);
    
    for (let i = 0; i < cartList.length; i++){
      subTotal = (cartList[i].qtyBtn * cartList[i].rate) + subTotal;
    }
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 100);
  },[]);

 


  // *****************************************************************

  const [userDetail,setUserDetail] = useState();
  useEffect(()=> {
    axios.get("https://backend.sabjiland.com/api/v1/whoami",{withCredentials: true})
    .then((res)=> {
      if (res.data.success === true){
        setUserDetail(res.data.user)
      }
    })
    .catch((err)=>console.log(err))
  },[]);

  var cartItems;
  var cartId;
  var cartQty;

  const Order = (event) => {
    event.preventDefault();

    cartId = [];
    cartQty = [];

    if (JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null) {
      if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
        cartItems = [];
      } else {
        cartItems = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
      }

      console.log(cartItems);

      for (let i = 0; i < cartItems.length; i++) {
        cartId.push(String(cartItems[i]._id));
        cartQty.push(String(cartItems[i].qtyBtn));
      }
    } else {
      if (JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null) {
        cartItems = [];
      } else {
        cartItems = [JSON.parse(localStorage.getItem("sabjilandBuyProduct"))];
        cartQty = [JSON.parse(localStorage.getItem("sabjilandQuantity"))];
      }
      cartId = [cartItems[0]._id];
    }

    console.log(cartId);
    console.log(cartQty);

    
        if (cartId.length !== 0 && cartQty.length !== 0) {
          const formData = new FormData();
          formData.append("userId", String(userDetail._id));
         
          cartId.forEach((value) => {
            formData.append("productId", value);
          });
          cartQty.forEach((value) => {
            formData.append("quantity", value);
          });
          
          formData.append("orderAddress", String(userDetail.Address));
          
          
          formData.append("image", props.qrImage || "");
  
         
          // Add a placeholder or default value for the image field
          
          for (const value of formData.values()) {
            console.log(value);
          }
          console.log(formData);
          axios
            .post(
              "https://backend.sabjiland.com/api/v1/postOrder",
              formData,{withCredentials: true}
              
            )
            .then((res) => {
              // console.log(res);
              if (res.data.success === true) {
               
                toast.success("Thank you for Shopping with us.", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                console.log(res.data.data);
                props.setOrderQuantity(res.data.data.quantity);
                const data = res.data.data;
                console.log(data);
                props.setOrderResponse(data);
               
                navigate("/invoice");
              }
              if (JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null) {
                localStorage.removeItem("sabjilandAddToCart");
                props.setAddedToCart([]);
              }
            })
            .catch((err) => {
              // toast.error(err.response.data.message, {
              //   position: toast.POSITION.TOP_RIGHT,
              // });
              console.error(err);
            });
  
          // alert("Order placed successfully!");
        } else {
          alert("Cart Items are empty. Add items to cart prior to purchasing.");
        }
      

    // alert(
    //   "Fullname: " +
    //     guestDetails.guestFullname +
    //     "\nPhone:" +
    //     guestDetails.guestPhoneNumber +
    //     "\n Note" +
    //     guestDetails.guestNote
    // );
  };




  return (
    <div className="place-order-summary">
      <div className="place-order-title">ORDER SUMMARY</div>
      <div className="place-order-details">
        <div className="place-order-flex">
          <div>Sub Total</div>
            <div>Rs. {JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null ? totalAmount : buyProduct.rate * quantity}</div>
        </div>
        <div style={{ fontSize: "12px" }}>({JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null ? `${cartItemsList} item/s` : "1 item"})</div>
        <div className="place-order-flex">
          <div>Delivery Charge</div>
          <div>Rs 100/-</div>
        </div>
      </div>
      <div
        className="place-order-total"
        style={{ justifyContent: "space-between" }}
      >
        <div className="place-order-flex">
          <div>Total</div>
          <div>Rs. {JSON.parse(localStorage.getItem("sabjilandBuyProduct")) === null ? grandTotal : (buyProduct.rate * quantity) + 100}</div>
        </div>
      </div>
      <div className="place-order-terms">
        <div>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </div>
        <div className="place-order-check-container">
          <div>
            <input
              className="place-order-terms-checkbox"
              type="checkbox"
              id="place-order-terms-checkbox-2"
              name="place-order-terms-checkbox"
              value="place-order-terms-checkbox"
              checked
            />
          </div>
          <div>I have read and agree to the Sabjiland terms and conditions</div>
        </div>
        <button className="place-order-button" onClick={Order} >
          <input
            type="submit"
            name="submit-place-order"
            value="submit-place-order"
            className="submit-place-order"
          />
          <div className="place-order-btn-text">PLACE ORDER</div>
        </button>
      </div>
    </div>
  );
}

export default OrderNow;
