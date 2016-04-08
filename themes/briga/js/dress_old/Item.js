/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 20:00
 * To change this template use File | Settings | File Templates.
 */
function Item(itemIn)
{
    var _item = null;

    /**
     *
     * @returns {int|boolean}
     */
    this.getAlign = function(){
        if(_item['params_need'] !== undefined && _item['params_need']['other'] !== undefined && _item['params_need']['other']['align'] !== undefined)
            return _item['params_need']['other']['align'] != ''?_item['params_need']['other']['align']:0;
        else
            return 0;
    };

    /**
     *
     * @returns {string|boolean}
     */
    this.getName = function(){
        if (_item['name'] !== undefined)
            return _item['name'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean}
     */
    this.isMF = function(){
        var mf = false;
        if(_item['settings'] !== undefined) {
            $.each(_item['settings']['mf'], function (i, value){
                if(value > 0) {
                    mf = true;
                    return false;
                }
            });
        }
        return mf;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getAp = function() {
        if(_item['settings'] !== undefined && _item['settings']['apInfo']['select'] > 0)
            return apInfo[_item['settings']['apInfo']['select']]['level'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getApRuna = function() {
        if(_item['settings'] !== undefined && _item['settings']['apRuna']['select'] > 0)
            return _item['settings']['apRuna']['select'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getSharpen = function(){
        if(_item['settings'] !== undefined && _item['settings']['sharpen']['select'] > 0)
            return _item['settings']['sharpen']['select'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean}
     */
    this.isArt = function(){
        if((_item['is_art'] !== undefined && _item['is_art']) || (_item['create_art'] !== undefined && _item['create_art']))
            return true;
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getCost = function(){
        if(_item['price'] !== undefined && _item['price'] > 0)
            return _item['price'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getRepaCost = function(){
        if(_item['repa_cost'] !== undefined && _item['repa_cost'] > 0)
            return _item['repa_cost'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getPodgon = function(){
        if(_item['settings'] !== undefined && _item['settings']['podgonInfo']['select'] > 0)
            return _item['settings']['podgonInfo']['select'];
        else
            return false;
    };

    /**
     *
     * @returns {*}
     */
    this.getParamNeed = function(){
        if(_item['params_need'] !== undefined)
            return _item['params_need'];
        else
            return {};
    };

    /**
     *
     * @returns {*}
     */
    this.getParamGive = function(){
        if(_item['params_give'] !== undefined)
            return _item['params_give'];
        else
            return {};
    };

    /**
     *
     * @param paramType give/need
     * @param type stats/mf/vlad ....
     * @returns {*}
     */
    this.getGroupParam = function(paramType, type){
        if(_item[paramType] !== undefined && _item[paramType][type] !== undefined)
            return _item[paramType][type];
        else
            return {};
    };

    /**
     *
     * @returns {boolean}
     */
    this.isUnik = function(){
        if((_item['settings'] !== undefined && _item['settings']['mf']['stats'] == 3) || _item['create_art'] || _item['is_art'])
            return true;
        else
            return false;
    };

    __construct = function(itemIn){
        _item = itemIn;
    }(itemIn);
}