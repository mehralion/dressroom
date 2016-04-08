/**
 * Created by Николай on 05.06.14.
 */
function Selected(item, dataType)
{
    var _item = null;
    var _itemOld = null;

    var _dataType;

    var _that = this;

    var _availableStats = 0;
    var _availableMF = 0;

    var _artBonus = {
        hp: 0,
        armor: 0
    };
    var _mfInfo = {
        hp      : 0,
        stats   : 0,
        armor   : 0
    };
    var _mfLimit = {
        hp      : 20,
        stats   : 3,
        armor   : 3
    };

    var _apNumber = 0;
    var _podgonNumber = 0;
    var _sharpenNumber = 0;
    var _increasedNumber = 0;

    /**
     *
     * @private
     */
    var _calculatePrice = function(){
        _item['price'] = _itemOld['price'];

        if(_that.getIsMF())
            _item['price'] += Math.round(_item['price'] / 2);

        if(_sharpenNumber > 0)
            _item['price'] += _sharpenNumber * 6;

        $.each(podgonInfo, function(i, info){
            if(_podgonNumber >= i)
                _item['price'] += Math.round(_item['price'] * info['cost']);
        });
    };

    /**
     *
     * @returns {boolean|*}
     */
    this.canSetMF = function(){
        var can = false;
        $.each(_item['params_give']['mf'], function(name, value){
            if(value > 0)
                can = true;
        });

        return can && !currentContainer.isWeapon(_dataType);
    };

    /**
     *
     * @returns {boolean|*}
     */
    this.canSetStats = function(){
        var can = false;
        $.each(_item['params_give']['stats'], function(name, value){
            if(value > 0)
                can = true;
        });

        return can && !currentContainer.isWeapon(_dataType);
    };

    /**
     *
     * @returns {boolean|*}
     */
    this.canSetHP = function(){
        return _item['params_give']['other']['hp'] > 0 && !currentContainer.isWeapon(_dataType);
    };

    /**
     *
     * @returns {boolean|*}
     */
    this.canSetArmor = function(){
        var can = false;
        $.each(_item['params_give']['armor'], function(name, value){
            if(value > 0)
                can = true;
        });

        return can && !currentContainer.isWeapon(_dataType);
    };

    /**
     *
     * @returns {boolean|*}
     */
    this.canSetDamage = function(){
        var can = false;
        $.each(_item['params_give']['damage'], function(name, value){
            if(value > 0)
                can = true;
        });

        return can;
    };

    /**
     *
     * @param dataType
     */
    this.changeFromArt = function(dataType){
        switch (dataType) {
            case 'set':
                _artBonus['hp'] += 50;
                _artBonus['armor'] += 3;

                _item['params_give']['other']['hp'] += 50;
                $.each(_item['params_give']['armor'], function(name, value){
                    _item['params_give']['armor'][name] += 3;
                });
                break;
            case 'hp':
                if(_artBonus['armor'] - 1 >= 0) {
                    _artBonus['hp'] += 5;
                    _artBonus['armor'] -= 1;

                    _item['params_give']['other']['hp'] += 5;
                    $.each(_item['params_give']['armor'], function(name, value){
                        _item['params_give']['armor'][name] -= 1;
                    });
                }
                break;
            case 'armor':
                if(_artBonus['hp'] - 5 >= 0) {
                    _artBonus['hp'] -= 5;
                    _artBonus['armor'] += 1;

                    _item['params_give']['other']['hp'] -= 5;
                    $.each(_item['params_give']['armor'], function(name, value){
                        _item['params_give']['armor'][name] += 1;
                    });
                }
                break;
        }
    };

    /**
     *
     * @returns {*}
     */
    this.getHPfromArt = function(){
        return _artBonus['hp'];
    };

    /**
     *
     * @param dataType
     * @param value
     * @returns {*}
     */
    this.setFromMF = function(dataType, value) {
        if(_mfLimit[dataType] === undefined)
            return 0;
        if(_mfLimit[dataType] < value || value < 0)
            return _mfInfo['give'][dataType];

        _unsetFromMF(dataType);

        switch (dataType) {
            case 'hp':
                if(_that.canSetHP())
                    _item['params_give']['other']['hp'] += value;
                break;
            case 'stats':
                if(_that.canSetStats()) {
                    _availableStats += value;
                    if(value == 3)
                        _item['unique'] = true;
                }
                break;
            case 'armor':
                if(_that.canSetArmor()) {
                    $.each(_item['params_give']['armor'], function(armorName, armorValue){
                        if(armorValue > 0)
                            _item['params_give']['armor'][armorName] += value;
                    });
                }
                break;
        }

        _mfInfo[dataType] = value;
        _calculatePrice();

        return _mfInfo[dataType];
    };

    /**
     *
     * @param dataType
     * @private
     */
    var _unsetFromMF = function(dataType){
        switch (dataType) {
            case 'hp':
                if(_that.canSetHP())
                    _item['params_give']['other']['hp'] -= _mfInfo['hp'];
                break;
            case 'stats':
                if(_that.canSetStats()) {
                    $.each(_itemOld['params_give']['stats'], function(statName, statValue){
                        _availableStats += (_item['params_give']['stats'][statName] - statValue);
                        _item['params_give']['stats'][statName] = statValue;
                    });
                    _availableStats -= _mfInfo['stats'];
                    _item['unique'] = false;
                }
                break;
            case 'armor':
                if(_that.canSetArmor()) {
                    $.each(_item['params_give']['armor'], function(armorName, armorValue){
                        if(armorValue > 0)
                            _item['params_give']['armor'][armorName] -= _mfInfo['armor'];
                    });
                }
                break;
        }
        _mfInfo[dataType] = 0;
    };

    /**
     *
     * @returns {{hp: number, stats: number, armor: number}}
     */
    this.getFormMF = function(){
        return _mfInfo;
    };

    /**
     *
     * @returns {boolean}
     */
    this.getIsMF = function(){
        var isMF = false;
        $.each(_mfInfo, function(name, value){
            if(value > 0)
                isMF = true;
        });

        return isMF;
    };

    /**
     *
     * @returns {*}
     */
    this.getHPfromMF = function(){
        return _mfInfo['hp'];
    };

    /**
     *
     * @returns {number}
     */
    this.getSelectedSharpen = function(){
        return _sharpenNumber;
    };

    this.setSharpen = function(number){
        if(sharpenInfo[_dataType] === undefined)
            return _sharpenNumber;

        _that.unsetSharpen();
        for(var i = 1; i <= number; i++) {
            $.each(sharpenInfo[_dataType]['params_need'], function(type, values){
                $.each(values, function(name, value){
                    if(value > 0)
                        _item['params_need'][type][name] += value;
                });
            });

            $.each(sharpenInfo[_dataType]['params_give'], function(type, values){
                $.each(values, function(name, value){
                    if(value > 0)
                        _item['params_give'][type][name] += value;
                });
            });
        }
        _sharpenNumber = number;
        _calculatePrice();

        return _sharpenNumber;
    };

    this.unsetSharpen = function(){
        for(var i = 1; i <= _sharpenNumber; i++) {
            $.each(sharpenInfo[_dataType]['params_need'], function(type, values){
                $.each(values, function(name, value){
                    if(value > 0)
                        _item['params_need'][type][name] -= value;
                });
            });

            $.each(sharpenInfo[_dataType]['params_give'], function(type, values){
                $.each(values, function(name, value){
                    if(value > 0)
                        _item['params_give'][type][name] -= value;
                });
            });
        }
        _sharpenNumber = 0;
        _calculatePrice();

        return _sharpenNumber;
    };

    /**
     *
     * @param number
     * @returns {*}
     */
    this.setAP = function(number){
        if(apInfo[number] === undefined)
            return _apNumber;

        _that.unsetAP();
        $.each(apInfo, function(i, info){
            if(number >= i && info['level'] > _itemOld['params_need']['levelInfo']['level']) {
                if(_item['params_need']['levelInfo']['level'] < info['level'])
                    _item['params_need']['levelInfo']['level'] = info['level'];

                $.each(_item['params_need']['stats'], function(statType, statValue){
                    if(statValue > 0)
                        _item['params_need']['stats'][statType] += 1;
                });

                if(currentContainer.isWeapon(_dataType)) {
                    _item['params_give']['damage']['min_damage'] += info['min_damage'];
                    _item['params_give']['damage']['max_damage'] += info['max_damage'];

                    $.each(_item['params_need']['possession'], function(statType, statValue){
                        if(statValue > 0)
                            _item['params_need']['possession'][statType] += 1;
                    });
                    return;
                }

                if(_that.canSetHP() || _artBonus['hp'] > 0)
                    _item['params_give']['other']['hp'] += info['hp'];
                if(_that.canSetArmor() || _artBonus['armor'] > 0) {
                    $.each(_item['params_give']['armor'], function(armorType, armorValue){
                        if(armorValue > 0)
                            _item['params_give']['armor'][armorType] += info['armor'];
                    });
                }

                _availableStats += info['stats'];
                _availableMF += info['mf'];
            }
        });

        return _apNumber = number;
    };

    /**
     *
     */
    this.unsetAP = function(){
        _item['params_need']['levelInfo']['level'] = _itemOld['params_need']['levelInfo']['level'];
        $.each(apInfo, function(i, info){
            if(_apNumber >= i && info['level'] > _itemOld['params_need']['levelInfo']['level']) {
                $.each(_item['params_need']['stats'], function(statType, statValue){
                    if(statValue > 0)
                        _item['params_need']['stats'][statType] -= 1;
                });

                if(currentContainer.isWeapon(_dataType)) {
                    _item['params_give']['damage']['min_damage'] -= info['min_damage'];
                    _item['params_give']['damage']['max_damage'] -= info['max_damage'];

                    $.each(_item['params_need']['possession'], function(statType, statValue){
                        if(statValue > 0)
                            _item['params_need']['possession'][statType] -= 1;
                    });

                    return;
                }

                if(_that.canSetHP() || _artBonus['hp'] > 0)
                    _item['params_give']['other']['hp'] -= info['hp'];
                if(_that.canSetArmor() || _artBonus['armor'] > 0) {
                    $.each(_item['params_give']['armor'], function(armorType, armorValue){
                        if(armorValue > 0)
                            _item['params_give']['armor'][armorType] -= info['armor'];
                    });
                }

                _availableMF -= info['mf'];
                _availableStats -= info['stats'];
            }
        });
        $.each(_itemOld['params_give']['stats'], function(statName, statValue){
            _availableStats += (_item['params_give']['stats'][statName] - statValue);
            _item['params_give']['stats'][statName] = statValue;
        });
        $.each(_itemOld['params_give']['mf'], function(statName, statValue){
            _availableMF += (_item['params_give']['mf'][statName] - statValue);
            _item['params_give']['mf'][statName] = statValue;
        });

        return _apNumber = 0;
    };

    /**
     *
     * @returns {number}
     */
    this.getSelectedAP = function(){
        return _apNumber;
    };

    this.getHPfromAP = function(){
        var hp = 0;
        $.each(apInfo, function(i, info){
            if(_apNumber >= i && info['level'] > _itemOld['params_need']['levelInfo']['level']
                && !currentContainer.isWeapon(_dataType)
                && (_that.canSetHP() || _artBonus['hp'] > 0))

                hp += info['hp'];
        });

        return hp;
    };

    /**
     *
     * @param number
     * @returns {*}
     */
    this.setPodgon = function(number){
        if(podgonInfo[number] === undefined || !_that.canSetMF())
            return _podgonNumber;

        _that.unsetPodgon();
        $.each(podgonInfo, function(i, info){
            if(number >= i)
                _availableMF += info['mf'];
        });

        _podgonNumber = number;
        _calculatePrice();

        return _podgonNumber;
    };

    /**
     *
     */
    this.unsetPodgon = function(){
        $.each(_itemOld['params_give']['mf'], function(statName, statValue){
            _availableMF += (_item['params_give']['mf'][statName] - statValue);
            _item['params_give']['mf'][statName] = statValue;
        });

        $.each(podgonInfo, function(i, info){
            if(_podgonNumber >= i)
                _availableMF -= info['mf'];
        });

        _podgonNumber = 0;
        _calculatePrice();

        return _podgonNumber;
    };

    /**
     *
     * @returns {number}
     */
    this.getSelectedPodgon = function(){
        return _podgonNumber;
    };

    /**
     *
     * @param value
     */
    this.setAutoSet = function(value){
        switch (value) {
            case 'top':
                _that.setFromMF('hp', 20);
                _that.setFromMF('stats', 2);
                _that.setFromMF('armor', 3);
                break;
            case 'top_unique':
                _that.setFromMF('hp', 20);
                _that.setFromMF('stats', 3);
                _that.setFromMF('armor', 3);
                break;
        }
    };

    /**
     *
     * @returns {*}
     */
    this.getItem = function(){
        return _item;
    };

    /**
     *
     * @returns {number}
     */
    this.getAvailableStats = function(){
        return _availableStats;
    };

    /**
     *
     * @returns {number}
     */
    this.getAvailableMF = function(){
        return _availableMF;
    };

    /**
     *
     * @param statName
     * @param statValue
     * @returns {boolean}
     */
    this.addStat = function(statName, statValue) {
        if(_item['params_give']['stats'][statName] === undefined) {
            message.simple('Не удалось определить стат');
            return false;
        }

        if(_availableStats == 0) {
            message.simple('У вас нет свободных распределений статов');
            return false;
        }

        if(_availableStats - statValue < 0) {
            message.simple('У вас недостаточно свободных распределений статов');
            return false;
        }

        _availableStats -= statValue;
        _item['params_give']['stats'][statName] += statValue;
        return true;
    };

    /**
     *
     * @param statName
     * @param statValue
     * @returns {boolean}
     */
    this.takeStat = function(statName, statValue) {
        if(_item['params_give']['stats'][statName] === undefined) {
            message.simple('Не удалось определить стат');
            return false;
        }

        if(_item['params_give']['stats'][statName] - statValue >= _itemOld['params_give']['stats'][statName]) {
            _availableStats += statValue;
            _item['params_give']['stats'][statName] -= statValue;
            return true;
        } else {
            message.simple('Нельзя уменьшить стат меньше, чем дает предмет');
            return false;
        }
    };

    /**
     *
     * @param mfName
     * @param mfValue
     * @returns {boolean}
     */
    this.addMF = function(mfName, mfValue) {
        if(_item['params_give']['mf'][mfName] === undefined) {
            message.simple('Не удалось определить стат');
            return false;
        }

        if(_availableMF == 0) {
            message.simple('У вас нет свободных распределений МФ');
            return false;
        }

        if(_availableMF - mfValue < 0) {
            message.simple('У вас недостаточно свободных распределений МФ');
            return false;
        }

        _availableMF -= mfValue;
        _item['params_give']['mf'][mfName] += mfValue;
        return true;
    };

    /**
     *
     * @param mfName
     * @param mfValue
     * @returns {boolean}
     */
    this.changeMF = function(mfName, mfValue) {
        if(_item['params_give']['mf'][mfName] === undefined) {
            message.simple('Не удалось определить стат');
            return false;
        }

        if(mfValue < 0)
            mfValue = 0;

        var original = _that.getOriginalValue('params_give', 'mf', mfName);
        var addedValue = _item['params_give']['mf'][mfName] - original;
        if(mfValue == addedValue)
            return addedValue;

        if(mfValue < addedValue) {
            _availableMF += addedValue - mfValue;
            _item['params_give']['mf'][mfName] -= (addedValue - mfValue);
        } else {
            var diff = mfValue - addedValue;
            if(diff > _availableMF) {
                message.simple('У вас недостаточно свободных распределений МФ');
                return addedValue;
            }

            _availableMF -= diff;
            _item['params_give']['mf'][mfName] += diff;
        }

        return true;
    };

    /**
     *
     * @param type
     * @param dataType
     * @param name
     * @returns {*}
     */
    this.getOriginalValue = function(type, dataType, name){
        return _itemOld[type][dataType][name];
    };

    /**
     *
     * @returns {{}}
     * @private
     */
    var _getSettings = function(){
        return {
            '_availableStats'   : _availableStats,
            '_availableMF'      : _availableMF,
            '_mfInfo'           : _mfInfo,
            '_apNumber'         : _apNumber,
            '_podgonNumber'     : _podgonNumber,
            '_sharpenNumber'    : _sharpenNumber,
            '_artBonus'         : _artBonus,
            '_increasedNumber'  : _increasedNumber
        };
    };

    /**
     *
     * @param settings
     * @private
     */
    var _setSettings = function(settings){
        _availableStats     = settings['_availableStats'];
        _availableMF        = settings['_availableMF'];
        _mfInfo             = settings['_mfInfo'];
        _artBonus           = settings['_artBonus'];
        _apNumber           = settings['_apNumber'];
        _podgonNumber       = settings['_podgonNumber'];
        _sharpenNumber      = settings['_sharpenNumber'];
        _increasedNumber    = settings['_increasedNumber'];
    };

    /**
     *
     */
    this.save = function(){
        _item['settings'] = _getSettings();
        currentContainer.setItem(_dataType, _item);
        dummy.drawDummyParams();
    };

    /**
     *
     */
    this.setArt = function(){
        if(_that.canSetHP())
            _that.setFromMF('hp', 20);
        if(_that.canSetStats())
            _that.setFromMF('stats', 3);
        if(_that.canSetArmor())
            _that.setFromMF('armor', 3);
        _that.setPodgon(5);
        _item['params_give']['damage']['min_damage'] += 2;
        _item['params_give']['damage']['max_damage'] += 2;
        if(currentContainer.isWeapon(_dataType)) {
            _item['params_give']['damage']['min_damage'] += 5;
            _item['params_give']['damage']['max_damage'] += 5;
        }

        _availableStats += 6;
        _availableMF += 70;
        _that.changeFromArt('set');
    };

    /**
     *
     * @returns {*}
     */
    this.isUnik = function(){
        return _item['unique'];
    };

    /**
     *
     * @param type
     */
    this.setIncreased = function(type){
        _that.unsetIncreased();
        switch (type) {
            case 1:
                _item['params_give']['increased']['armor'] += 10;
                break;
            case 2:
                _item['params_give']['increased']['mf'] += 5;
                break;
            case 3:
                _item['params_give']['increased']['mf'] += 3;
                _item['params_give']['increased']['damage'] += 1;
                break;
        }
        _increasedNumber = type;
    };

    /**
     *
     */
    this.unsetIncreased = function(){
        switch (_increasedNumber) {
            case 1:
                _item['params_give']['increased']['armor'] -= 10;
                break;
            case 2:
                _item['params_give']['increased']['mf'] -= 5;
                break;
            case 3:
                _item['params_give']['increased']['mf'] -= 3;
                _item['params_give']['increased']['damage'] -= 1;
                break;
        }
    };

    this.isProkat = function(){
        return _item['chooseProkat'];
    };

    this.setProkat = function(){
        if(_that.canSetHP())
            _that.setFromMF('hp', 20);
        if(_that.canSetStats())
            _that.setFromMF('stats', 3);
        if(_that.canSetArmor())
            _that.setFromMF('armor', 3);
        _that.setPodgon(5);

        _availableStats += 1;
        _availableMF += 20;
    };

    var __construct = function (item, dataType) {
        _itemOld = _items_.getItem(dataType, item['id']);
        _dataType = dataType;
        _item = $.extend(true, {}, item);
        if(_item['settings'] !== undefined)
            _setSettings(_item['settings']);

    }(item, dataType);
}