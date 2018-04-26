import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    shelfbooks: PropTypes.array.isRequired,
  }

  render() {
    const { shelfbooks } = this.props

    const showingBooks = shelfbooks

    return (
      <div>
        <ol>
            {showingBooks.map((shelfbook) => (
            <li key={shelfbook.id}>
              {shelfbook.title}
            </li>
          ))}
        </ol>
      </div>
    )
  }

}

export default ListBooks
