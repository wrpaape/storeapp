/* globals React */
'use strict';

var ProductSearch = React.createClass({
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

    if (this.state.data.length < (this.state.page * this.state.limit)) {
      i_f = this.state.data.length;
    } else {
      i_f = i_0 + parseInt(this.state.limit);
    }

    for (var i = i_0; i < i_f; i+=2) {
      if (i < (i_f - 1)) {
        rows.push(
          <div className="row">
            <ListItem elem={ this.state.data[i] } />
            <ListItem elem={ this.state.data[i + 1] } />
          </div>
        );
      } else {
        rows.push(
          <div className="row">
            <ListItem elem={ this.state.data[i] } />
          </div>
        );
      }
    }

    if (this.state.page === 1 && i_f === this.state.data.length) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Results
            </div>
            <Sort parent={ this } />
            <Search parent={ this } />
          </div>
          <div>{rows}</div>
        </div>
      )
    } else if (this.state.page === 1 && i_f < this.state.data.length) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3 list-header-text">
              Results
            </div>
            <Sort parent={ this } />
            <Search parent={ this } />
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
              Results
            </div>
            <Sort parent={ this } />
            <Search parent={ this } />
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
              Results
            </div>
            <Sort parent={ this } />
            <Search parent={ this } />
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
      parent: this.props.parent,
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
          <select id='sort_dir' onChange={ this.selected } >
            <option value='DESC'>most</option>
            <option value='ASC'>least</option>
          </select>
        </div>
        <div className='sort-elem'>
          <select id='sort_by' onChange={ this.selected }>
            <option value='created_at'>recent</option>
            <option value='price'>expensive</option>
            <option value='users_count'>popular</option>
            <option value='purchases_count'>purchased</option>
            <option value='quantity'>in stock</option>
          </select>
        </div>
        <div className='limit-elem'>
          <span>show </span>
          <input id='limit' size='3' type='text' onChange={ this.limited }/>
          <span> items per page</span>
        </div>
      </div>
    )
  },
  selected: function () {
    var sort_dir = $('#sort_dir').val();
    var sort_by = $('#sort_by').val();
    var list = this.state.parent;
    var url = '/products'
    $.getJSON(url,
      {
        sort_dir: sort_dir,
        sort_by: sort_by
      },
      function (new_data) {
        list.setState({ data: new_data, page: 1 });
      }
    );
  },
  limited: function () {
    var new_limit = $('#limit').val();
    this.state.parent.setState({ limit: new_limit });
  }
});

var Search = React.createClass({
  getInitialState: function () {
    return {
      parent: this.props.parent
    };
  },
  render: function() {
    return (
      <div className='row search-bar'>
        <div className='limit-elem'>
          <span>name: </span>
          <input id='name' size='10' type='text' onChange={ this.changed }/>
          <span> category: </span>
          <input id='category' size='10' type='text' onChange={ this.changed }/>
          <span> min price: $</span>
          <input id='price_min' size='5' type='text' onChange={ this.changed }/>
          <span> max price: $</span>
          <input id='price_max' size='5' type='text' onChange={ this.changed }/>
        </div>
      </div>
    )
  },
  changed: function () {
    var sort_dir = $('#sort_dir').val();
    var sort_by = $('#sort_by').val();
    var name = $('#name').val();
    var category = $('#category').val();
    var price_min = $('#price_min').val();
    var price_max = $('#price_max').val();
    var list = this.state.parent;
    var url = '/products/search'
    $.getJSON(url,
      {
        sort_dir: sort_dir,
        sort_by: sort_by,
        name: name,
        category: category,
        price_min: price_min,
        price_max: price_max
      },
      function (new_data) {
        list.setState({ data: new_data, page: 1 });
      }
    );
  }
});

var ListItem = React.createClass({
  getInitialState: function () {
    return {
      show: 'true'
    };
  },
  render: function () {
    if (this.state.show === 'true') {
    return (
      <div>
        <div className='col-sm-6'>
          <div className='row list-item'>
            <a href= { '/products/' + this.props.elem.id } >{ this.props.elem.name }</a>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <img src={ this.props.elem.image } className="thumbnail" />
            </div>
            <div className='col-sm-9'>
              <ul className='details'>
                <li>price: ${ this.props.elem.price }</li>
                <li>category: { this.props.elem.category }</li>
                <li>owned by { this.props.elem.users_count } users</li>
                <li>purchased { this.props.elem.purchases_count } times</li>
                <li>{ this.props.elem.quantity } left in stock</li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <NavLink name='View' url={ '/products/' + this.props.elem.id } method='GET' parent={ this } />
            <NavLink name='Edit' url={ '/products/' + this.props.elem.id + '/edit' } method='GET' parent={ this } />
            <NavLink name='Destroy' url={ '/products/' + this.props.elem.id } method='DELETE' parent={ this } />
          </div>
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
