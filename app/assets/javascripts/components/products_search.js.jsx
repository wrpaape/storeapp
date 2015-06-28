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

