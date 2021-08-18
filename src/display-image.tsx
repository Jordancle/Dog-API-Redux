import React, { useState } from 'react'

import { useFetchImageQuery } from "./features/dogs/images-api-slice";

function DisplayImage({ reference_image_id }: {reference_image_id: string}) {
  const { data = [], isFetching } = useFetchImageQuery(reference_image_id);

  return ( 
    <>
      {JSON.stringify(data)}
        {/* // <img src={breed.image.url} alt={breed.name} height={250} /> */}
      );
    </>
  )
}

export default DisplayImage;