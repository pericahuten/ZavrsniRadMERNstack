import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultImg from "../../images/default.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { cloudName } from "../../config/cloudConfig";
import { logoConfig } from "../../config/logoConfig";
import ColorPicker from "../../pages/ColorPicker";
import ImagePicker from "../../pages/ImagePicker";
import UploadLogo from "../../pages/UploadLogo";

const { TabPane } = Tabs;



// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  
  const [tooltip, setTooltip] = useState("Pritisnite za dodavanje");

  // redux
  const { user /*, cart*/} = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };


  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("WISHLIST ->", res.data);
      toast.success("Dodano na popis želja");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        
        {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
        ) : (
          <Card cover={<img src={DefaultImg} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Opis" key="1">
            {description && description}
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">Nema ocjena</div>
        )}

        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-info" />
                <br />
                {product.quantity < 1 ? "Rasprodano" : "Dodaj u košaricu"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Dodaj na listu želja
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starHoverColor="#1890ff"
                starRatedColor="#1890ff"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
      
    </>
  );
};

export default SingleProduct;
