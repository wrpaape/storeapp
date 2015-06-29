/* globals React */
'use strict';
var CartItem = React.createClass({
  getInitialState: function () {
    return {
      show: true,
      quantity: this.props.quantity,
    };
  },
  render: function() {
    return (
      <div className='row list-item'>
        <div className='col-sm-1'>
          <input id='quantity' className='large-input' size='3' type='text' placeholder={ this.state.quantity } onKeyUp={ this.changed } />
        </div>
        <div className='col-sm-5'>
          { this.props.name }
        </div>
      </div>
    );
  },
  changed: function (key) {
    if (key.keyCode === 13) {
      var new_quantity = $('#quantity').val();
      console.log(new_quantity);
    }
  }
});
