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
        if(_item['params_need'] !== undefined && _item['align'] !== undefined)
            return _item['align'] != ''?_item['align']:0;
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
        if(_item['settings'] !== undefined && _item['settings']['_mfInfo'] !== undefined) {
            $.each(_item['settings']['_mfInfo'], function (i, value){
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
        if(_item['settings'] === undefined || _item['settings']['_apNumber'] == 0)
            return false;

        if(_item['dataType'] != 'runa1' && _item['dataType'] != 'runa2' && _item['dataType'] != 'runa3') {
            return apInfo[_item['settings']['_apNumber']]['level'];
        } else {
            return _item['settings']['_apNumber'];
        }
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getSharpen = function(){
        if(_item['settings'] !== undefined && _item['settings']['_sharpenNumber'] > 0)
            return _item['settings']['_sharpenNumber'];
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
        if(_item['price_reputation'] !== undefined && _item['price_reputation'] > 0)
            return _item['price_reputation'];
        else
            return false;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getEkrCost = function(){
        if(_item['price_ekr'] !== undefined && _item['price_ekr'] > 0)
            return _item['price_ekr'];
        else
            return 0;
    };

    this.getDurability = function(){
        if(_item['durability'] !== undefined && _item['durability'] > 0)
            return _item['durability'];
        else
            return 0;
    };

    /**
     *
     * @returns {boolean|int}
     */
    this.getPodgon = function(){
        if(_item['settings'] !== undefined && _item['settings']['_podgonNumber'] > 0)
            return _item['settings']['_podgonNumber'];
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

    this.isProkat = function(){
        return _item['chooseProkat'];
    };

    this.inProkat = function(){
        return _item['in_prokat'];
    };

    this.getStringProkat = function(){
        var string = '';
        $.each(_item['prokat_info'], function(level, value){
            if(value)
                string += '['+level+'], ';
        });

        return string.replace(/, $/, "");
    };

    this.isRune = function(){
        return _item['dataType'] == 'runa1' || _item['dataType'] == 'runa2' || _item['dataType'] == 'runa3';
    };

    this.isRuneDamage = function(){
        return _item['enabled_rune_increased_damage'];
    };

    this.isRuneArmor = function(){
        return _item['enabled_rune_increased_armor'];
    };

    this.isRuneMF = function(){
        return _item['enabled_rune_increased_mf'];
    };

    /**
     *
     * @returns {boolean}
     */
    this.isUnik = function(){
        return _item['unique'];
    };

    var __construct = function(itemIn){
        _item = itemIn;
    }(itemIn);
}