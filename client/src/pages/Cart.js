import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import editorConfig from "../config/editorConfig";
import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import UploadLogo from "./UploadLogo";
import { cloudName } from "../config/cloudConfig";
import "../mediaEditor.css";


/**
 * @param setDisabled
 */
function editorListener(editor, setDisabled){
  try {
    editor.on("next", (steps)=>{
      if(steps.params.toStep === 'export'){
        setDisabled(true);
      }
    });
    editor.on("prev", (steps)=>{
      if(steps.params.toStep !== 'export'){
        setDisabled(false);
      }
    });
    editor.on("export", ()=>{
      setDisabled(false);
      editor.destroy();
    })
  } catch(err) {
    console.log(err);
  }
}

const Cart = ({ history }) => {


  const [disabled, setDisabled] = useState(false);

  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [custom, setCustom] = useState('');


  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };
  window.onload = function () {
    
  }
  const myEditor = cloudinary.mediaEditor();
  
  const handletest = async (productId, imageId) => {
    try {
      editorListener(myEditor, setDisabled);
      await myEditor.update({ 
        cloudName: cloudName,
        publicIds: [imageId],
        "language": {
          "messages": {
            "en_US": {
              "footer": {
                "export": "SPREMI SLIKU"
              }
            }
          }
        },
        mode: "inline",
        image: {
          steps: ["imageOverlay", "textOverlays", "export"],
          imageOverlay: {
            overlays: [
              {
                "publicId": "logo",
                "label": "Logo",
                "transformation": [{}],
                "placementOptions": [{
                  "y": 0,
                  "x": 0,
                  "width": 200,
                  "height": 200,
                  "gravity": "center"
                }]
              },
              {
                "publicId": "logo",
                "label": "Remove logo",
                "transformation": [{}],
              },
              
            ],
          }
        }
      });
      myEditor.show();
      myEditor.on("export", function(data) {
        console.log("data: " + data, "product id: " + productId);
        let cart = [];
        if(typeof window !== "undefined") {
          if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          cart.map((product, i) => {
            if(product._id === productId) {
              cart[i].customImageURL = data.assets[0].url;
              setCustom(data.assets[0].url);
            }
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch({
            type: "ADD_TO_CART",
            payload: cart
          })
        }
      })
    } catch(err){
      console.log(err);
    }

  }

  const showCartItems = () => (
    <>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Slika</th>
            <th scope="col">Naziv</th>
            <th scope="col">Boja</th>
            <th scope="col">TEST</th>
            <th scope="col">Cijena</th>
            <th scope="col">Količina</th>
            <th scope="col">Ukupno</th>
            <th scope="col">Dostava</th>
            <th scope="col">Ukloni</th>
          </tr>
        </thead>

        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} p={p}>
            <button onClick={() => handletest(p._id, p.images[0].public_id)} className="btn btn-outline-success">Personaliziraj</button>
          </ProductCardInCheckout>
          ))}
      </table>
    </>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Košarica / {cart.length} proizvod</h4>

          {!cart.length ? (
            <p>
              Nema sadržaja u košarici. <Link to="/shop">Nastavite kupovati.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Narudžba</h4>
          <hr />
          <p>Proizvodi</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.price * c.count} kn
              </p>
            </div>
          ))}
          <hr />
          Ukupno: <b>{getTotal()} kn</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Završi narudžbu
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Plaćanje pouzećem
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Prijavite se za kupovinu
              </Link>
            </button>
          )}
        </div>
      </div>
      <div style={disabled ? {pointerEvents: "none", opacity: "0.4"} : {}}>
        <UploadLogo mediaEditor={myEditor} />
      </div>
    </div>
  );
};

export default Cart;
