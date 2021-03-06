import React, { Component } from 'react'
import Header from './components/Header';
import News, { newsCategory } from './news/index'
import NewsList from './components/NewsList'
import Pagination from './components/Pagination'
import Loading from './components/Loading'
// import Axios from 'axios';

const news = new News(newsCategory.technology)

class App extends Component {
  // state = {
  //   news: [],
  //   category: newsCategory.technology
  // }

  state = {
    data: {},
    isLoading: true
  }

  // componentDidMount() {
  // let url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_API_KEY}&category=${this.state.category}&pageSize=5`
  // Axios.get(url)
  //   .then(response => {
  //     this.setState({ news: response.data.articles })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  // if (prevState.category !== this.state.category) {
  //   let url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_API_KEY}&category=${this.state.category}&pageSize=5`
  //   Axios.get(url)
  //     .then(response => {
  //       this.setState({ news: response.data.articles })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  // }

  componentDidMount() {
    news.getNews()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true })
    }
    news.next()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true })
    }
    news.prev()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  handlePageChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }

  gotoPage = () => {
    this.setState({ isLoading: true })
    news.setCurrentPage(this.state.data.currentPage)
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  changeCategory = category => {
    this.setState({ isLoading: true })
    news.setChangeCategory(category)
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  search = searchTerm => {
    this.setState({ isLoading: true })
    news.search(searchTerm)
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(err => {
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }

  render() {
    const {
      articles,
      isPrevious,
      isNext,
      category,
      totalResults,
      currentPage,
      totalPage } = this.state.data
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-md-3'>
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search} />
            <div className='d-flex'>
              <p className='text-black-50'>About {totalResults} result found</p>
              <p className='text-black-50 ml-auto'>{currentPage} page of {totalPage}</p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ) : (
                <div>
                  <NewsList news={articles} />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isNext={isNext}
                    isPrevious={isPrevious}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handlePageChange={this.handlePageChange}
                    gotoPage={this.gotoPage} />
                </div>
              )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
