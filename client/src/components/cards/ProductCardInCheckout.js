import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import DefaultImg from "../../images/default.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";


const ProductCardInCheckout = ({ p, children }) => {

  const colors = [    
  "Crna",
  "Smeđa",
  "Srebrna",
  "Bijela",
  "Plava",];
  let dispatch = useDispatch();


  const handleColorChange = (e) => {
    console.log("color -> ", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Dostupna količina: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };



  return (
    <>
      <tbody>
        <tr className="align-middle">
          <td>
            <div style={{ width: "100px", height: "auto" }}>
              {p.images.length ? (
                <ModalImage small={p.images[0].url} large={p.images[0].url} />
                ) : (
                  <ModalImage small={DefaultImg} large={DefaultImg} />
                  )}
            </div>
          </td>
          <td className="align-middle">{p.title}</td>
          <td className="align-middle">
            <select
              onChange={handleColorChange}
              name="color"
              className="form-control"
              >
              {p.color ? (
                <option value={p.color}>{p.color}</option>
                ) : (
                  <option>Odaberite</option>
              )}
              {colors
                .filter((c) => c !== p.color)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </td>
          <td className="align-middle">{children}</td>
          <td className="align-middle">{p.price} kn</td>
          <td className="text-center align-middle">
            <input
              type="number"
              className="form-control"
              value={p.count}
              onChange={handleQuantityChange}
              />
          </td>
          <td className="align-middle">{p.price * p.count} kn</td>
          <td className="text-center align-middle">
            {p.shipping === "Da" ? (
              <CheckCircleOutlined className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
                )}
          </td>
          <td className="text-center align-middle">
              <CloseOutlined
                onClick={handleRemove}
                className="btn text-danger pointer"
                />
          </td>
        </tr>
      </tbody>

    </>

  );
};

export default ProductCardInCheckout;
