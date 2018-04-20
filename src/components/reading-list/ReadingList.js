import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReadings, deleteReading } from '../../actions/readings';
import createHistory from 'history/createBrowserHistory';

import Reading from '../reading';
import PageFlipper from '../page-flipper';

import './ReadingList.css';

class ReadingList extends Component {
  state = {
    page: 1,
  };

  async componentDidMount() {
    const { dispatch, userId } = this.props
    let { page } = this.props;
    const history = createHistory();
    let { search } = history.location;
    if (search) {
      search = search.slice(6);
      page = Number(search);
    }
    dispatch(fetchReadings(userId, page));
  }

  onLeftClick = (e) => {
    e.preventDefault();    
    const { page } = this.state;
    this.setState({ page: page - 1 });
    const { dispatch, userId } = this.props;
    const history = createHistory();
    history.push(`?page=${page-1}`)
    dispatch(fetchReadings(userId, page-1));
  }

  onRightClick = (e) => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const { dispatch, userId } = this.props;
    const history = createHistory();
    history.push(`?page=${page+1}`)

    dispatch(fetchReadings(userId, page + 1));
  }

  handleDelete = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const readingId = e.target.children[1].id;

    dispatch(deleteReading(readingId));
  }

  render() {
    const { readings, me, className, fetchingReads } = this.props;
    let page;


    const history = createHistory();
    let { search } = history.location;
    if (search) {
      search = search.slice(6);
      page = Number(search);
    } else {
      page = this.state.page;
    }


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
        <h1 className="readinglist__header">Lesnar Bækur</h1>
        {readings.length > 0
          ? <div>
              <ul className="readinglist__container">
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
              <PageFlipper
                size={readings.length}
                page={page}
                onLeftClick={this.onLeftClick}
                onRightClick={this.onRightClick}
              />
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
  return {
    fetchingReads: state.readings.fetchingReads,
    readings: state.readings.readings,
  }
}

export default connect(mapStateToProps)(ReadingList);
