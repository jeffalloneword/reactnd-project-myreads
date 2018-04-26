import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    shelfbooks: PropTypes.array.isRequired,
  }

  render() {
    const { shelfbooks } = this.props

    const currentlyReading = shelfbooks.filter(shelfbook => shelfbook.shelf == "currentlyReading")

    const wantToRead = shelfbooks.filter(shelfbook => shelfbook.shelf == "wantToRead")

    const haveRead = shelfbooks.filter(shelfbook => shelfbook.shelf == "read")

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {currentlyReading.map((shelfbook) => (
                      <li key={shelfbook.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${shelfbook.imageLinks.thumbnail})`  }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" selected="selected">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelfbook.title}</div>
                          <div className="book-authors">{shelfbook.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead.map((shelfbook) => (
                      <li key={shelfbook.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${shelfbook.imageLinks.thumbnail})`  }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead" selected="selected">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelfbook.title}</div>
                          <div className="book-authors">{shelfbook.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {haveRead.map((shelfbook) => (
                      <li key={shelfbook.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${shelfbook.imageLinks.thumbnail})`  }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read" selected="selected">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelfbook.title}</div>
                          <div className="book-authors">{shelfbook.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ListBooks
