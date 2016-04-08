/**
 * Created by Николай on 03.06.14.
 */

function Container()
{
    /**
     *
     * @type {Container}
     * @private
     */
    var _that = this;
    /**
     *
     * @type {{}}
     * @private
     */
    var _params = {};

    /**
     *
     * @type {{}}
     * @private
     */
    var _dummyItems = {};

    this.minValue = {
        'strange'   : 3,
        'agility'   : 3,
        'intuition' : 3,
        'endurance' : 3,
        'intellect' : 0,
        'wisdom'    : 0,
        'sword'     : 0,
        'knife'     : 0,
        'ax'        : 0,
        'baton'     : 0,
        'fire'      : 0,
        'water'     : 0,
        'air'       : 0,
        'earth'     : 0,
        'light'     : 0,
        'grey'      : 0,
        'dark'      : 0,
        'ap'        : 0,
        'level'     : 0
    };

    this.maxValue = {
        'sword'     : 5,
        'knife'     : 5,
        'ax'        : 5,
        'baton'     : 5,
        'fire'      : 5,
        'water'     : 5,
        'air'       : 5,
        'earth'     : 5,
        'light'     : 5,
        'grey'      : 5,
        'dark'      : 5
    };

    /**
     * Задать новые параметры или обнулить
     * @param paramsIn
     */
    this.setParams = function (paramsIn) {
        if (paramsIn === null || paramsIn === undefined) {
            _params = {
                stats           : {
                    give: {
                        strange: 0,
                        agility: 0,
                        intuition: 0,
                        endurance: 0,
                        intellect: 0,
                        wisdom: 0
                    },
                    need: {
                        strange: 0,
                        agility: 0,
                        intuition: 0,
                        endurance: 0,
                        intellect: 0,
                        wisdom: 0
                    },
                    own: {
                        strange: 3,
                        agility: 3,
                        intuition: 3,
                        endurance: 3,
                        intellect: 0,
                        wisdom: 0
                    }
                },
                possession      : {
                    give: {
                        sword: 0,
                        knife: 0,
                        ax: 0,
                        baton: 0
                    },
                    need: {
                        sword: 0,
                        knife: 0,
                        ax: 0,
                        baton: 0
                    },
                    own: {
                        sword: 0,
                        knife: 0,
                        ax: 0,
                        baton: 0
                    }
                },
                possession_m    : {
                    give: {
                        fire: 0,
                        water: 0,
                        air: 0,
                        earth: 0,
                        light: 0,
                        grey: 0,
                        dark: 0
                    },
                    need: {
                        fire: 0,
                        water: 0,
                        air: 0,
                        earth: 0,
                        light: 0,
                        grey: 0,
                        dark: 0
                    },
                    own: {
                        fire: 0,
                        water: 0,
                        air: 0,
                        earth: 0,
                        light: 0,
                        grey: 0,
                        dark: 0
                    }
                },
                mf              : {
                    critical: 0,
                    p_critical: 0,
                    flee: 0,
                    p_flee: 0
                },
                levelInfo       : {
                    own: {
                        level: 0,
                        ap: 0
                    },
                    need: {
                        level: 0
                    }
                },
                other           : {
                    hp: 0,
                    mp: 0,
                    exp: 0
                },
                armor           : {
                    head: 0,
                    body: 0,
                    belt: 0,
                    feet: 0
                },
                unique          : 0,
                increased       : {
                    damage: 0,
                    mf: 0,
                    armor: 0
                },
                medals          : {
                    hero: false
                },
                food            : {

                },
                duh             : {
                    other: {
                        hp: 0
                    }
                },
                damage          : {
                    min_damage: 0,
                    max_damage: 0
                },
                info            : {
                    align: 0,
                    duh: 0
                }
            }
        }
        else {
            _params = {};
            _params = $.extend(true, {}, paramsIn);
        }
    };

    /**
     * Получить параметры
     * @returns {{}}
     */
    this.getParams = function () {
        return _params;
    };

    /**
     * Загружаем вещи для куклы
     * @param itemsIn
     */
    this.setDummyItems = function (itemsIn, clone) {
        if(itemsIn === null || itemsIn === undefined) {
            _dummyItems = {};
        } else {
            if(clone === true)
                _dummyItems = $.extend(true, {}, itemsIn);
            else {
                $.each(itemsIn, function(category, item){
                    _that.setItem(category, item);
                });
            }
        }
    };

    /**
     * Получаем мф от стата
     * @param statName
     * @returns {{}}
     */
    this.getMFfromStat = function (statName) {

        var returned = {};
        if(statToMf[statName] === undefined)
            return returned;

        var sum = _params['stats']['own'][statName] + _params['stats']['give'][statName];
        $.each(statToMf[statName], function(statType, infos) {
            returned[statType] = {};
            $.each(infos, function (mfType, value){
                if(returned[statType][mfType] === undefined)
                    returned[statType][mfType] = value * sum;
                else
                    returned[statType][mfType] += value * sum;
            });
        });

        return returned;
    };

    /**
     *
     * @param dataType stats, armor, mf etc.
     * @param type give, need, own
     * @param name critical, strange, agility etc.
     * @returns {number}
     */
    this.getParamValue = function(dataType, type, name){
        var value = 0;
        if(_params[dataType] === undefined)
            return value;

        if(_params[dataType][type] !== undefined && _params[dataType][type][name] !== undefined)
            return _params[dataType][type][name];
        if(_params[dataType][name] !== undefined)
            return _params[dataType][name];

        return 0;
    };

    /**
     *
     * @param dataType
     * @param type
     * @param name
     * @param value
     * @returns {*}
     */
    this.setParamValue = function(dataType, type, name, value){
        if(type == 'own' && _that.checkSetParam(name, value) === false)
            return _that.getParamValue(dataType, type, name);

        if(_params[dataType][type] !== undefined && _params[dataType][type][name] !== undefined)
            return _params[dataType][type][name] = value;

        if(_params[dataType][name] !== undefined)
            return _params[dataType][name] = value;

        return _that.getParamValue(dataType, type, name);
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param nameIn название параметра
     * @param valueIn значение
     * @return {*}
     * @private
     * Добавить параметры, которые требует предмет
     */
    var _itemAddNeed = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'need', nameIn);
        if (valueIn > currentValue)
            return _that.setParamValue(categoryIn, 'need', nameIn, valueIn);
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param nameIn название параметра
     * @param valueIn значение
     * @return {*}
     * @private
     * Добавить параметры, которые дает предмет
     */
    var _itemAddGive = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'give', nameIn);
        return _that.setParamValue(categoryIn, 'give', nameIn, currentValue + valueIn);
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param nameIn название параметра
     * @param valueIn значение
     * @return {*}
     * @private
     * Добавить параметры, которые требует предмет
     */
    var _paramAddNeed = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'need', nameIn);
        if (valueIn > currentValue)
            return _that.setParamValue(categoryIn, 'need', nameIn, valueIn);
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param nameIn название параметра
     * @param valueIn значение
     * @return {*}
     * @private
     * Добавить параметры, которые дает предмет
     */
    var _paramAddGive = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'give', nameIn);
        return _that.setParamValue(categoryIn, 'give', nameIn, currentValue + valueIn);
    };

    /**
     *
     * @param categoryIn
     * @param nameIn
     * @param valueIn
     * @return {*}
     * @private
     */
    var _paramAddOwn = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'own', nameIn);
        return _that.setParamValue(categoryIn, 'own', nameIn, currentValue + valueIn);
    };

    /**
     *
     * @param dataType stats, armor, mf etc.
     * @param type give, need, own
     * @param name critical, strange, agility etc.
     * @param value
     * @returns {*}
     */
    this.addParamValue = function(dataType, type, name, value){
        if(_params[dataType] === undefined)
            return 0;

        var _val = _that.getParamValue(dataType, type, name);
        _that.setParamValue(dataType, type, name, _val + value);

        return _val + value;
    };

    /**
     *
     * @param dataType stats, armor, mf etc.
     * @param type give, need, own
     * @param name critical, strange, agility etc.
     * @param value
     * @returns {*}
     */
    this.takeParamValue = function(dataType, type, name, value){
        if(_params[dataType] === undefined)
            return 0;

        var _val = _that.getParamValue(dataType, type, name);
        _that.setParamValue(dataType, type, name, _val - value);

        return _val - value;
    };

    /**
     *
     * @param name
     * @param value
     * @returns {boolean}
     */
    this.checkSetParam = function(name, value){
        if(_that.minValue[name] !== undefined && _that.minValue[name] > value) {
            message.simple('Невозможно задать значение параметра ' + value);
            return false;
        }

        if(_that.maxValue[name] !== undefined && _that.maxValue[name] < value) {
            message.simple('Невозможно задать значение параметра ' + value);
            return false;
        }

        switch (name) {
            case 'ap':
                var curLevel = _params['levelInfo']['own']['level'];
                if (levelGive[curLevel]['ap'] >= value)
                    return true;
                else
                    message.simple(value + ' АП не существует.');
                break;
            case 'level':
                if(levelGive[value] === undefined) {
                    message.simple('Уровень '+value+' не существует');
                    return false;
                } else
                    _params['levelInfo']['own']['ap'] = 0;
                return true;
                break;
            default:
                return true;
                break;
        }

        return false;
    };

    /**
     *
     * @param dataType категория параметров
     * @param type тип параметров
     * @return {*}
     * Получить группу параметров
     */
    this.getGroupParam = function (dataType, type) {
        if(type !== undefined)
            return _params[dataType][type];
        else
            return _params[dataType];
    };

    /**
     *
     * @return {{}}
     * Получить надетые вещи
     */
    this.getDummyItems = function() {
        return _dummyItems;
    };

    /**
     *
     * @return {number}
     * Получить стоимость надетых вещей
     */
    this.getAllCost = function () {
        var cost = 0;
        $.each(_dummyItems, function(category, info){
            if(info['price'] !== undefined
                && (info['price_reputation'] === undefined || !info['price_reputation']))
                cost += info['price'];
        });
        return cost;
    };

    /**
     *
     * @return {number}
     * Получить стоимость надетых вещей
     */
    this.getAllEkrCost = function () {
        var cost = 0;
        $.each(_dummyItems, function(category, info){
            if(info['price_ekr'] !== undefined
                && (info['price'] === undefined || !info['price'])
                && (info['price_reputation'] === undefined || !info['price_reputation']))
                cost += info['price_ekr'];
        });
        return cost;
    };

    /**
     *
     * @return {number}
     * Получить стоимость в репутации надетых вещей
     */
    this.getAllCostRepa = function () {
        var cost = 0;
        $.each(_dummyItems, function(category, info){
            if(info['price_reputation'] !== undefined && info['price_reputation'] > 0)
                cost += info['price_reputation'];
        });
        return cost;
    };

    /**
     *
     * @param name
     * @returns {boolean|*}
     */
    this.getMedal = function(name){
        return _params['medals'] !== undefined && _params['medals'][name] ? _params['medals'] !== undefined && _params['medals'][name]: false;
    };

    /**
     *
     * @return {number}
     * Получить всю массу надетых предметов
     */
    this.getAllMass = function () {
        var mass = 0;
        $.each(_dummyItems, function(category, info){
            if(info['weight'] !== undefined)
                mass += info['weight'];
        });
        return mass;
    };

    /**
     *
     * @param category
     * @param itemInfo
     * @param addArt
     * @param isProkat
     */
    this.setItem = function(category, itemInfo, addArt, isProkat){
        if(category == 'ax' || category == 'baton' || category == 'knife' || category == 'sword') {
            if(!$.isEmptyObject(_dummyItems['ax']))
                _that.unsetItem('ax');
            if(!$.isEmptyObject(_dummyItems['baton']))
                _that.unsetItem('baton');
            if(!$.isEmptyObject(_dummyItems['knife']))
                _that.unsetItem('knife');
            if(!$.isEmptyObject(_dummyItems['sword']))
                _that.unsetItem('sword');
        } else
            if(!$.isEmptyObject(_dummyItems[category]))
                _that.unsetItem(category);

        $.each(itemInfo['params_need'], function (type, item) {
            $.each(item, function (name, value) {
                _itemAddNeed(type, name, value);
            });
        });

        $.each(itemInfo['params_give'], function (type, item) {
            $.each(item, function (name, value) {
                _itemAddGive(type, name, value);
            });
        });

        _dummyItems[category] = $.extend(true, {}, itemInfo);
        if(addArt === true) {
            _dummyItems[category]['create_art'] = true;
            _dummyItems[category]['price_reputation'] = 600000;
            _dummyItems[category]['unique'] = true;
        }

        if(isProkat === true)
            _dummyItems[category]['chooseProkat'] = true;

        dummy.drawItem(category);
    };

    /**
     *
     * @param categoryIn
     */
    this.unsetItem = function(categoryIn){
        /**
         * Снимаем то, что трует вещь
         */
        $.each(_dummyItems[categoryIn]['params_need'], function (type, item) {
            $.each(item, function (name, value) {
                _takeItemParamNeed(categoryIn, type, name, value);
            });
        });
        /**
         * Снимаем то, что дает вещь
         */
        $.each(_dummyItems[categoryIn]['params_give'], function (type, item) {
            $.each(item, function (name, value) {
                _takeItemParamHave(type, name, value);
            });
        });
        _dummyItems[categoryIn] = {};

        dummy.emptyItem(categoryIn);
    };

    /**
     *
     * @param categoryIn категория вещи
     * @param nameIn название параметра
     * @param valueIn сколько снять
     * @return {*}
     * @private
     * Отнимает параметр, который дает предмет
     */
    var _takeItemParamHave = function(categoryIn, nameIn, valueIn) {
        var currantValue = _that.getParamValue(categoryIn, 'give', nameIn);
        return _that.setParamValue(categoryIn, 'give', nameIn, currantValue - valueIn);
    };

    /**
     *
     * @param categoryIn
     * @param nameIn
     * @param valueIn
     * @return {*}
     * @private
     */
    var _takeItemParamOwn = function(categoryIn, nameIn, valueIn) {
        var currantValue = _that.getParamValue(categoryIn, 'own', nameIn);
        return that.setParamValue(categoryIn, 'own', nameIn, currantValue - valueIn);
    };

    /**
     *
     * @param itemCategoryIn категория предмета
     * @param categoryIn категория параметра
     * @param nameIn название параметра
     * @param valueIn требуемое значение
     * @return {*}
     * @private
     * Уменьшаем требования по предметам, если требуется
     */
    var _takeItemParamNeed = function(itemCategoryIn, categoryIn, nameIn, valueIn) {
        var change = true;
        var max = 0;
        $.each(_dummyItems, function(category, item){
            if(is_empty(item) || category == itemCategoryIn)
                return true;
            if(item['params_need'][categoryIn][nameIn] > valueIn) {
                change = false;
                return false;
            } else if(item['params_need'][categoryIn][nameIn] >= max)
                max = item['params_need'][categoryIn][nameIn];
        });
        if(change)
            return _that.setParamValue(categoryIn, 'need', nameIn, max);
    };

    /**
     *
     * @param alignItem
     * @param alignFilter
     * @returns {boolean}
     */
    this.canSetItem = function(alignItem, alignFilter){
        return alignFilter == alignItem;
        switch (alignItem) {
            case 0:
                return true;
                break;
            default:
                return alignFilter == alignItem;
                break;
        }
    };

    /**
     *
     * @param dataType
     * @returns {*}
     */
    this.getItem = function(dataType){
        if(_dummyItems[dataType] !== undefined)
            return _dummyItems[dataType];

        return {};
    };

    /**
     *
     * @param align
     */
    this.changeAlign = function(align){
        var currAlign = _params['info']['align'];
        if(currAlign > 0) {
            $.each(_dummyItems, function(category, item){
                if(item['align'] == currAlign)
                    _that.unsetItem(category);
            });
        }

        _params['info']['align'] = align;
    };

    /**
     * Подгоняем статы
     */
    this.setCorrectStats = function() {
        $.each(_that.getGroupParam('stats', 'give'), function (statName, statValue) {
            var ownAndHave = currentContainer.getParamValue('stats', 'own', statName) + statValue;
            var need = currentContainer.getParamValue('stats', 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                _paramAddOwn('stats', statName, (-1)*diff);
        });

        $.each(_that.getGroupParam('possession', 'give'), function (statName, statValue) {
            var ownAndHave = currentContainer.getParamValue('possession', 'own', statName) + statValue;
            var need = currentContainer.getParamValue('possession', 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                _paramAddOwn('possession', statName, (-1)*diff);
        });

        $.each(_that.getGroupParam('levelInfo', 'own'), function (statName, statValue) {
            var need = currentContainer.getParamValue('levelInfo', 'need', statName);
            var diff = statValue - need;
            if (diff < 0)
                _paramAddOwn('levelInfo', statName, (-1)*diff);
        });
    };

    /**
     *
     * @param number
     */
    this.setDuh = function(number){
        var level = _params['levelInfo']['own']['level'];
        if(duhInfo[level] === undefined) {
            message.simple('Для вашего уровня не существует Духа Стойкости');
            return;
        }
        //if(_params['info']['duh'] > 0)
        //    _that.unsetDuh();

        //$.each(duhInfo[level], function(type, values){
        //    $.each(values, function(name, value){
        //        _that.setParamValue('duh', type, name, (value * number));
        //        _that.addParamValue(type, 'give', name, (value * number));
        //    });
        //});
        _params['info']['duh'] = number;
    };

    /**
     *
     */
    this.unsetDuh = function(){
        $.each(_that.getGroupParam('duh'), function(type, values){
            $.each(values, function(name, value){
                _that.setParamValue('duh', type, name, 0);
                _that.takeParamValue(type, 'give', name, value);
            });
        });
        _params['info']['duh'] = 0;
    };

    /**
     *
     * @param name
     * @param value
     */
    this.setMedal = function(name, value){
        if(_params['medals'] !== undefined && _params['medals'][name] !== undefined)
            _params['medals'][name] = value;
    };

    /**
     *
     * @param categoryIn категория предмета
     * @return {*}
     * Получить определенный предмет
     */
    this.getCurrItem = function(categoryIn) {
        return _dummyItems[categoryIn];
    };

    var _or = ['knife', 'ax', 'sword', 'baton'];
    this.getPossession = function(){
        var possession = 0;
        var possessionType = null;
        $.each(_or, function(i, name){
            if(!$.isEmptyObject(_dummyItems[name])) {
                possessionType = name;
                return false;
            }
        });

        if(possessionType !== null)
            possession = _that.getParamValue('possession', 'give', possessionType) + _that.getParamValue('possession', 'own', possessionType);

        return possession;
    };

    this.isWeapon = function(dataType){
        return dataType == 'knife' || dataType == 'sword' || dataType == 'ax' || dataType == 'baton';
    };

    this.isArt = function(dataType){
        return _dummyItems[dataType] !== undefined
            && _dummyItems[dataType]['create_art'] !== undefined
            && _dummyItems[dataType]['create_art'] === true;
    };

    this.isRune = function(dataType){
        return dataType == 'runa1' || dataType == 'runa2' || dataType == 'runa3';
    };

    this.isRing = function(dataType){
        return dataType == 'r1' || dataType == 'r2' || dataType == 'r3';
    };

    this.isEmpty = function(dataType){
        return $.isEmptyObject(_dummyItems[dataType]);
    };

    var __construct = function () {
        _that.setParams();
    }();
}