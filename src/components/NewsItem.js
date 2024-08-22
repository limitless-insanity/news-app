
import React, { Component } from 'react'


export default function NewsItem (props) {
  
    let { title, description,imageUrl,newsUrl,date } = props
    return (
      <div>
        <div className='my-2' >
          <div className="card" >
            <img src={!imageUrl?"https://media2.gmgroup.be/00_nm_logo.png":imageUrl} className="card-img-top "  alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <div className='text-muted my-1'>{new Date(date).toUTCString()}</div>
              <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More..</a>
            </div>
          </div>
        </div>
      
      </div>

    )
  }

