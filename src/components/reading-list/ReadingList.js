import React, { Component } from 'react';

import Reading from '../reading';
import PageFlipper from '../page-flipper';

import './ReadingList.css';

class ReadingList extends Component {

  render() {
    const { readings, me, onSubmit, className, page } = this.props;

    return (
      <div>
        <h1>Lesnar Bækur</h1>
        {readings
          ? readings.length > 0
            ? <div>
                <ul>
                  {readings.map((book, i) => (
                    <li key={i}>
                      <Reading
                        me={me}
                        onSubmit={onSubmit}
                        book={book}
                        className={className}
                      />
                    </li>
                  ))}
                </ul>
                {readings.length > 9 &&
                <PageFlipper page={page} />}
              </div>
            : <div>
                Engar bækur lesnar
              </div>
          : <div>
              Næ í bækur...
            </div>
        }
      </div>
    );
  }
}

export default ReadingList;
