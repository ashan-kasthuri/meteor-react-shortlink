import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import React from 'react';

import { SessionShowVisible } from '../../client/main';
export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showVisible: SessionShowVisible };
  }

  componentDidMount() {
    this.showVisibleTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') });
    });
  }
  componentWillUnmount() {
    this.showVisibleTracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input
          className="checkbox__box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={e => Session.set('showVisible', !e.target.checked)}
          />
          show hidden links
        </label>
      </div>
    );
  }
}
