import React, { useState } from 'react'

// import { useFetchImageQuery } from "./features/dogs/images-api-slice";
import { useFetchImageQuery } from './features/dogs/images-api-slice';

function DisplayImage({reference_image_id}: any) {
  const { data = [], isLoading } = useFetchImageQuery(reference_image_id);

  if (!isLoading) {
    return (
        <img src={data.url} alt={data.id} height={250} />
    )
  } else {
    return 'Loading...'
  }
}

export default DisplayImage;