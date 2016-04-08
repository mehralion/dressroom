/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 24.12.12
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */
function Hint(eIn, itemIn, textIn) {
    var _e;
    var _item;
    var _body;
    var _text;
    var _that = this;

    this.draw = function () {
        var head = _that.getHead();
        var need = _that.getNeed();
        var give = _that.getGive();
        _body = head + need + give;
        $('.hint').css({left:_e.pageX + 20, top:_e.pageY});
        $('.hint').html(_body);
    }
    /**
     *
     * @return {String}
     */
    this.getHead = function () {
        var head = '';
        var mf = '';
        var ap = '';
        var a = '';
        var sharpen = '';
        var align = _item['params_need']['other']['align'];
        var art = '';
        if(align !== undefined && align > 0)
            a = '<img src="http://i.oldbk.com/i/align_'+align+'.gif"> ';

        if(_item['is_art'] || _item['create_art'])
            art = '<img src="http://i.oldbk.com/i/artefact.gif">';
        if(_item['settings'] !== undefined) {
            $.each(_item['settings']['mf'], function (name, value){
                if(value > 0) {
                    mf = ' (МФ)';
                    return false;
                }
            });
            if(_item['settings']['apInfo']['select'] > 0)
                ap = ' ('+apInfo[_item['settings']['apInfo']['select']]['level']+' АП)';
            if(_item['settings']['sharpen']['select'] > 0)
                sharpen = ' [+' + _item['settings']['sharpen']['select'] + ']';

        }
        if (_item['name'] !== undefined)
            head += a + _item['name'] + mf + ap + sharpen + ' ' + art + '<br>';
        if (_item['price'] !== undefined && (_item['repa_cost'] === undefined || !_item['repa_cost']))
            head += 'Цена: ' + _item['price'] + ' кр.<br>';
        else if(_item['repa_cost'] !== undefined && _item['repa_cost'] > 0)
            head += 'Цена: ' + _item['repa_cost'] + ' реп.<br>';
        if(_item['settings'] !== undefined && _item['settings']['podgonInfo']['select'] > 0) {
            var _podgon = _item['settings']['podgonInfo']['select'];
            var count = 'раз';
            if(_podgon == 2 || _podgon == 3 || _podgon == 4)
                count += 'a';
            head += 'Подогнано: <b>' + _podgon + ' ' + count + '</b><br>';
        }
        return head;
    }
    /**
     *
     * @return {String}
     */
    this.getNeed = function () {
        var need = '';
        if (_item['params_need'] !== undefined) {
            need = 'Требуется минимальное:<br>';
            $.each(_item['params_need'], function (category, items) {
                $.each(items, function (name, value) {
                    if (value > 0 && name != 'align')
                        need = need + '• ' + vak[name] + ': ' + value + '<br>';
                });
            });
        }
        return need;
    }
    /**
     *
     * @return {String}
     */
    this.getGive = function () {
        var give = '';
        if (_item['params_give'] !== undefined) {
            give = 'Действует на:<br>';
            if (_item['params_give']['stats']) {
                $.each(_item['params_give']['stats'], function (name, value) {
                    if (value > 0)
                        give = give + '• ' + vak[name] + ': ' + value + '<br>';
                });
            }
            if (_item['params_give']['other']) {
                $.each(_item['params_give']['other'], function (name, value) {
                    if (value > 0)
                        give = give + '• ' + vak[name] + ': ' + value + '<br>';
                });
            }
            if (_item['params_give']['mf']) {
                $.each(_item['params_give']['mf'], function (name, value) {
                    if (value > 0)
                        give = give + '• ' + vak[name] + ': ' + value + '%<br>';
                });
            }
            if (_item['params_give']['vlad']) {
                $.each(_item['params_give']['vlad'], function (name, value) {
                    if (value > 0)
                        give = give + '• ' + vak[name] + ': ' + value + '<br>';
                });
            }
            if (_item['params_give']['bron']) {
                $.each(_item['params_give']['bron'], function (name, value) {
                    if (value > 0)
                        give = give + '• ' + vak[name] + ': ' + value + '<br>';
                });
            }
            if (_item['params_give']['usil']) {
                $.each(_item['params_give']['usil'], function (name, value) {
                    if (value > 0)
                        give = give + '• +' + value + '% ' + vak[name] + '<br>';
                });
            }
        }
        if((_item['settings'] !== undefined && _item['settings']['mf']['stats'] == 3) || _item['create_art'] || _item['is_art'])
            give += '<br><span style="color:red;font-weight: bold;">Вещь имеет уникальные характеристики.</span>';
        return give;
    }
    this.drawEmpty = function () {
        _body = 'Пустой слот ' + _text;
        $('.hint').css({left:_e.pageX + 20, top:_e.pageY});
        $('.hint').html(_body);
    }

    var __construct = function (ePassed, itemPassed, textPassed) {
        $('body').append('<div class="hint"></div>');
        _e = ePassed;
        _item = itemPassed;
        _text = textPassed;
        if (_item !== null)
            _that.draw();
        else
            _that.drawEmpty();
    }(eIn, itemIn, textIn);
}

function removeHint() {
    $('.hint').remove();
}
