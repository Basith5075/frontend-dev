import React, { Component } from 'react'

export class NewsItem extends Component {
  render(props) {

    let {title,description,imageurl,newsurl,author,date,source} = this.props;

    return (
      <div className="card" style={{width: "18 rem"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
      <img src={imageurl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title} ...</h5>
        <p className="card-text">{description} ...</p>
        <p className="card-text"><small className="text-body-secondary">By: {author} On: {new Date(date).toGMTString()}</small></p>
        <a href={newsurl} target="_blank" rel="noreferrer"  className="btn btn-primary">Read More</a>
      </div>
    </div>
    )
  }
}

export default NewsItem
