/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 16:15
 * To change this template use File | Settings | File Templates.
 */
function Container() {
    var _that = this;

    /**
     * Все параметры
     * @type {{}}
     * @private
     */
    var _params = {};

    /**
     * Вещи куклы
     * @type {{}}
     * @private
     */
    var _dummyItems = {};

    /**
     *
     * @param paramsIn новые параметры
     * Задать новые параметры или обнулить
     */
    this.setParams = function (paramsIn) {
        if (paramsIn === null || paramsIn === undefined) {
            _params = {
                stats: {
                    have: {
                        sila: 0,
                        lovka: 0,
                        inta: 0,
                        vinos: 0,
                        intel: 0,
                        mudra: 0
                    },
                    need: {
                        sila: 0,
                        lovka: 0,
                        inta: 0,
                        vinos: 0,
                        intel: 0,
                        mudra: 0
                    },
                    own: {
                        sila: 3,
                        lovka: 3,
                        inta: 3,
                        vinos: 3,
                        intel: 0,
                        mudra: 0
                    }
                },
                vlad: {
                    have: {
                        mech: 0,
                        nog: 0,
                        topor: 0,
                        dubina: 0
                    },
                    need: {
                        mech: 0,
                        nog: 0,
                        topor: 0,
                        dubina: 0
                    },
                    own: {
                        mech: 0,
                        nog: 0,
                        topor: 0,
                        dubina: 0
                    }
                },
                vladm: {
                    have: {
                        ogon: 0,
                        voda: 0,
                        vozduh: 0,
                        zemlya: 0,
                        svet: 0,
                        grey: 0,
                        tma: 0
                    },
                    need: {
                        ogon: 0,
                        voda: 0,
                        vozduh: 0,
                        zemlya: 0,
                        svet: 0,
                        grey: 0,
                        tma: 0
                    },
                    own: {
                        ogon: 0,
                        voda: 0,
                        vozduh: 0,
                        zemlya: 0,
                        svet: 0,
                        grey: 0,
                        tma: 0
                    }
                },
                mf: {
                    have: {
                        krit: 0,
                        pkrit: 0,
                        uvor: 0,
                        puvor: 0
                    }
                },
                other: {
                    have: {
                        hp: 0,
                        mp: 0,
                        minu: 0,
                        maxu: 0,
                        level: 0,
                        ap: 0
                    },
                    need: {
                        level: 0
                    }
                },
                bron: {
                    have: {
                        golova: 0,
                        korp: 0,
                        poyas: 0,
                        nogi: 0
                    }
                },
                unik: 0,
                usil: {
                    have: {
                        usil_uron: 0,
                        usil_max_mf: 0,
                        usil_bron: 0
                    }
                },
                medals:{
                    hero: false
                }
            }
        }
        else {
            _params = {};
            _params = $.extend(true, {}, paramsIn);
        }
    };

    /**
     * Получаем параметры куклы
     * @return {{}}
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
            _dummyItems = {
                ser:{},
                kl:{},
                or:{},
                br:{},
                fb:{},
                pl:{},
                r1:{},
                r2:{},
                r3:{},
                sh:{},
                pr:{},
                st:{},
                ob:{},
                runa1:{},
                runa2:{},
                runa3:{},
                topor:{},
                nog:{},
                mech:{},
                dubina:{}
            };
        } else {
            if(clone !== undefined && clone === true) {
                $.each(itemsIn, function(category, itemInArr){
                    if(category == 'nog' || category == 'dubina' || category == 'topor' || category == 'mech')
                        $('.player .or').attr('id', category);

                        _dummyItems[category] = $.extend(true, {}, itemInArr);
                        dummy.drawItem(category);
                });
            } else {
                $.each(itemsIn, function(category, itemInArr){
                    if(category == 'nog' || category == 'dubina' || category == 'topor' || category == 'mech')
                        $('.player .or').attr('id', category);

                    $.each(itemInArr, function(number, item){
                        _that.setItem(item, category, number);
                        dummy.drawItem(category);
                    });
                });
            }
        }
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
     * @param name
     */
    this.setMedal = function(name, value){
        if(_params['medals'] !== undefined && _params['medals'][name] !== undefined)
            _params['medals'][name] = value;
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
     * Подгоняем статы
     */
    this.setCorrectStats = function() {
        var tab = tabs.getCurrentTab();
        var haveParams = container[tab].getGroupParam('stats', 'have');
        $.each(haveParams, function (statName, statValue) {
            var ownAndHave = container[tab].getParamValue('stats', 'own', statName) + statValue;
            var need = container[tab].getParamValue('stats', 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                _paramAddOwn('stats', statName, (-1)*diff);
        });

        haveParams = container[tab].getGroupParam('vlad', 'have');
        $.each(haveParams, function (statName, statValue) {
            var ownAndHave = container[tab].getParamValue('vlad', 'own', statName) + statValue;
            var need = container[tab].getParamValue('vlad', 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                _paramAddOwn('vlad', statName, (-1)*diff);
        });

        haveParams = container[tab].getGroupParam('other', 'have');
        $.each(haveParams, function (statName, statValue) {
            var need = container[tab].getParamValue('other', 'need', statName);
            var diff = statValue - need;
            if (diff < 0)
                _paramAddHave('other', statName, (-1)*diff);
        });
    };

    /**
     * Добавить параметр
     * @param categoryIn Категория параметра
     * @param typeIn Тип параметра
     * @param nameIn Название параметра
     * @param valueIn Значение
     * @return {*}
     */
    this.paramAdd = function (categoryIn, typeIn, nameIn, valueIn) {
        if(typeIn == 'have')
            return _paramAddHave(categoryIn, nameIn, valueIn);
        else if(typeIn == 'own')
            return _paramAddOwn(categoryIn, nameIn, valueIn);
    };

    /**
     * Отнять параметра
     * @param categoryIn
     * @param typeIn
     * @param nameIn
     * @param valueIn
     * @return {*}
     */
    this.paramTake = function (categoryIn, typeIn, nameIn, valueIn) {
        if(typeIn == 'have')
            return _takeItemParamHave(categoryIn, nameIn, valueIn);
        else if(typeIn == 'own')
            return _takeItemParamOwn(categoryIn, nameIn, valueIn);
    };

    /**
     *
     * @param categoryIn
     * @param typeIn
     * @param nameIn
     * @param valueIn
     * @returns {*}
     */
    this.setParamValue = function(categoryIn, typeIn, nameIn, valueIn) {
        return _setParamValue(categoryIn, typeIn, nameIn, valueIn);
    };

    /**
     *
     * @param itemIn одеваемый предмет
     * @param categoryIn категория предмета
     * @param numberIn номер предмета в массиве
     * @param addGive используется при загрузке комплекта
     * @param addArt устанавливаем как арт
     * @return {*}
     * Одеть вещь на куклу
     */
    this.setItem = function (itemIn, categoryIn, numberIn, addGive, addArt) {
        /* Если вещь в этой категории одета, снимаем ее */
        if(categoryIn == 'nog' || categoryIn == 'mech' || categoryIn == 'dubina' || categoryIn == 'topor') {
            if(!is_empty(_dummyItems['nog']))
                _that.unsetItem('nog');
            else if(!is_empty(_dummyItems['mech']))
                _that.unsetItem('mech');
            else if(!is_empty(_dummyItems['dubina']))
                _that.unsetItem('dubina');
            else if(!is_empty(_dummyItems['topor']))
                _that.unsetItem('topor');
        } else if(!is_empty(_dummyItems[categoryIn]))
            _that.unsetItem(categoryIn);
        /* end */


        $.each(itemIn['params_need'], function (type, item) {
            $.each(item, function (name, value) {
                _paramAddNeed(type, name, value);
            });
        });
        if(addGive === undefined || addGive === null) {
            $.each(itemIn['params_give'], function (type, item) {
                $.each(item, function (name, value) {
                        _paramAddHave(type, name, value);
                });
            });
        }
        _dummyItems[categoryIn] = $.extend(true, {}, itemIn);
        _dummyItems[categoryIn]['id'] = numberIn;
        if(addArt === true) {
            _dummyItems[categoryIn]['create_art'] = true;
            _dummyItems[categoryIn]['repa_cost'] = 600000;
        }

        return categoryIn;
    };

    /**
     *
     * @param categoryIn категория вещи
     * Снять вещь с кукли
     */
    this.unsetItem = function(categoryIn) {
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
        var currantValue = _that.getParamValue(categoryIn, 'have', nameIn);
        return _setParamValue(categoryIn, 'have', nameIn, currantValue - valueIn);
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
        return _setParamValue(categoryIn, 'own', nameIn, currantValue - valueIn);
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
            return _setParamValue(categoryIn, 'need', nameIn, max);
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param typeIn тип параметра
     * @param nameIn название параметра
     * @return {*}
     * Получить определенный параметр кукли
     */
    this.getParamValue = function (categoryIn, typeIn, nameIn) {
        return _params[categoryIn][typeIn][nameIn];
    };

    /**
     *
     * @param categoryIn категория параметров
     * @param typeIn тип параметров
     * @return {*}
     * Получить группу параметров
     */
    this.getGroupParam = function (categoryIn, typeIn) {
        return _params[categoryIn][typeIn];
    };

    /**
     *
     * @param categoryIn категория параметра
     * @param typeIn тип параметра
     * @param nameIn название параметра
     * @param valueIn новое значение параметра
     * @return {*}
     * @private
     * Задать определенный параметр кукли
     */
    var _setParamValue = function (categoryIn, typeIn, nameIn, valueIn) {
        return _params[categoryIn][typeIn][nameIn] = valueIn;
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
            return _setParamValue(categoryIn, 'need', nameIn, valueIn);
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
    var _paramAddHave = function (categoryIn, nameIn, valueIn) {
        var currentValue = _that.getParamValue(categoryIn, 'have', nameIn);
        return _setParamValue(categoryIn, 'have', nameIn, currentValue + valueIn);
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
        return _setParamValue(categoryIn, 'own', nameIn, currentValue + valueIn);
    };

    /**
     *
     * @return {number}
     * Получить всю массу надетых предметов
     */
    this.getAllMass = function () {
        var mass = 0;
        $.each(_dummyItems, function(category, info){
            if(info['massa'] !== undefined)
                mass += info['massa'];
        });
        return mass;
    };

    /**
     *
     * @return {number}
     * Получить стоимость надетых вещей
     */
    this.getAllCost = function () {
        var cost = 0;
        $.each(_dummyItems, function(category, info){
            if(info['price'] !== undefined && (info['repa_cost'] === undefined || !info['repa_cost']))
                cost += info['price'];
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
            if(info['repa_cost'] !== undefined && info['repa_cost'] > 0)
                cost += info['repa_cost'];
        });
        return cost;
    };
}