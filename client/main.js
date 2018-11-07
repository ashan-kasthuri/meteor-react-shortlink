import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import '../imports/startup/simple-schema-configuration';
import AppRouter, { onAuthChange } from '../imports/client/AppRouter';

Tracker.autorun(() => onAuthChange(!!Meteor.userId()));

export const SessionShowVisible = true;

ReactModal.setAppElement('#app');
Meteor.startup(() => {
  Session.set('showVisible', SessionShowVisible);
  ReactDOM.render(AppRouter, document.getElementById('app'));
});
