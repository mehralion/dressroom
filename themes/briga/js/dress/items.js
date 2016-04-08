/**
 * Created by Николай on 04.06.14.
 */
function Items()
{
    var _that = this;
    var _items = {};

    this.setItems = function(items){
        _items = items;
    };

    this.getItemsByType = function(type){
        if(_items[type] !== undefined)
            return _items[type];

        return {};
    };

    this.getItem = function(dataType, id){
        if(_items[dataType] !== undefined && _items[dataType][id] !== undefined)
            return _items[dataType][id];

        return {};
    };
}