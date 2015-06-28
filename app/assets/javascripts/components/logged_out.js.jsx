/* globals React */
'use strict';
var LoggedOut = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row sidebar-link'>
          <NavLink name='Sign Up' url='/users/new' />
        </div>
        <div className='row sidebar-link'>
          <NavLink name='Log In' url='/login' />
        </div>
        <div className='row sidebar-link'>
          <NavLink name='Home' url='/' />
        </div>
        <div className='row sidebar-link'>
          <NavLink name='Search' url='/products/search' />
        </div>
        <div className='row sidebar-link'>
          <NavLink name='All Users' url='/logout' />
        </div>
      </div>
    );
  }
});

var NavLink = React.createClass({
  render: function () {
    return (<a onClick={this.clicked} className='btn btn-default'>{this.props.name}</a>);
  },
  clicked: function () {
    window.location.href = this.props.url;
  }
});
