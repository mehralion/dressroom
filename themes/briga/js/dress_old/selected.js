/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 26.12.12
 * Time: 19:06
 * To change this template use File | Settings | File Templates.
 */
function Selected(categoryIn) {
    var _that = this;
    var _item = {};
    var _itemId = null;
    var _itemCategory = null;
    var _mf = {
        hp: 0,
        stats: 0,
        bron:0
    };
    var _chooseStat = null;
    var _chooseMf = null;
    var _apInfo = {
        select: 0,
        apSelect:0,
        minu: 0,
        maxu: 0,
        hp: 0,
        bron: 0,
        stat: 0,
        mf: 0,
        iznos: 0
    };
    var _apInfoRune = {
        select: 0,
        apSelect:0,
        hp:0,
        stat:0,
        mf:0,
        minu:0,
        maxu:0,
        vlad:0,
        vladm:0,
        bron:0,
        stats:{
            sila:0,
            lovka:0,
            inta:0,
            intel:0,
            mudra:0
        },
        usil:{
            usil_bron:0,
            usil_max_mf:0,
            usil_uron:0
        }
    };
    var _podgonInfo = {
        select: 0,
        mf:0
    };
    var _changeMf = {
        krit:0,
        pkrit:0,
        uvor:0,
        puvor:0
    };
    var _changeStats = {
        sila:0,
        lovka:0,
        inta:0,
        intel:0,
        mudra:0
    };
    var _sharpen = {
        select:0,
        cost:0,
        params_give:{
            other: {
                minu: 0,
                maxu: 0
            }
        },
        params_need:{
            stats: {
                sila: 0,
                lovka: 0,
                inta: 0,
                vinos: 0,
                intel: 0,
                mudra: 0
            },
            vlad: {
                topor: 0,
                nog: 0,
                dubina: 0,
                mech: 0
            }
        }
    };
    var _StatsAvailable = {
        sila:false,
        lovka:false,
        inta:false
    };
    var _MfAvailable = {
        krit:false,
        pkrit:false,
        uvor:false,
        puvor: false
    };

    var _artSettings = {
        hp:0,
        bron:0,
        maxu:0,
        minu:0
    };
    var _usil = {
        1:'usil_bron',
        2:'usil_max_mf',
        3:'usil_uron'
    };
    var _chooseUsil = null;

    /**
     * Добавить хр от модификации
     * @param valIn
     */
    this.setHpMf = function (valIn) {
        _mf['hp'] = parseInt(valIn);
    };
    /**
     * Получить хр от модификации
     * @return {*}
     */
    this.getHpMf = function () {
        return _mf['hp'];
    };
    /**
     * Добавить статы от модификации
     * @param valIn
     */
    this.setStatsMf = function (valIn) {
        var _value = parseInt(valIn);
        if(_chooseStat !== null) {
            _changeStats[_chooseStat] -= _mf['stats'];
            _changeStats[_chooseStat] += _value;
        }
        _mf['stats'] = _value;
    };
    /**
     * Добавить бронь от МФ
     * @param valIn
     */
    this.setBronMf = function (valIn) {
        _mf['bron'] = parseInt(valIn);
    };
    /**
     * Получить статы от модификации
     * @return {*}
     */
    this.getStatsMf = function () {
        return _mf['stats']
    };
    /**
     * Получить бронь от МФ
     * @return {*}
     */
    this.getBronMf = function () {
        return _mf['bron']
    };
    /**
     * Утсановить ап
     * @param valIn
     */
    this.setAp = function (valIn) {
        var _val = parseInt(valIn);
        if(_apInfo['select'] > 0) {

            $.each(_changeMf, function(name, value){
                if(value - _apInfo['mf'] >= 0) {
                    _changeMf[name] = value - _apInfo['mf'];
                    return false;
                } else {
                    _changeMf[name] = 0;
                    _apInfo['mf'] -= value;
                }
            });
            $.each(_changeStats, function(name, value){
                if(value - _apInfo['stat'] >= 0) {
                    _changeStats[name] = value - _apInfo['stat'];
                    return false;
                } else {
                    _changeStats[name] = 0;
                    _apInfo['stat'] -= value;
                }
            });
        }
        _apInfo = {
            select: 0,
            minu: 0,
            maxu: 0,
            hp: 0,
            bron: 0,
            stat: 0,
            mf: 0,
            iznos: 0,
            apSelect:0
        };
        if (_val > 0) {
            var originalItem = items.getCurrItem(_itemCategory, _itemId);
            var level = originalItem['params_need']['other']['level'];
            $.each(apInfo, function (number, info) {
                if (info['level'] > level && number <= _val) {
                    $.each(info, function (name, value) {
                        if (name != 'level')
                            _apInfo[name] += value;
                    });
                    _apInfo['apSelect']++;
                }
            });
            if(_chooseStat !== null)
                _changeStats[_chooseStat] += _apInfo['stat'];
            if(_chooseMf !== null)
                _changeMf[_chooseMf] += _apInfo['mf'];
        }
        _apInfo['select'] = _val;
    };
    /**
     * Получить ап
     * @return {*}
     */
    this.getAp = function() {
        return _apInfo['select'];
    };
    /**
     * Получаем кол-во апов, а не номер апа
     * @return {*}
     */
    this.getSetAp = function() {
        return _apInfo['apSelect'];
    };
    /**
     * Минимальный урон от апов
     * @return {*}
     */
    this.getApMinu = function() {
        return _apInfo['minu'];
    };
    /**
     * Максимальный урон от апов
     * @return {*}
     */
    this.getApMaxu = function() {
        return _apInfo['maxu'];
    };
    /**
     * Получить бронь от апов
     * @return {*}
     */
    this.getApBron = function() {
        return _apInfo['bron'];
    };
    this.getApRune = function() {
        return _apInfoRune['select'];
    };
    /**
     * Утсановить ап
     * @param valIn
     */
    this.setApRune = function (valIn) {
        var _val = parseInt(valIn);
        if(_apInfoRune['select'] > 0) {

            $.each(_changeMf, function(name, value){
                if(value - _apInfoRune['mf'] >= 0) {
                    _changeMf[name] = value - _apInfoRune['mf'];
                    return false;
                } else {
                    _changeMf[name] = 0;
                    _apInfoRune['mf'] -= value;
                }
            });
            $.each(_changeStats, function(name, value){
                if(value - _apInfoRune['stat'][name] >= 0) {
                    _changeStats[name] = value - _apInfoRune['stat'][name];
                    return false;
                } else {
                    _changeStats[name] = 0;
                    _apInfoRune['stat'][name] -= value;
                }
            });
        }
        _apInfoRune = {
            select: 0,
            apSelect:0,
            hp:0,
            stat:0,
            mf:0,
            minu:0,
            maxu:0,
            vlad:0,
            vladm:0,
            bron:0,
            stats:{
                sila:0,
                lovka:0,
                inta:0,
                intel:0,
                mudra:0
            },
            usil:{
                usil_bron:0,
                usil_max_mf:0,
                usil_uron:0
            }
        };
        if (_val > 0) {
            $.each(runes, function (number, info) {
                if (number <= _val) {
                    $.each(info, function (name, value) {
                        switch (name) {
                            case 'stats':
                                $.each(value, function(stat, valueStat){
                                    _apInfoRune['stats'][stat] += valueStat;
                                });
                                break;
                            case 'usil':
                                $.each(value, function(usil, valueUsil){
                                    if(_item['enabled_rune_'+usil]) {
                                        _apInfoRune['usil'][usil] += valueUsil;
                                    }
                                });
                                break;
                            default :
                                _apInfoRune[name] += value;
                                break;
                        }
                    });
                }
            });
        }
        _apInfoRune['select'] = _val;
    };

    /**
     * Получаем определенный параметр
     * @param param
     * @returns {*}
     */
    this.getApRuneParam = function(param){
        return _apInfoRune[param] !== undefined ? _apInfoRune[param] : 0;
    };

    this.getApRuneSubGroup = function(group, param){
        return _apInfoRune[group][param] !== undefined ? _apInfoRune[group][param] : 0;
    };

    /**
     * Очистить добавленные статы и МФ
     * @private
     */
    var _clearChanges = function() {
        _changeMf = {
            krit:0,
            pkrit:0,
            uvor:0,
            puvor:0
        };
        _changeStats = {
            sila:0,
            lovka:0,
            inta:0,
            intel:0,
            mudra:0
        };
    };
    /**
     * Подогнать вещь
     * @param valIn
     */
    this.setPodgon = function (valIn) {
        var _val = parseInt(valIn);
        if(_podgonInfo['select'] > 0) {
            $.each(_changeMf, function(name, value){
                if(value - _podgonInfo['mf'] >= 0) {
                    _changeMf[name] = value - _podgonInfo['mf'];
                    return false;
                } else {
                    _changeMf[name] = 0;
                    _podgonInfo['mf'] -= value;
                }
            });
        }
        _podgonInfo = {
            select:0,
            mf:0
        };
        if(_val > 0) {
            $.each(podgonInfo, function(i, item){
                if(i <= _val)
                    _podgonInfo['mf'] += item['mf'];
            });
            if(_chooseMf !== null)
                _changeMf[_chooseMf] += _podgonInfo['mf'];
        }
        _podgonInfo['select'] = _val;
    };
    /**
     * Добавить заточку
     * @param valIn
     */
    this.setSharpen = function (valIn) {
        var _val = parseInt(valIn);
        _sharpen = {
            select:0,
            cost:0,
            params_give:{
                other: {
                    minu: 0,
                    maxu: 0
                }
            },
            params_need:{
                stats: {
                    sila: 0,
                    lovka: 0,
                    inta: 0,
                    vinos: 0,
                    intel: 0,
                    mudra: 0
                },
                vlad: {
                    topor: 0,
                    nog: 0,
                    dubina: 0,
                    mech: 0
                }
            }
        };
        if(_val > 0) {
            var item = sharpenInfo[_itemCategory];
            for(var i = 1; i<=_val; i++) {
                _sharpen['cost'] += item['cost'];
                $.each(item['params_give'], function(category, itemIn){
                    $.each(itemIn, function(name, value){
                        _sharpen['params_give'][category][name] += value;
                    });
                });
                $.each(item['params_need'], function(category, itemIn){
                    $.each(itemIn, function(name, value){
                        _sharpen['params_need'][category][name] += value;
                    });
                });
            }
        }
        _sharpen['select'] = _val;
    };
    /**
     * Получить накидку за заточку
     * @return {*}
     */
    this.getSharpenCost = function() {
        return _sharpen['cost'];
    };
    /**
     * Получить параметры заточки
     * @param type
     * @return {*}
     */
    this.getSharpenParams = function(type) {
        return _sharpen[type];
    };
    /**
     * Получить подгон, номер
     * @return {*}
     */
    this.getPodgon = function () {
        return _podgonInfo['select'];
    };
    /**
     * Получить заточку
     * @return {*}
     */
    this.getSharpen = function () {
        return _sharpen['select'];
    };
    /**
     * Получить минимальный урон
     * @return {*}
     */
    this.getSharpenMinu = function() {
        return _sharpen['params_give']['other']['minu'];
    };
    /**
     * Получить максимальный урон
     * @return {*}
     */
    this.getSharpenMaxu = function() {
        return _sharpen['params_give']['other']['maxu'];
    };
    /**
     * Уровень вещи
     * @return {*}
     */
    this.getItemLevel = function () {
        return _item['params_need']['other']['level'];
    };
    /**
     * хр добавленное от апа
     * @return {*}
     */
    this.getApHp = function() {
        return _apInfo['hp'];
    };
    /**
     * Получить кол-во возможных распределений статов
     * @return {number}
     */
    this.getSetStats = function () {
        var alreadySet = 0;
        $.each(_changeStats, function(name, value){
            alreadySet += value;
        });
        var art = 0;
        if(_that.isArt())
            art = artGive['stats'];
        var add = 0;
        if(!_that.isWeapon())
            add = _that.getStatsMf() + art + _apInfo['stat'] + _apInfoRune['stat'] - alreadySet;
        else
            add = art - alreadySet;
        return add;
    };
    /**
     * Получить кол-во возможных распределений мф
     * @return {number}
     */
    this.getSetMF = function() {
        var alreadySet = 0;
        $.each(_changeMf, function(name, value){
            alreadySet += value;
        });
        var art = 0;
        if(_that.isArt())
            art = artGive['mf'];
        var add = 0;
        if(!_that.isWeapon())
            add = _apInfo['mf'] + art + _podgonInfo['mf'] + _apInfoRune['mf'] - alreadySet;
        else
            add = art - alreadySet;
        return add;
    };
    /**
     * Получить установленные МФ
     * @param paramIn
     * @return {*}
     */
    this.getChangeMF = function (paramIn) {
        if(paramIn === undefined || paramIn === null)
            return _changeMf;
        else
            return _changeMf[paramIn];
    };
    /**
     * Распределить модификаторы
     * @param statIn название параметра
     * @param valueIn значение
     */
    this.changeMf = function (statIn, valueIn) {
        var _val = parseInt(valueIn);
        var _mfCount = _that.getSetMF();
        if(isNaN(_val) && _val < 0)
            return;

        if(_mfCount - _val < 0 || _val == 0) {
            if(_val - _changeMf[statIn] < 0)
                _changeMf[statIn] = _val;
            else
                _changeMf[statIn] += _mfCount;
        } else {
            if(_mfCount - _val == 0)
                _changeMf[statIn] += _mfCount;
            else
                _changeMf[statIn] = _val;
        }
        return;

        if (_mfCount - _val >= 0) {
            if(_val - _changeMf[statIn] > 0)
                _changeMf[statIn] = _val;
            else if(_val - _changeMf[statIn] < 0)
                _changeMf[statIn] = _val;
        } else if(_mfCount - _val < 0) {
            if(_val - _changeMf[statIn] < 0)
                _changeMf[statIn] = _val;
            else
                _changeMf[statIn] += _mfCount;
        }
    };
    /**
     * Распределить статы
     * @param nameIn  название стата
     * @param valueIn  на сколько повышаем
     */
    this.statAdd = function (nameIn, valueIn) {
        var val = parseInt(valueIn);
        var available = _that.getSetStats();
        if (available > 0)
            _changeStats[nameIn] += val;
    };
    /**
     * Убрать статы
     * @param nameIn название стата
     * @param valueIn на сколько понижаем
     */
    this.statTake = function (nameIn, valueIn) {
        var val = parseInt(valueIn);
        if (_changeStats[nameIn] - val >= 0)
            _changeStats[nameIn] -= val;
    };
    /**
     * Получить расскиданные статы
     * @param paramIn
     * @return {*}
     */
    this.getChangeStats = function(paramIn) {
        if(paramIn === undefined || paramIn === null)
            return _changeStats;
        else
            return _changeStats[paramIn];
    };
    /**
     * Конец изменений, устанавливаем вещь на куклу
     */
    this.setItem = function() {
        /* Устанавливаем статы */
        $.each(_changeStats, function(name, value){
            _item['params_give']['stats'][name] += value;
        });
        /* end */
        /* Устанавливаем модификаторы */
        $.each(_changeMf, function(name, value){
            _item['params_give']['mf'][name] += value;
        });
        /* end */
        /* устанавливаем хр */
        if(_item['params_give']['other']['hp'] > 0 || _that.isArt())
            _item['params_give']['other']['hp'] += _that.getHpMf() + _that.getApHp() + _that.getArtHp();
        /* end */
        /* устанавливаем бронь */
        var apBron = _that.getApBron();
        $.each(_item['params_give']['bron'], function(name, value){
            var mfBron = value == 0 ? 0 :_that.getBronMf();
            if(value > 0 || _that.isArt()) {
                var art = 0;
                if (_that.isArt()) {
                    art = _that.getArtBron();
                    if (value == 0 && art == 0)
                        return;
                }
                _item['params_give']['bron'][name] += art + apBron + mfBron;
            }
        });
        /* end */
        /* устанавливаем износ */
        /* end */
        /* новые требования, если ап */
        var ap = _apInfo['apSelect'];
        if(ap > 0) {
            _item['params_need']['other']['level'] = apInfo[_apInfo['select']]['level'];
            $.each(_item['params_need']['stats'], function(name, value){
                if(value > 0)
                    _item['params_need']['stats'][name] += ap;
            });
            $.each(_item['params_need']['vlad'], function(name, value){
                if(value > 0)
                    _item['params_need']['vlad'][name] += ap;
            });
        }

        /* Руна */
        var runa = _that.getApRune();
        if(runa > 0) {
            _item['params_give']['other']['hp'] += _that.getApRuneParam('hp');
            $.each(_apInfoRune['stats'], function(name, value){
                if(value > 0)
                    _item['params_give']['stats'][name] += value;
            });
            var vlad = _that.getApRuneParam('vlad');
            if(vlad > 0) {
                $.each(_item['params_give']['vlad'], function(name, value){
                    _item['params_give']['vlad'][name] += vlad;
                });
            }
            var vladm = _that.getApRuneParam('vladm');
            if(vladm > 0) {
                $.each(_item['params_give']['vladm'], function(name, value){
                    _item['params_give']['vladm'][name] += vladm;
                });
            }
            var bron = _that.getApRuneParam('bron');
            if(bron > 0) {
                $.each(_item['params_give']['bron'], function(name, value){
                    _item['params_give']['bron'][name] += bron;
                });
            }
            $.each(_item['params_give']['usil'], function(name, value){
                var usil = _that.getApRuneSubGroup('usil', name);
                if(usil > 0 && _item['enabled_rune_'+name])
                    _item['params_give']['usil'][name] += usil;
            });

            _item['params_give']['other']['minu'] = _that.getApRuneParam('minu');
            _item['params_give']['other']['maxu'] = _that.getApRuneParam('maxu');
        }
        /* end */

        /* end */
        /* устанавливаем урон, если оружие */
        if(_that.isWeapon() || _that.isArt()) {
            _item['price'] += _sharpen['cost'];
            var uronMax = _that.getSharpenMaxu() + _that.artMax();
            var uronMin = _that.getSharpenMinu() + _that.artMin();
            if(_itemCategory == 'nog' || _itemCategory == 'mech' || _itemCategory == 'dubina' || _itemCategory == 'topor') {
                uronMax += _that.getApMaxu();
                uronMin += _that.getApMinu();
            }
            _item['params_give']['other']['maxu'] += uronMax;
            _item['params_give']['other']['minu'] += uronMin;
            $.each(_sharpen['params_need'], function(category, itemIn){
                $.each(itemIn, function(name, value){
                    if(value > 0)
                        _item['params_need'][category][name] += value;
                });
            });
        }
        /* end */
        /* устанавливаем цену, если были подгоны */
        var podgon = _that.getPodgon();
        if(podgon > 0) {
            $.each(podgonInfo, function (i, info) {
                if (i <= podgon)
                    _item['price'] += Math.round(_item['price'] * info['cost']);
            });
        }
        /* end */
        /*if(_chooseUsil !== null) {
            switch(_chooseUsil){
                case '1':
                    _item['params_give']['usil']['usil_bron'] = 10;
                    break;
                case '2':
                    _item['params_give']['usil']['usil_max_mf'] = 5;
                    break;
                case '3':
                    _item['params_give']['usil']['usil_max_mf'] = 3;
                    _item['params_give']['usil']['usil_uron'] = 1;
                    break;
            }
        }*/
        _writeSettings();
        var category = container[tabs.getCurrentTab()].setItem(_item, _itemCategory, _itemId); // вешаем вещь
        dummy.drawItem(category);
    };
    /**
     * Получить выбранную вещь
     * @return {{}}
     */
    this.getItem = function() {
        return _item;
    };
    /**
     * Получить номер одетой вещи в массиве
     * @return {null}
     */
    this.getItemId = function() {
        return _itemId;
    };
    /**
     * Записать настройки для дальнейшего зименения вещи
     * @private
     */
    var _writeSettings = function() {
        _item['settings'] = {
            mf:_mf,
            apInfo:_apInfo,
            podgonInfo:_podgonInfo,
            changeMf:_changeMf,
            changeStats:_changeStats,
            sharpen:_sharpen,
            artSettings:_artSettings,
            usil:_chooseUsil,
            apRuna:_apInfoRune
        };
    };
    /**
     * Прочитать настройки надетой вещи
     * @private
     */
    var _readSettings = function() {
        if(_item['settings'] !== undefined) {
            var art = false;
            _mf = _item['settings']['mf'];
            _apInfo = _item['settings']['apInfo'];
            _apInfoRune = _item['settings']['apRuna'];
            _podgonInfo = _item['settings']['podgonInfo'];
            _changeMf = _item['settings']['changeMf'];
            _changeStats = _item['settings']['changeStats'];
            _sharpen = _item['settings']['sharpen'];
            _artSettings = _item['settings']['artSettings'];
            _chooseUsil = _item['settings']['usil'];
            if(_item['create_art'])
                art = true;
            _item = {};
            _item = $.extend(true, {}, items.getCurrItem(_itemCategory, _itemId));
            if(art)
                _item['create_art'] = true;
        } else {
            if(_item['create_art'] === true) {
                if(!_that.isWeapon())
                    _that.setPodgon(5);
                _artSettings = {
                    hp:artGive['hp'],
                    bron:artGive['bron'],
                    maxu: artGive['maxu'],
                    minu: artGive['minu']
                };
                if(_that.isWeapon()) {
                    _artSettings['maxu'] += artGive['wmaxu'];
                    _artSettings['minu'] += artGive['wminu'];
                };
            }
        }
        /**
         * Если арт и первое открытие, устанавливаем по дефолту значения
         */
        if(_item['create_art'] === true) {
            if(_that.canSetHP())
                _that.setHpMf(20);
            if(_that.canSetBron())
                _that.setBronMf(3);
            if(_that.canSetStats())
                _that.setStatsMf(3);
            _that.setChooseUsil(_chooseUsil, true);
        }
    };

    /**
     * Тип вещи оружие\вещь
     * @return {boolean}
     */
    this.isWeapon = function() {
        if(_itemCategory == 'nog'
            || _itemCategory == 'mech'
            || _itemCategory == 'topor'
            || _itemCategory == 'dubina')
            return true;
        else
            return false;
    };
    /**
     * Арт ли вещь?
     * @return {boolean}
     */
    this.isArt = function() {
        if(_item['create_art'] == true)
            return true;
        else
            return false;
    };
    /**
     * Максимальный урон, который дает арт
     * @return {*}
     */
    this.artMax = function() {
        return _artSettings['maxu'];
    };
    /**
     * Минимальный урон, который дает арт
     * @return {*}
     */
    this.artMin = function() {
        return _artSettings['minu'];
    };
    /**
     * Сколько брони дает арт?
     * @return {*}
     */
    this.getArtBron = function() {
        return _artSettings['bron'];
    };
    /**
     * Арт хр
     * @return {*}
     */
    this.getArtHp = function() {
        return _artSettings['hp'];
    };
    /**
     * Добавляем хр арту за счет брони
     * @param valIn
     */
    this.addArtHP = function(valIn) {
        _artSettings['hp'] = valIn;
        _artSettings['bron'] = (65 - valIn)/5;
    };
    /**
     * Увеличиваем бронь за счет снижения хп
     * @param valIn
     */
    this.takeArtHP = function(valIn) {
        _artSettings['hp'] = valIn;
        _artSettings['bron'] = (65 - valIn)/5;
    };
    /**
     * Ограничение на уровне БД
     * @return {boolean}
     */
    this.canMF = function() {
        if(_item['can_mf'])
            return true;
        else
            return false;
    };
    /**
     * Ограничение на уровне БД
     * @return {boolean}
     */
    this.canAp = function() {
        if(_item['can_ap'])
            return true;
        else
            return false;
    };
    /**
     * Ограничение на уровне БД
     * @return {boolean}
     */
    this.canPodgon = function() {
        if(_item['can_podgon'])
            return true;
        else
            return false;
    };
    /**
     * Можно ли добавить бронь, используется при МФ, в основном
     * @return {boolean}
     */
    this.canSetBron = function() {
        var can = false;
        $.each(_item['params_give']['bron'], function(name, value){
            if(value > 0) {
                can = true;
                return false;
            }
        });
        return can;
    };
    /**
     * Можно ли добавить МФ вещи
     * @return {boolean}
     */
    this.canSetMF = function() {
        var can = false;
        $.each(_item['params_give']['mf'], function(name, value){
            if(value > 0) {
                can = true;
                return false;
            }
        });
        if((_that.canAp() || _that.canPodgon()) && can)
            return true;
        else
            return false;
    };

    /**
     *
     * @returns {number}
     */
    this.getAvailableFieldCount = function(type){
        var count = 0;
        $.each(_item['params_give'][type], function(name, value){
            if(value > 0 || (_apInfoRune[type] !== undefined && _apInfoRune[type][name] !== undefined && _apInfoRune[type][name] > 0)) {
                count++;
            }
        });
        return count;
    };

    /**
     *
     * @returns {string}
     */
    this.getAvailableField = function(type){
        var fieldName = '';
        $.each(_item['params_give'][type], function(name, value){
            if(value > 0 || (_apInfoRune[type] !== undefined && _apInfoRune[type][name] !== undefined && _apInfoRune[type][name] > 0)) {
                fieldName = name;
                return false;
            }
        });
        return fieldName;
    };
    /**
     * Можно ли добавить вещи статы
     * @return {boolean}
     */
    this.canSetStats = function() {
        var can = false;
        $.each(_item['params_give']['stats'], function(name, value){
            if(value > 0) {
                can = true;
                return false;
            }
        });
        if((_that.canAp() || _that.canMF()) && can)
            return true;
        else
            return false;
    };
    /**
     * Можно ли добавить вещи ХР
     * @return {boolean}
     */
    this.canSetHP = function() {
        var can = false;
        if(_item['params_give']['other']['hp'] > 0)
            can = true;
        return can;
    };
    /**
     * Вроде уже не использую
     * @return {{sila: boolean, lovka: boolean, inta: boolean}}
     */
    this.getAvailableStats = function() {
        $.each(_item['params_give']['stats'], function(name, value){
            if(value > 0 && _StatsAvailable[name] !== undefined || _item['create_art'])
                _StatsAvailable[name] = true;
        });
        return _StatsAvailable;
    };
    /**
     * Вроде уже не использую
     * @return {{krit: boolean, pkrit: boolean, uvor: boolean, puvor: boolean}}
     */
    this.getAvailableMf = function() {
        $.each(_item['params_give']['mf'], function(name, value){
            if(value > 0 && _MfAvailable[name] !== undefined || _item['create_art'])
                _MfAvailable[name] = true;
        });
        return _MfAvailable;
    };
    /**
     * Выбираем для авто, куда кидать
     * @param valueIn
     */
    this.setChooseStat = function(valueIn) {
        _chooseStat = valueIn;
        if(valueIn !== null)
            _changeStats[_chooseStat] += _that.getSetStats();
    };
    /**
     * Выбираем для авто, куда кидать МФ
     * @param valueIn
     */
    this.setChooseMf = function(valueIn) {
        _chooseMf = valueIn;
        if(valueIn !== null)
            _changeMf[_chooseMf] += _that.getSetMF();
    };
    /**
     * Куда кидать статы
     * @return {null}
     */
    this.getChooseStat = function() {
        return _chooseStat;
    };
    /**
     * Куда кидать МФ
     * @return {null}
     */
    this.getChooseMf = function() {
        return _chooseMf;
    };
    /**
     * Устанавливаем усиление
     * @param valueIn
     */
    this.setChooseUsil = function(valueIn, force) {
        if(_chooseUsil !== null && force === undefined && force !== true) {
            switch(_chooseUsil){
                case 1:
                    _item['params_give']['usil']['usil_bron'] -= 10;
                    break;
                case 2:
                    _item['params_give']['usil']['usil_max_mf'] -= 5;
                    break;
                case 3:
                    _item['params_give']['usil']['usil_max_mf'] -= 3;
                    _item['params_give']['usil']['usil_uron'] -= 1;
                    break;
            }
        }
        _chooseUsil = valueIn;
        switch(_chooseUsil){
            case 1:
                _item['params_give']['usil']['usil_bron'] += 10;
                break;
            case 2:
                _item['params_give']['usil']['usil_max_mf'] += 5;
                break;
            case 3:
                _item['params_give']['usil']['usil_max_mf'] += 3;
                _item['params_give']['usil']['usil_uron'] += 1;
                break;
        }
    };

    /**
     *
     * @param typeIn stats|mf
     */
    this.getSetField = function(typeIn){
        var returned = [];
        $.each(_item['params_give'][typeIn], function(name, value){
            if(value > 0 || _item['create_art'])
                returned.push(name);
        });
        return returned;
    };

    /**
     * Получаем усилене
     * @return {null}
     */
    this.getChooseUsil = function() {
        return _chooseUsil;
    };
    this.setUnik = function() {
        if(_that.canSetHP())
            _that.setHpMf(20);
        if(_that.canSetStats())
            _that.setStatsMf(3);
        if(_that.canSetBron())
            _that.setBronMf(3);
    };
    this.setTop = function() {
        if(_that.canSetHP())
            _that.setHpMf(20);
        if(_that.canSetStats())
            _that.setStatsMf(2);
        if(_that.canSetBron())
            _that.setBronMf(3);
    };
    var __construct = function (categoryPassed) {
        _item = $.extend(true, {}, container[tabs.getCurrentTab()].getCurrItem(categoryPassed));
        _itemCategory = categoryPassed;
        _itemId = _item['id'];
        _readSettings(); //Читаем настройки
    }(categoryIn);
}