/* globals React */
'use strict';

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
          <select name='sort_dir'>
            <option value='DESC'>most</option>
            <option value='ASC'>least</option>
          </select>
        </div>
        <div className='sort-elem'>
          <select name='sort_by'>
            <option value='created_at'>recent</option>
            <option value='price'>expensive</option>
            <option value='users_count'>popular</option>
            <option value='purchases_count'>purchased</option>
            <option value='quantity'>in stock</option>
          </select>
        </div>
      </div>
    )
  }
});
