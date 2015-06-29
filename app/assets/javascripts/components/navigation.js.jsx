/* globals React */
'use strict';
var Navigation = React.createClass({
    render: function () {
        if (this.props.logged_in) {
            return (<LoggedIn userID={ this.props.userID } />);
        } else {
            return (<LoggedOut />);
        }
    }
});
