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
    };
    this.getItems = function() {
        return _items;
    };
    this.getCurrCategory = function(categoryIn) {
        if(_items[categoryIn] !== undefined)
            return _items[categoryIn];
        else
            return {};
    };
    this.getCurrCategory2 = function(categoryIn) {
        var arr = [];
        if(_items[categoryIn] !== undefined) {
            $.each(_items[categoryIn], function(i, item) {
                arr.push(item);
            });
        }

        return arr;
    };
    this.getCurrItem = function(categoryIn, number) {
        if(_items[categoryIn][number] !== undefined)
            return _items[categoryIn][number];
        else
            return {};
    }
}