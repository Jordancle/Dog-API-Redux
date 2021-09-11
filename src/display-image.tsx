import React, { useState } from 'react'

import { useFetchImageQuery } from './features/dogs/dogs-api-slice';

function DisplayImage({ reference_image_id }: any) {
  const { data = [], isLoading } = useFetchImageQuery(reference_image_id);

  if (!isLoading) {
    if (data.url) {
      return (
        <img src={data.url} alt={data.id} height={250} />
      )
    } else {
      return null;
    }
  } else {
    return (
      <>
        Loading...
      </>
    )
  }
}

export default DisplayImage;