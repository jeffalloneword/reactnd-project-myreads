import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OneShelf extends Component {
  static propTypes = {
    shelfbooks: PropTypes.array.isRequired,
  }

  changeShelf = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  render() {
    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{this.props.shelftitle}</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {this.props.shelfbooks.map((shelfbook) => (
                <li key={shelfbook.id}>
                  <div className='book'>
                    <div className='book-top'>
                      <div className='book-cover'
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${shelfbook.imageLinks ? shelfbook.imageLinks.thumbnail : 'no image' })`  }}>
                      </div>
                      <div className='book-shelf-changer'>
                        <select
                          value={shelfbook.shelf}
                          onChange={(event) => this.changeShelf(shelfbook, event.target.value)}
                          >
                          <option value='none' disabled>Move to...</option>
                          <option value='currentlyReading'>Currently Reading</option>
                          <option value='wantToRead'>Want to Read</option>
                          <option value='read'>Read</option>
                          <option value='none'>None</option>
                        </select>
                      </div>
                    </div>
                    <div className='book-title'>{shelfbook.title ? shelfbook.title : 'unknown'}</div>
                    <div className='book-authors'>{shelfbook.authors ? shelfbook.authors : 'unknown'}</div>
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
