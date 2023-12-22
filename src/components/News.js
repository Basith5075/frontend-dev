import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  articles = []

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    }

    document.title = `${this.titleCaseWord(this.props.category)} || News Monkey`;  
  }

  async handleUpdateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdeac0d043b24b468d8947a50279c19e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdeac0d043b24b468d8947a50279c19e&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    
    // this.setState({ loading: true });

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    this.handleUpdateNews();
  }

  handleNextClick = async () => {
    
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdeac0d043b24b468d8947a50279c19e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);

    // let parsedData = await data.json();
    // console.log(parsedData.articles);
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.setState({page: this.state.page + 1});
    this.handleUpdateNews();
  }
  handlePrevClick = async () => {


    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bdeac0d043b24b468d8947a50279c19e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })

    this.setState({page: this.state.page - 1});
    this.handleUpdateNews();


  }
  render() {

    return (

      
      <div className="container my-3">
        <h2 style={{ margin: '25px', textAlign: 'center' }}>News Monkey -- Top {this.titleCaseWord(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title} description={!element.description ? "" : element.description} imageurl={element.urlToImage ? element.urlToImage : 'https://editorial.fxstreet.com/images/Markets/Commodities/Metals/Gold/gold-on-weight-scale-gm165418687-21879510_Large.jpg'} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
