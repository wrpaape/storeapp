/* globals React */
'use strict';

var List = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data,
      page: 1,
      limit: this.props.limit,
    };
  },
  render: function () {
    var rows = [];
    var i_0 = (this.state.page - 1) * this.state.limit;
    var i_f = 0;

    if (this.props.data.length < (this.state.page * this.state.limit)) {
      i_f = this.state.data.length;
    } else {
      i_f = i_0 + this.state.limit;
    }

    for (var i = i_0; i < i_f; i++) {
      rows.push(<DataRow elem={ this.state.data[i] } type={ this.props.type } />);
    }

    if (this.state.page === 1 && i_f === this.state.data.length) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Products
            </div>
            <Sort parent={ this } />
          </div>
          <div>{rows}</div>
        </div>
      )
    } else if (this.state.page === 1 && i_f < this.state.data.length) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Products
            </div>
            <Sort parent={ this } />
          </div>
          <div>{rows}</div>
          <div className='row'>
            <div className='col-sm-2 next-prev'></div>
            <div onClick={ this.clicked.bind(this, 1)  } className='col-sm-2 btn btn-default next-prev'>Next</div>
          </div>
        </div>
      )
    } else if (i_f < this.state.data.length) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Products
            </div>
            <Sort parent={ this } />
          </div>
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
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Products
            </div>
            <Sort parent={ this } />
          </div>
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

var Sort = React.createClass({
  getInitialState: function () {
    return {
      sort_by: 'created_at',
      sort_dir: 'DESC'
    };
  },
  render: function() {
    return (
      <div className='sort-bar'>
        <div className='sort-elem'>
          sort by:
        </div>
        <div className='sort-elem'>
          <select onClick={ this.clicked.bind(this, 'DESC') } name='sort_dir'>
            <option onClick={ this.clicked.bind(this, 'DESC') } >most</option>
            <option onClick={ this.clicked.bind(this, 'ASC') } >least</option>
          </select>
        </div>
        <div className='sort-elem'>
          <select name='sort_by'>
            <option onClick={ this.clicked.bind(this, 'created_at') } >recent</option>
            <option onClick={ this.clicked.bind(this, 'price') } >expensive</option>
            <option onClick={ this.clicked.bind(this, 'users_count') } >popular</option>
            <option onClick={ this.clicked.bind(this, 'purchases_count') } >purchased</option>
            <option onClick={ this.clicked.bind(this, 'quantity') } >in stock</option>
          </select>
        </div>
      </div>
    )
  },
  clicked: function (val) {
    this.setState({ page: 2 });
    // $.getJSON(URL, function (data) {
    //             this.setState({ loading: false, records: data });
    //         }.bind(this));
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
