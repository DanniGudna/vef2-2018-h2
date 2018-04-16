import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyReadings, deleteReading } from '../../actions/readings';

import Reading from '../reading';
import PageFlipper from '../page-flipper';

import './ReadingList.css';

class ReadingList extends Component {

  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMyReadings());
  }

  handleDelete = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const readingId = e.target.children[1].id;

    dispatch(deleteReading(readingId));
  }

  render() {
    const { readings, me, className, page, fetchingReads } = this.props;

    console.info(fetchingReads);
    console.info(readings);
   
    if (fetchingReads) {

      return (
        <div>
          <h1>Lesnar Bækur</h1>
          <div>Sæki bækur</div>
        </div>
      )
    }

    return (
      <div>
        <h1>Lesnar Bækur</h1>
        {readings.length > 0
          ? <div>
              <ul>
                {readings.map((book, i) => (
                  <li key={i}>
                    <Reading
                      me={me}
                      onSubmit={this.handleDelete}
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
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.info(state.readings);
  return {
    fetchingReads: state.readings.fetchingReads,
    readings: state.readings.readings,
  }
}

export default connect(mapStateToProps)(ReadingList);
