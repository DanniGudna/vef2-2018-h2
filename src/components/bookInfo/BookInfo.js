import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookInfo extends Component {

  render() {
    const {
      title,
      author,
      description,
      isbn13,
      category,
      published,
      pagecount,
      language,
      onClick,
    } = this.props;

    return (
      <div>
        <div>
          <h2>{title}</h2>
          <div>Eftir:&nbsp;
            {author
              ? author
              : <p className="missing">Höfund vantar</p>
            }
          </div>
          <div>ISBN13:&nbsp;{isbn13}
            {isbn13
              ? isbn13
              : <p className="missing">ISBN13 vantar</p>
            }
          </div>
          <div>Flokkur:&nbsp;
            {category
              ? category
              : <p className="missing">Flokk vantar</p>
            }
          </div>
          <div>Lýsing:&nbsp;
            {description
              ? description
              : <p className="missing">Lýsingu vantar</p>
            }
          </div>
          <div>Síður:&nbsp;
            {pagecount
              ? `${pagecount} síður`
              :  <p className="missing">Blaðsíðutal vantar</p>
            }
          </div>
          <div>Gefin út:&nbsp;
            {published
              ? published
              : <p className="missing">Útgáfuár vantar</p>
            }
          </div>
          <div>Tungumál:&nbsp;
            {language
              ? language
              : <p className="missing">Tungumál vantar</p>
            }
          </div>
          <a onClick={onClick}>Breyta Bók</a>
        </div>
      </div>
    );
  }
}

BookInfo.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  isbn13: PropTypes.string,
  category: PropTypes.string,
  published: PropTypes.string,
  pagecount: PropTypes.string,
  language: PropTypes.string,
  onClick: PropTypes.func,
}

export default BookInfo;
