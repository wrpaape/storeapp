/* globals React */
'use strict';
var Navigation = React.createClass({
    render: function () {
        if (this.props.logged_in) {
            return (<LoggedIn userID={ this.props.user.id } />);
        } else {
            return (<LoggedOut />);
        }
    }
});
