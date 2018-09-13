import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Bar } from './components/Bar/Bar';
import { FriendsContainer } from './components/FriendsContainer/FriendsContainer';
import { Background } from './Background/Background';

ReactDOM.render(React.createElement(Bar, { text: "Telefonliste von Marc Müller" }), document.getElementById('header'));
ReactDOM.render(<FriendsContainer />, document.getElementById('root'));
ReactDOM.render(React.createElement(Bar, { text: "Erstellt am 05.09.2018" }), document.getElementById('footer'));
ReactDOM.render(<Background />, document.getElementById('test'));