import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OneShelf extends Component {
  static propTypes = {
    shelfbooks: PropTypes.array.isRequired,
  }

  render() {
    const { shelfbooks } = this.props

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelftitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {shelfbooks.map((shelfbook) => (
                <li key={shelfbook.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${shelfbook.imageLinks.thumbnail})`  }}>
                      </div>
                      <div className="book-shelf-changer">
                        <select
                          value={shelfbook.shelf}
                          onChange={this.onChangeShelf}
                          >
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
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
      </div>
    )
  }
}

export default OneShelf
