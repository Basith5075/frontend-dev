import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'

export class News extends Component {

  articles = []

  constructor() {
    super();

    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=833c3ef2c8d44580a9fa9f8af8339013&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
  }

  handleNextClick = async () => {

    console.log('Next page' + this.state.page);
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=833c3ef2c8d44580a9fa9f8af8339013&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);

      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading : false
      })
    }
  }
  handlePrevClick = async () => {
    console.log('Prev page' + this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=833c3ef2c8d44580a9fa9f8af8339013&page=${this.state.page - 1}&pageSize==${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  render() {

    return (

      <div className="container my-3">
        <h2>News Monkey -- Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={!element.description} imageurl={element.urlToImage ? element.urlToImage : 'https://editorial.fxstreet.com/images/Markets/Commodities/Metals/Gold/gold-on-weight-scale-gm165418687-21879510_Large.jpg'} newsurl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>

    )
  }
}

export default News
