/* globals React */
'use strict';
var LoggedOut = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row sidebar-link'>
          <NavLinkSide name='Sign Up' url='/users/new' />
        </div>
        <div className='row sidebar-link'>
          <NavLinkSide name='Log In' url='/login' />
        </div>
        <div className='row sidebar-link'>
          <NavLinkSide name='Home' url='/' />
        </div>
        <div className='row sidebar-link'>
          <NavLinkSide name='Search' url='/products/search' />
        </div>
        <div className='row sidebar-link'>
          <NavLinkSide name='All Users' url='/logout' />
        </div>
      </div>
    );
  }
});

var NavLinkSide = React.createClass({
  render: function () {
    return (<a onClick={this.clicked} className='btn btn-default'>{this.props.name}</a>);
  },
  clicked: function () {
    window.location.href = this.props.url;
  }
});
