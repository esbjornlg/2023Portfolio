import React from 'react'
import langPack from '../lang.jsx'
const Contact = ({Language}) => {
  const Lang = new langPack();
  return (
    <div className="flexColumn pageBox">
        <h2>{Lang.contact[Language.lang]}</h2>
        <p>
          {Lang.contactP[Language.lang]}
        </p>
    </div>
  )
}

export default Contact