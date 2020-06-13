module.exports = function Cart(oldCart) {

    //initialized the items object 
    this.items = oldCart.items || {};

    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // if (this.items) {
    //     for (var key in this.items) {
    //         this.totalQty += this.items[key].qty;
    //         this.totalPrice += this.items[key].qty * this.items[key].item.price;
    //     }
    // }

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { qty: 0, item: item, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};