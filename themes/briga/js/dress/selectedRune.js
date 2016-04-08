/**
 * Created by Николай on 08.06.14.
 */
function SelectedRune(item, dataType)
{
    var _item;
    var _itemOld;
    var _dataType;
    var _that = this;

    var _availableStats = 0;
    var _availableMF = 0;

    var _apNumber = 0;

    var _info = {
        increased_damage: 1,
        increased_armor: 3,
        increased_mf: 1
    };

    var _maxAv = {
        stats: 0
    };

    /**
     *
     * @returns {*}
     */
    this.getItem = function(){
        return _item;
    };

    this.getSelectedAP = function(){
        return _apNumber;
    };

    this.setAP = function(number){
        if(runeLevel[number] === undefined)
            return _apNumber;

        if(_apNumber)
            _that.unsetAP();

        $.each(runeLevel, function(level, info){
            if(level > number)
                return false;

            $.each(info, function(type, value){
                switch (type) {
                    case 'stats':
                        _availableStats += value;
                        _maxAv['stats'] += value;
                        break;
                    case 'mf':
                        _availableMF += value;
                        break;
                    case 'hp':
                        _item['params_give']['other']['hp'] += value;
                        break;
                    case 'mp':
                        _item['params_give']['other']['mp'] += value;
                        break;
                    case 'armor':
                        $.each(_item['params_give']['armor'], function(armorType, armorValue){
                            if(armorValue > 0)
                                $('.changeItem .armor [data-give="true"][data-type="'+armorType+'"]').closest('tr').show();

                            _item['params_give']['armor'][armorType] += value;
                        });
                        break;
                    case 'strange':
                    case 'agility':
                    case 'intuition':
                    case 'intellect':
                    case 'wisdom':
                        _item['params_give']['stats'][type] += value;
                        if(_item['params_give']['stats'][type] > 0)
                            $('.changeItem .stats [data-give="true"][data-type="'+type+'"]').closest('tr').show();
                        break;
                    case 'min_damage':
                    case 'max_damage':
                        _item['params_give']['damage'][type] += value;
                        if(_item['params_give']['damage'][type] > 0)
                            $('.changeItem .damage [data-give="true"][data-type="'+type+'"]').closest('tr').show();
                        break;
                    case 'increased':
                        if(value) {
                            if(_item['enabled_rune_increased_damage'])
                                _item['params_give']['increased']['damage'] += _info['increased_damage'];
                            else if(_item['enabled_rune_increased_armor'])
                                _item['params_give']['increased']['armor'] += _info['increased_armor'];
                            else if(_item['enabled_rune_increased_mf'])
                                _item['params_give']['increased']['mf'] += _info['increased_mf'];
                        }
                        break;
                    case 'possession_m':
                        $.each(_item['params_give']['possession_m'], function(possessionMType, possessionMValue){
                            if(possessionMValue > 0)
                                $('.changeItem .possession_m [data-give="true"][data-type="'+possessionMType+'"]').closest('tr').show();

                            _item['params_give']['possession_m'][possessionMType] += value;
                        });
                        break;
                }
            });
        });

        return _apNumber = number;
    };

    this.unsetAP = function(){
        _item = $.extend(true, {}, _itemOld);
        _availableMF = 0;
        _availableStats = 0;
        _apNumber = 0;
        _maxAv['stats'] = 0;

        $.each(_item['params_give']['damage'], function(statName, statValue){
            if(statValue == 0)
                $('.changeItem .damage [data-give="true"][data-type="'+statName+'"]').closest('tr').hide();
        });

        $.each(_item['params_give']['stats'], function(statName, statValue){
            if(statValue == 0)
                $('.changeItem .stats [data-give="true"][data-type="'+statName+'"]').closest('tr').hide();
        });

        $.each(_item['params_give']['possession_m'], function(statName, statValue){
            if(statValue == 0)
                $('.changeItem .possession_m [data-give="true"][data-type="'+statName+'"]').closest('tr').hide();
        });

        $.each(_item['params_give']['armor'], function(statName, statValue){
            if(statValue == 0)
                $('.changeItem .armor [data-give="true"][data-type="'+statName+'"]').closest('tr').hide();
        });
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
     * @returns {number}
     */
    this.getHPfromAP = function(){
        return 0;
    };

    /**
     *
     * @returns {number}
     */
    this.getHPfromMF = function(){
        return 0;
    };

    /**
     *
     * @returns {number}
     */
    this.getHPfromArt = function(){
        return 0;
    };

    /**
     *
     * @returns {boolean}
     */
    this.isUnik = function(){
        return false;
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

        if(_availableStats + statValue <= _maxAv['stats']) {
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
     * @returns {{}}
     * @private
     */
    var _getSettings = function(){
        return {
            '_availableStats'   : _availableStats,
            '_availableMF'      : _availableMF,
            '_apNumber'         : _apNumber
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
        _apNumber           = settings['_apNumber'];
    };

    /**
     *
     */
    this.save = function(){
        _item['settings'] = _getSettings();
        currentContainer.setItem(_dataType, _item);
        dummy.drawDummyParams();
    };

    this.getOriginalValue = function(type, dataType, name){
        return _itemOld[type][dataType][name];
    };

    var __construct = function (item, dataType) {
        _itemOld = _items_.getItem(dataType, item['id']);
        _dataType = dataType;
        _item = $.extend(true, {}, item);

        if(_item['settings'] !== undefined)
            _setSettings(_item['settings']);

    }(item, dataType);
}