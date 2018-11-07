import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  render() {
    return (
      <FlipMove maintainContainerHeight={true}>
        {this.renderLinkListItems()}
      </FlipMove>
    );
  }

  renderLinkListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No links found</p>
        </div>
      );
    }
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }
}
