import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactModal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + add Link
        </button>
        <ReactModal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.urlInput.focus()}
          onRequestClose={this.onModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onFormSubmit} className="boxed-view__form">
            <input
              type="text"
              placeholder="URL"
              ref="urlInput"
              value={this.state.url}
              onChange={this.onUrlChange}
            />
            <button className="button">Add Link</button>
            <button
              type="button"
              className="button button--secondary"
              onClick={this.onModalClose}
            >
              Cancel
            </button>
          </form>
        </ReactModal>
      </div>
    );
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { url } = this.state;

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.onModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  onUrlChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  onModalClose() {
    this.setState({ isOpen: false, url: '', error: '' });
  }
}
