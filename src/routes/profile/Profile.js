import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import Field from '../../components/field';

class Profile extends Component {
  state = {
    name: '',
    password: '',
    passwordAgain: '',
    img: null,
  }

  render() {
    return (
      <div>
        <h1>Upplýsingar</h1>
        <form>
          <div>
            <input type="file" />
            <Button>Uppfæra mynd</Button>
          </div>
        </form>
        <form>
          <Field
            name="name"
            label="Nafn"
            value=""
            type="text"
            onChange={null}
          />
          <Button>Uppfæra nafn</Button>
        </form>
        <form>
          <Field
            name="password"
            label="Lykilorð"
            value=""
            type="password"
            onChange={null}
          />
          <Field
            name="password-again"
            label="Lykilorð, aftur"
            value=""
            type="password"
            onChange={null}
          />
          <Button>Uppfæra nafn</Button>
        </form>
        <h1>Lesnar bækur</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(Profile);
