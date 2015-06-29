/* globals React */
'use strict';

var ProductsIndex = React.createClass({
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
            <ListItem elem={ this.state.data[i] } user={ this.props.user } />
            <ListItem elem={ this.state.data[i + 1] } user={ this.props.user } />
          </div>
        );
      } else {
        rows.push(
          <div className="row">
            <ListItem elem={ this.state.data[i] } user={ this.props.user } />
          </div>
        );
      }
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
                <li>price: ${ this.props.elem.price.toFixed(2) }</li>
                <li>category: { this.props.elem.category }</li>
                <li>owned by { this.props.elem.users_count } users</li>
                <li>purchased { this.props.elem.purchases_count } times</li>
                <li>{ this.props.elem.quantity } left in stock</li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <ButtonBar elem={ this.props.elem } user={ this.props.user } parent={ this } />
          </div>
        </div>
      </div>
    )
    } else {
      return (<div></div>)
    }
  }
});

var ButtonBar = React.createClass({
  getInitialState: function () {
    return {
      grandparent: this.props.parent
    };
  },
  render: function () {
    if (this.props.user !== null) {
      if (this.props.user.admin === true) {
        return (
          <div>
            <NavLink1 name='View' url={ '/products/' + this.props.elem.id } method='GET' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
            <NavLink1 name='Add to Cart' url='/cart_items/' method='POST' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
            <NavLink1 name='Edit' url={ '/products/' + this.props.elem.id + '/edit' } method='GET' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
            <NavLink1 name='Destroy' url={ '/products/' + this.props.elem.id } method='DELETE' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
          </div>
        )
      } else {
        return (
          <div>
            <NavLink1 name='View' url={ '/products/' + this.props.elem.id } method='GET' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
            <NavLink1 name='Add to Cart' url='/cart_items/' method='POST' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
          </div>
        )
      }
    } else {
      return (
        <div>
          <NavLink1 name='View' url={ '/products/' + this.props.elem.id } method='GET' grandparent={ this.state.grandparent } product_id={ this.props.elem.id } />
        </div>
      )
    }
  }
});

var NavLink1 = React.createClass({
  getInitialState: function () {
    return {
      name: this.props.name,
      url: this.props.url,
      method: this.props.method,
      greatgrandparent: this.props.grandparent,
      user_cart_items: []
    };
  },
  componentWillMount: function () {
    var user_cart_items;
    if (this.state.greatgrandparent.props.user !== null) {
      $.getJSON('/cart_items/',
        {
          user_id: this.state.greatgrandparent.props.user.id
        },
        function (cart_items) {
          // global_cart_items = cart_items;
          // console.log(global_cart_items);
            this.setState({ user_cart_items: cart_items });
          }.bind(this)
      );
      if (this.props.name === 'Add to Cart') {
        var product_id = this.props.product_id;
        var cart_items = this.state.user_cart_items;
      // console.log(product_id);

      // console.log(global_cart_items);
        if ($.inArray(product_id, cart_items.product_ids) > -1) {
          // console.log('hello');
          var index = cart_items.product_ids.indexOf(product_id);
          var cart_item_id = cart_items.cart_item_ids[index];
          this.setState({ name: 'Remove from Cart', url: '/cart_items/' + cart_item_id, method: 'DELETE' });
        }
      }
    }
  },
  render: function () {
    return (<a onClick={ this.clicked } className='btn btn-default'>{ this.state.name }</a>)
  },
  clicked: function () {
    if (this.state.method === 'DELETE') {
      if (this.props.name === 'Destroy') {
        $.ajax({
          url: this.props.url,
          type: 'DELETE',
          error: function () {
            this.state.greatgrandparent.setState({ show: 'false'});
          }.bind(this)
        });
      } else {
        $.ajax({
          url: this.state.url,
          type: 'DELETE',
          success: function () {
            this.setState({ name: 'Add to Cart', url: '/cart_items/', method: 'POST' });
            this.componentWillMount();
          }.bind(this)
        });
      }
    } else if (this.state.method === 'POST') {
      $.post( this.state.url,
        {
          product_id: this.props.product_id,
          user_id: this.state.greatgrandparent.props.user.id,
         },
        function( cart_item_id ) {
          this.setState({ name: 'Remove from Cart', url: '/cart_items/' + cart_item_id, method: 'DELETE' });
          this.componentWillMount();
        }.bind(this), "json"
      );
    } else{
        window.location.href = this.props.url;
    }
  }
});
