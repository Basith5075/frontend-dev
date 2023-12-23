import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      loading: true,
      page: 1,
      totalResults : 0,
    }

    document.title = `${this.titleCaseWord(this.props.category)} || News Monkey`;  
  }

  async handleUpdateNews(){

    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });


    let data = await fetch(url);
this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);

    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    
    // this.setState({ loading: true });

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    this.handleUpdateNews();
  }

  handleNextClick = async () => {
    
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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


    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
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

  fetchMoreData = async () => {
    this.setState({page:this.state.page + 1});

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
    
  };
  render() {

    return (

      
       <>
        <h2 style={{ margin: '25px', textAlign: 'center' }}>News Monkey -- Top {this.titleCaseWord(this.props.category)} Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={ <Spinner/>}
        >
        <div className = "container">
        <div className="row">
   

          { this.state.articles.map((element) => {

            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title} description={!element.description ? "" : element.description} imageurl={element.urlToImage ? element.urlToImage : 'https://editorial.fxstreet.com/images/Markets/Commodities/Metals/Gold/gold-on-weight-scale-gm165418687-21879510_Large.jpg'} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>

    )
  }
}

export default News
