import React from 'react';
import {cloudName, uploadPreset} from '../config/cloudConfig';
import {logoConfig} from "../config/logoConfig";
import "../mediaEditor.css"


/**
 * Uses the upload widget for unsigned uploads to the Cloudinary account.
 * Updates the logo on the image asset.
 */
function UploadLogo(props){
  function setLogo(){
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) =>
      {
        if (!error && result && result.event === "success") {
          props.mediaEditor.update({ image: {
              imageOverlay: {
                overlays: [
                  {
                    "publicId": result.info.public_id,
                    "label": "Logo",
                    "transformation": [{}],
                    "placementOptions": logoConfig
                  },
                  {
                    "publicId": "Logo",
                    "label": "Remove logo",
                    "transformation": [{}],
                  },
                ]
              }}});
        }
      });
  }
  return(
    <div className="container">
      <div>Photo</div>
      <div><button className="btn btn-outline-primary" onClick={setLogo}>Upload photo</button></div>
    </div>
  )
}

export default UploadLogo;
