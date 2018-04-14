import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import Field from '../../components/field';
import { updateUser } from '../../actions/auth';

class Profile extends Component {
  state = {
    name: '',
    password: '',
    passwordAgain: '',
    img: null,
  }

  handleFileChange = (e) => {
    const { files } = e.target;
    console.info(files);
    this.setState({ img: files[0] });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleNameSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { name } = this.state;
    dispatch(updateUser(name));
  }

  render() {
    const { img, name } = this.state;

    return (
      <div>
        <h1>Upplýsingar</h1>
        <form>
          <div>
            <input
              type="file"
              onChange={this.handleFileChange}
            />
            <Button>Uppfæra mynd</Button>
          </div>
        </form>
        <form onSubmit={this.handleNameSubmit}>
          <Field
            name="name"
            label="Nafn"
            value={name}
            type="text"
            onChange={this.handleInputChange}
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
          <Button>Uppfæra lykilorð</Button>
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
