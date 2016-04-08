/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 26.12.12
 * Time: 16:22
 * To change this template use File | Settings | File Templates.
 */
function Items()
{
    var _items = {};
    this.setItems = function(itemsIn) {
        _items = itemsIn;
    }
    this.getItems = function() {
        return _items;
    }
    this.getCurrCategory = function(categoryIn) {
        return _items[categoryIn];
    }
    this.getCurrItem = function(categoryIn, number) {
        return _items[categoryIn][number];
    }


}