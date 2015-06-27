/* globals React */
'use strict';

var List = React.createClass({
  getInitialState: function () {
    return {
      page: 1
    };
  },
  render: function () {
    var limit = 10;
    var rows = [];
    var i_0 = (this.state.page - 1) * limit;
    var i_f = 0;

    if (this.props.data.length < (this.state.page * limit)) {
      i_f = this.props.data.length;
    } else {
      i_f = i_0 + limit;
    }

    for (var i = i_0; i < i_f; i++) {
      rows.push(<DataRow elem={ this.props.data[i] } type={ this.props.type } />);
    }

    if (this.state.page === 1 && i_f === this.props.data.length) {
      return (
        <div>
          <div>{rows}</div>
        </div>
      )
    } else if (this.state.page === 1 && i_f < this.props.data.length) {
      return (
        <div>
          <div>{rows}</div>
          <div className='row'>
            <div className='col-sm-2 next-prev'></div>
            <div onClick={ this.clicked.bind(this, 1)  } className='col-sm-2 btn btn-default next-prev'>Next</div>
          </div>
        </div>
      )
    } else if (i_f < this.props.data.length) {
      return (
        <div>
          <div>{rows}</div>
          <div className='row'>
            <div onClick={ this.clicked.bind(this, -1)  } className='col-sm-2 btn btn-default next-prev'>Prev</div>
            <div onClick={ this.clicked.bind(this, 1)  } className='col-sm-2 btn btn-default next-prev'>Next</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>{rows}</div>
          <div className='row'>
            <div onClick={ this.clicked.bind(this, -1) } className='col-sm-2 btn btn-default next-prev'>Prev</div>
          </div>
        </div>
      )
    }
  },
  clicked: function (val) {
    this.setState({ page: this.state.page + val });
  }
});

var DataRow = React.createClass({
  getInitialState: function () {
    return {
      show: 'true'
    };
  },
  render: function () {
    if (this.state.show === 'true') {
    return (
      <div className='row'>
        <div className='col-sm-1'></div>
        <div className='col-sm-9'>
          <h4>{ this.props.elem.name }</h4>
          <NavLink name='Show' url={ '/' + this.props.type + '/' + this.props.elem.id } method='GET' parent={ this } />
          <NavLink name='Edit' url={ '/' + this.props.type + '/' + this.props.elem.id + '/edit' } method='GET' parent={ this } />
          <NavLink name='Destroy' url={ '/' + this.props.type + '/' + this.props.elem.id } method='DELETE' parent={ this } />
        </div>
      </div>
    )
    } else {
      return (<div></div>)
    }
  }
});

var NavLink = React.createClass({
  getInitialState: function () {
    return {
        grandparent: this.props.parent
    };
  },
  render: function () {
    return (<a onClick={ this.clicked } className='btn btn-default'>{ this.props.name }</a>)
  },
  clicked: function () {
    if (this.props.method === 'DELETE') {
      $.ajax({
        url: this.props.url,
        type: 'DELETE',
        error: function () {
          this.state.grandparent.setState({ show: 'false'});
        }.bind(this)
      });
    } else {
        window.location.href = this.props.url;
    }
  }
});
