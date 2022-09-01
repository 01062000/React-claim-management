import React from 'react'

import {useParams} from 'react-router-dom'

function Card() {
  const param = useParams();
  console.log(param);
  return (
    <>
        {param.viewBills}
    </>
  )
}

export default Card