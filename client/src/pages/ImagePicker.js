import React from 'react';
import {cloudName} from '../config/cloudConfig';
import {AdvancedImage} from '@cloudinary/react';
import {CloudinaryImage} from "@cloudinary/base";
import {fit} from "@cloudinary/base/actions/resize";
import {sharpen} from "@cloudinary/base/actions/adjust";
import "../mediaEditor.css"

/**
 Displays images that are hosted on Cloudinary
 */
const ImagePicker = (props) => {
  if(props.products.length)
  {
    return(
      <div className="container">
        {props.products.map((p, i) => (
          <div key={i}>
            {p.title}
            <AdvancedImage cldImg={new CloudinaryImage(p.images[0].public_id, {cloudName: cloudName}, {analytics:false}).resize(fit(50,50)).effect(sharpen())} onClick={()=> {props.mediaEditor.update({publicIds: [{publicId:p.images[0].public_id}]})}}/>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div className="container">
        No products in cart
      </div>
    )
  }

}

export default ImagePicker;
