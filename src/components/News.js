import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  articles = [

  ]

  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("This is a constructor")
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ab628f7cfd2426db25392adaa8290a8&page=${this.state.page = 1}&pageSize=20`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }


  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ab628f7cfd2426db25392adaa8290a8&page=${this.state.page - 1}&pageSize=20`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false

    })
  }


  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    }
    else {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ab628f7cfd2426db25392adaa8290a8&page=${this.state.page + 1}&pageSize=20`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }

  render() {

    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:"66px"}}>NewsMonkey - Top Headlines</h2>
        
        <h2 className='my-3 text-center text-capitalize'>{this.props.title}</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 37) : ""} description={element.description ? element.description.slice(0, 110) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">	&larr; Previous</button>
          <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}
