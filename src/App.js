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

  componentDidMount() {
    BooksAPI.getAll()
      .then((shelfbooks) => {
        this.setState(() => ({
          shelfbooks
        }))
      })
  }

  changeShelf = (book, shelf) => {
    if (this.state.searchresults.length > 0) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => (() => {
          state.shelfbooks.filter(shelfbook => shelfbook.id !== book.id).concat([ book ])
        }))
      })
    }
    else if (this.state.shelfbooks.length > 0) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => (() => {
          state.shelfbooks.filter(shelfbook => shelfbook.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  clearQuery = () => {
    this.setState({query: '', searchresults: []})
  }

  updateQuery = (query) => {

      console.log('query: ', query.length)
      this.setState({ query: query })

      BooksAPI.search(query)
        .then((resultsbooks) => {

          //check for results
          if (resultsbooks && resultsbooks.length > 0) {

            // set the shelf on all the search result books to "none"
            resultsbooks.map((resultsbook) => {
              resultsbook.shelf = "none"
            })

            // find books matching those already on my shelves and set to same shelf value
            for (const shelfbook of this.state.shelfbooks) {
              resultsbooks.map((resultsbook) => {
                if (resultsbook.id === shelfbook.id) {
                  //console.log('shelfbook', shelfbook.shelf)
                  resultsbook.shelf = shelfbook.shelf
                }
              })
            }
            console.log('rb', resultsbooks.length)

            this.setState(() => ({
              searchresults: resultsbooks,
            }))

          }
          else {
            this.setState(() => ({
              searchresults: [],
            }))
          }
      })


  }

  render() {
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
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div>
              <OneShelf
                shelftitle={'Search Results'}
                shelfbooks={this.state.searchresults}
                onChangeShelf={this.changeShelf}
              />
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
                  shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === 'currentlyReading')}
                  onChangeShelf={this.changeShelf}
                />
              </div>
              <div>
                <OneShelf
                  shelftitle={'Want to Read'}
                  shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === 'wantToRead')}
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
