/* globals React */
'use strict';
var CartItems = React.createClass({
  getInitialState: function () {
    return {
      cart_items: this.props.elems,
      products: this.props.product_elems,
      total: this.props.initial_total
    };
  },
  render: function() {
    var rows = [];
    var cart_items = this.state.cart_items;
    var product_elems = this.state.products;
    for (var i = 0; i < cart_items.length; i++) {
      rows.push(<CartItem elem={ cart_items[i] } product_elem={ product_elems[i] } cart_total={ this } />);
    };
    rows.push(
      <div className='row list-item'>
        <div className='col-sm-6'></div>
        <div className='col-sm-6'>
          ${ Math.abs((this.state.total)).toFixed(2) }
        </div>
      </div>
    );

    return (<div>{rows}</div>);
  }
});

var CartItem = React.createClass({
  getInitialState: function () {
    return {
      cart_item: this.props.elem,
      product: this.props.product_elem,
      total: this.props.cart_total,
      show: true
    };
  },
  render: function() {
    if (this.state.show === true) {
      return (
        <div className='row list-item'>
          <div className='col-sm-1'>
            <input id='quantity' className='large-input' size='3' type='text' placeholder={ this.state.cart_item.quantity } onKeyUp={ this.changed } />
          </div>
          <div className='col-sm-5'>
            { this.state.product.name }
          </div>
          <div className='col-sm-6'>
            ${ (this.state.product.price * this.state.cart_item.quantity).toFixed(2) }
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    };
  },
  changed: function (key) {
    var new_quantity = parseInt(key.target.value.trim());
    if (key.keyCode === 13) {
      var old_state = this;
      var url = '/cart_items/' + this.state.cart_item.id;
      if (new_quantity === 0) {
        $.ajax({
           url: url,
           type: 'DELETE',
           success: function(response) {
             var old_quantity = old_state.props.elem.quantity;
             var old_total = old_state.state.total.state.total;
             var new_total = old_total + ((new_quantity - old_quantity) * old_state.state.product.price);
             this.setState({ show: false });
             this.state.total.setState({total: new_total});
           }.bind(this)
        });
      } else if (new_quantity < 0) {

      } else {
        $.ajax({
           url: url,
           type: 'PUT',
           data: 'quantity=' + new_quantity,
           success: function(response) {
             var updated_cart_item = response;
             var old_quantity = old_state.props.elem.quantity;
             var old_total = old_state.state.total.state.total;
             var new_total = old_total + ((new_quantity - old_quantity) * old_state.state.product.price);
             old_state.setState({
              cart_item: updated_cart_item
             });
             old_state.state.total.setState({
              total: new_total
             });
           }
        });
      }
    }
  }
});
