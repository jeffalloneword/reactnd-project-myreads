import React from 'react'
import * as BooksAPI from './BooksAPI'
import OneShelf from './OneShelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelfbooks: [],
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
    BooksAPI.getAll().then((shelfbooks) => {
        this.setState(() => ({
          shelfbooks
        }))
      })
  }

  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
              <OneShelf
                shelftitle={'Currently Reading'}
                shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === "currentlyReading")}
                onChangeShelf={this.changeShelf}
              />
            </div>
            <div>
              <OneShelf
                shelftitle={'Want to Read'}
                shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === "wantToRead")}
                onChangeShelf={this.changeShelf}
              />
            </div>
            <div>
              <OneShelf
                shelftitle={'Read'}
                shelfbooks={this.state.shelfbooks.filter(shelfbook => shelfbook.shelf === "read")}
                onChangeShelf={this.changeShelf}
              />
            </div>
          </div>
      )}
    </div>
    )
  }
}



export default BooksApp
