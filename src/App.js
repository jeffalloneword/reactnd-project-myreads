import React from 'react'
import * as BooksAPI from './BooksAPI'
import OneShelf from './OneShelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelfbooks: [],
    searchresults: [],
    query: ''
  }

  changeShelf = (book, shelf) => {
    if (this.state.shelfbooks) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => (() => {
          state.shelfbooks.filter(shelfbook => shelfbook.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((shelfbooks) => {
        this.setState(() => ({
          shelfbooks
        }))
      })
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  updateQuery = (query) => {
    console.log('query: ', query)
    this.setState({ query: query })

    BooksAPI.search(query)
      .then((resultsbooks) => {

        // set the shelf on all the search result books to "none"
        resultsbooks.map((resultsbook) => {
          resultsbook.shelf = "none"
        })

        // find books matching those already on my shelves and set to same shelf value
        for (const shelfbook of this.state.shelfbooks) {
          resultsbooks.map((resultsbook) => {
            if (resultsbook.id === shelfbook.id) {
              console.log('shelfbook', shelfbook.shelf)
              resultsbook.shelf = shelfbook.shelf
            }
          })
        }

        this.setState(() => ({
          searchresults: resultsbooks,
        }))
      })
  }

  render() {

    const { query, shelfbooks, searchresults } = this.state


    return (
      <div className='app'>
        <Route path='/search' render={({ history }) => (
          <div className='search-books'>
            <div className='search-books-bar'>
              <Link
                className='close-search'
                to={{
                  pathname: '/'
                }}
                title='Back to MyReads'
                onClick={this.clearQuery}
                >Close</Link>
              <div className='search-books-input-wrapper'>
                <input
                  type='text'
                  placeholder='Search by title or author'
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className='search-books-results'>
              <ol className='books-grid'></ol>
              {console.log(searchresults)}
            </div>
          </div>
         )} />
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='open-search'>
              <Link
                to={{
                  pathname: '/search'
                }}
                title='Find a book to add'
                onClick={this.clearQuery}
                >Add</Link>
              </div>
              <div>
                <OneShelf
                  shelftitle={'Currently Reading'}
                  shelfbooks={shelfbooks.filter(shelfbook => shelfbook.shelf === 'currentlyReading')}
                  onChangeShelf={this.changeShelf}
                />
              </div>
              <div>
                <OneShelf
                  shelftitle={'Want to Read'}
                  shelfbooks={shelfbooks.filter(shelfbook => shelfbook.shelf === 'wantToRead')}
                  onChangeShelf={this.changeShelf}
                />
              </div>
              <div>
                <OneShelf
                  shelftitle={'Read'}
                  shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === 'read')}
                  onChangeShelf={this.changeShelf}
                />
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
