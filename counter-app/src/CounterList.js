import React, { Component } from "react";
import Counter from "./Counter";

import iphoneImage from "./iPhone.jpg";
import ipadImage from "./iPad.jpg";
import imacImage from "./iMac.jpg";
import ibookImage from "./iBook.jpg";

class CounterList extends Component {
  state = {
    itemlist: [
      { id: 1, value: 0, itemname: "Rem", price: 500, image: 1 },
      { id: 2, value: 0, itemname: "Boat", price: 700, image: 2 },
      { id: 3, value: 0, itemname: "Rei", price: 550, image: 3 },
      { id: 4, value: 0, itemname: "Bot Chi", price: 890, image: 4 },
    ],
    total: 0, // เพิ่ม state total เพื่อเก็บราคารวม
  };

  // Calculate the total price of all items in the list
  calculateTotalPrice = () => {
    return this.state.itemlist.reduce(
      (total, item) => total + item.value * item.price,
      0
    );
  };

  // Render method for the CounterList component
  render() {
    return (
      
      <div className="container">
        <div className="text-right">
          <div className="d-inline mx-2 t">Total Price: {this.state.total} THB</div>
          
          <button onClick={this.resetButton} className="btn-warning btn-sm "> Reset </button>
        </div>      
        <div className="row mt-4">
          {this.state.itemlist.map((item) => {
            return (
              <div className="col-md-3" key={item.id}>
                <div className="text-center">
                  <Counter
                    item={item}
                    onIncrement={this.Increment}
                    onDecrement={this.Decrement}
                  />                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  // Increment method for individual items
  Increment = (item) => {
    var _itemList = [...this.state.itemlist];
    const indexItem = _itemList.indexOf(item);
    _itemList[indexItem] = { ...item };
    _itemList[indexItem].value++;

    // คำนวณราคารวมใหม่
    const newTotal = _itemList.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.value * currentItem.price;
    }, 0);

    this.setState({ itemlist: _itemList, total: newTotal }); // อัพเดต state ราคารวม
  };

  Decrement = (item) => {
    var _itemList = [...this.state.itemlist];
    const indexItem = _itemList.indexOf(item);
    _itemList[indexItem] = { ...item };
    if (_itemList[indexItem].value > 0) {
      _itemList[indexItem].value--; // ลบเฉพาะถ้าค่าปัจจุบันมากกว่า 0
    }

    // คำนวณราคารวมใหม่
    const newTotal = _itemList.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.value * currentItem.price;
    }, 0);

    this.setState({ itemlist: _itemList, total: newTotal }); // อัพเดต state ราคารวม
  };

  // Reset button click handler to set all item values to 0
  resetButton = () => {
    var resetItem = this.state.itemlist.map((item) => {
      item.value = 0;
      return item;
    });

    // รีเซ็ตราคารวมเป็น 0
    this.setState({ itemlist: resetItem, total: 0 });
  };
}

export default CounterList;
