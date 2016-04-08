/**
 * Created by Николай on 05.06.14.
 */
function Change()
{
    var _dataType;
    var _selected = null;

    /**
     *
     * @param dataType
     */
    this.begin = function(dataType){
        var item = currentContainer.getCurrItem(dataType);
        var itemOld = _items_.getItem(dataType, item['id']);
        _dataType = dataType;
        _selected = new Selected(item, dataType);
        windows.changeItem();

        $.ajax({
            url: baseSiteUrl+'site/change.html',
            type:'post',
            data: {'item':item},
            dataType:'json',
            success: function(data) {
                $('.wLoader').remove();
                $('.popup.change_items').css({'margin-left':'-400px'});
                $('.popup.change_items .cont_middle .body').html(data.content);

                if(currentContainer.isWeapon(dataType)) {
                    $('#block_mf, #block_podgon, #block_autoset, #free-set-mf, #free-set-stats').hide();
                    $('[data-type="stats"] .add, [data-type="stats"] .addPP, [data-type="stats"] .take').hide();
                    $('[data-type="mf"] .add, [data-type="mf"] .addPP, [data-type="mf"] .take').hide();
                    $('[data-type="mf"] input').hide();
                }

                if(!_selected.canSetHP() && !_selected.canSetArmor() && !_selected.canSetStats())
                    $('#block_mf, #block_autoset').hide();

                if(!_selected.canSetMF())
                    $('#block_podgon').hide();

                if(itemOld['params_need']['levelInfo']['level'] > 12)
                    $('#block_ap').hide();

                if(!_selected.canSetStats())
                    $('#free-set-stats, #block_mf .stat, #block_autoset').hide();

                if(!_selected.canSetMF())
                    $('#free-set-mf').hide();

                if(!_selected.canSetArmor())
                    $('#block_mf .bron').hide();

                if(!_selected.canSetHP()) {
                    $('[data-type="hp_original"]').closest('tr').hide();
                    $('#block_mf .hp').hide();
                }

                if(_selected.isProkat()) {
                    $('#block_mf, #block_ap, #block_podgon, #block_autoset').hide();
                    if(item['settings'] !== undefined) {
                        var ap = item['settings']['_apNumber'];
                        if(ap > 0)
                            $('#block_prokat [data-type="prokat"][data-value="'+ap+'"]').removeClass('unselect').addClass('select');
                    } else
                        _selected.setProkat();
                } else {
                    $.each(apInfo, function(i, info){
                        if(info['level'] <= itemOld['params_need']['levelInfo']['level']) {
                            $('#block_ap [data-type="ap"][data-value="'+i+'"]').hide();

                        }
                    });

                    if(item['settings'] !== undefined) {
                        var ap = item['settings']['_apNumber'];
                        var podgon = item['settings']['_podgonNumber'];
                        var sharpen = item['settings']['_sharpenNumber'];
                        var increased = item['settings']['_increasedNumber'];
                        if(ap > 0)
                            $('#block_ap [data-type="ap"][data-value="'+ap+'"]').removeClass('unselect').addClass('select');
                        if(podgon > 0)
                            $('#block_podgon [data-type="podgon"][data-value="'+podgon+'"]').removeClass('unselect').addClass('select');
                        if(sharpen > 0)
                            $('#block_sharpen [data-type="sharpen"][data-value="'+sharpen+'"]').removeClass('unselect').addClass('select');
                        if(increased > 0)
                            $('#block_art [name="usil"][value="'+increased+'"]').attr('checked', true);

                        $('#block_mf [data-type="hp"]').val(item['settings']['_mfInfo']['hp']);
                        $('#block_mf [data-type="stats"]').val(item['settings']['_mfInfo']['stats']);
                        $('#block_mf [data-type="armor"]').val(item['settings']['_mfInfo']['armor']);
                    }
                }

                _draw();
            }
        });
    };

    /**
     *
     * @param dataType
     */
    this.rune = function(dataType){
        var item = currentContainer.getCurrItem(dataType);
        var itemOld = _items_.getItem(dataType, item['id']);
        _dataType = dataType;
        _selected = new SelectedRune(item, dataType);
        windows.changeItem();

        $.ajax({
            url: baseSiteUrl+'site/change.html',
            type:'post',
            data: {'item':item},
            dataType:'json',
            success: function(data) {
                $('.wLoader').remove();
                $('.popup.change_items').css({'margin-left':'-400px'});
                $('.popup.change_items .cont_middle .body').html(data.content);

                if(item['settings'] !== undefined) {
                    var ap = item['settings']['_apNumber'];

                    if(ap > 0)
                        $('#block_rune_ap [data-level="'+ap+'"]').removeClass('unselect').addClass('select');
                }

                _draw();
            }
        });
    };

    /**
     *
     * @param dataType
     */
    this.art = function(dataType){
        var item = currentContainer.getCurrItem(dataType);
        var itemOld = _items_.getItem(dataType, item['id']);
        _dataType = dataType;
        _selected = new Selected(item, dataType);
        if(item['settings'] === undefined)
            _selected.setArt();
        windows.changeItem();

        $.ajax({
            url: baseSiteUrl+'site/change.html',
            type:'post',
            data: {'item':item},
            dataType:'json',
            success: function(data) {
                $('.wLoader').remove();
                $('.popup.change_items').css({'margin-left':'-400px'});
                $('.popup.change_items .cont_middle .body').html(data.content);

                $.each(apInfo, function(i, info){
                    if(info['level'] <= itemOld['params_need']['levelInfo']['level']) {
                        $('#block_ap [data-type="ap"][data-value="'+i+'"]').hide();

                    }
                });

                $('#block_mf, #block_autoset, #block_podgon').hide();
                if(itemOld['params_need']['levelInfo']['level'] > 12)
                    $('#block_ap').hide();

                if(item['settings'] !== undefined) {
                    var ap = item['settings']['_apNumber'];
                    var podgon = item['settings']['_podgonNumber'];
                    var sharpen = item['settings']['_sharpenNumber'];
                    var increased = item['settings']['_increasedNumber'];
                    if(ap > 0)
                        $('#block_ap [data-type="ap"][data-value="'+ap+'"]').removeClass('unselect').addClass('select');
                    if(podgon > 0)
                        $('#block_podgon [data-type="podgon"][data-value="'+podgon+'"]').removeClass('unselect').addClass('select');
                    if(sharpen > 0)
                        $('#block_sharpen [data-type="sharpen"][data-value="'+sharpen+'"]').removeClass('unselect').addClass('select');
                    if(increased > 0)
                        $('#block_art [name="usil"][value="'+increased+'"]').attr('checked', true);
                }

                _draw();
            }
        });
    };

    var _events = function(){
        $(document.body).on('change', '#block_mf input', function(event){
            event.preventDefault();

            var $self = $(this);
            var dataType = $self.attr('data-type');
            var _newVal = _selected.setFromMF(dataType, parseInt($self.val()));

            $self.val(_newVal);

            if(!_selected.getIsMF() && _selected.getSelectedPodgon() > 0) {
                message.simple('Вы сняли модификацию с вещи, которая подогнана. Подгонка будет снята');
                _selected.unsetPodgon();
                $('#block_podgon [data-type="podgon"]').removeClass('select').addClass('unselect');
            }

            _draw();
        });

        $(document.body).on('click', '#block_ap [data-type="ap"], #block_prokat [data-type="prokat"]', function(event){
            event.preventDefault();

            var $self = $(this);
            var number = parseInt($self.attr('data-value'));
            if(_selected.getSelectedAP() == number) {
                _selected.unsetAP();
                $self.removeClass('select').addClass('unselect');
            } else {
                var ap = _selected.setAP(number);
                $self.closest('fieldset').find('div').removeClass('select').addClass('unselect');
                $self.closest('fieldset').find('div[data-value="'+ap+'"]').removeClass('unselect').addClass('select');
            }

            _draw();
        });

        $(document.body).on('click', '#block_podgon [data-type="podgon"]', function(event){
            event.preventDefault();

            var $self = $(this);
            var number = parseInt($self.attr('data-value'));
            if(_selected.getSelectedPodgon() == number) {
                _selected.unsetPodgon();
                $self.removeClass('select').addClass('unselect');
            } else {
                if(!_selected.getIsMF()) {
                    message.simple('Вы не можете подогнать вещь без модификации');
                } else {
                    $self.closest('fieldset')
                        .find('div').removeClass('select').addClass('unselect');
                    $self.closest('fieldset')
                        .find('div[data-value="'+_selected.setPodgon(number)+'"]').removeClass('unselect').addClass('select');
                }
            }

            _draw();
        });

        $(document.body).on('click', '#block_sharpen [data-type="sharpen"]', function(event){
            event.preventDefault();

            var $self = $(this);
            var number = parseInt($self.attr('data-value'));
            if(_selected.getSelectedSharpen() == number) {
                _selected.unsetSharpen();
                $self.removeClass('select').addClass('unselect');
            } else {
                $self.closest('fieldset')
                    .find('div').removeClass('select').addClass('unselect');
                $self.closest('fieldset')
                    .find('div[data-value="'+_selected.setSharpen(number)+'"]').removeClass('unselect').addClass('select');
            }

            _draw();
        });

        $(document.body).on('click', '#block_autoset a', function(event){
            event.preventDefault();

            var $self = $(this);
            var val = $self.attr('data-type');

            _selected.setAutoSet(val);
            $.each(_selected.getFormMF(), function(name, value){
                $('#block_mf [data-type="'+name+'"]').val(value);
            });

            _draw();
        });

        $(document.body).on('click', '[data-type="stats"] .add', function(event){
            event.preventDefault();

            var $self = $(this);
            if(_selected.addStat($self.attr('data-for'), 1))
                _draw();
        });

        $(document.body).on('click', '[data-type="stats"] .addPP', function(event){
            event.preventDefault();

            var $self = $(this);
            if(_selected.addStat($self.attr('data-for'), _selected.getAvailableStats()))
                _draw();
        });

        $(document.body).on('click', '[data-type="stats"] .take', function(event){
            event.preventDefault();

            var $self = $(this);
            if(_selected.takeStat($self.attr('data-for'), 1))
                _draw();
        });

        $(document.body).on('click', '[data-type="mf"] .addPP', function(event){
            event.preventDefault();

            var $self = $(this);
            if(_selected.addMF($self.attr('data-for'), _selected.getAvailableMF()))
                _draw();
        });

        $(document.body).on('blur', '[data-type="mf"] input', function(event){
            event.preventDefault();

            var $self = $(this);
            var result = _selected.changeMF($self.attr('data-type'), parseInt($self.val()));
            if(result === true)
                _draw();
            else
                $self.val(result);
        });

        $(document.body).on('click', '#saveBtn', function(event){
            event.preventDefault();

            _selected.save();
            windows.close();
        });

        $(document.body).on('click', '#block_art .add_art_hp', function(event){
            event.preventDefault();

            var $self = $(this);
            _selected.changeFromArt('hp');
            _draw();
        });

        $(document.body).on('click', '#block_art .take_art_hp', function(event){
            event.preventDefault();

            var $self = $(this);
            _selected.changeFromArt('armor');
            _draw();
        });

        $(document.body).on('change', '#block_art [name="usil"]', function(event){
            event.preventDefault();

            var $self = $(this);
            _selected.setIncreased(parseInt($self.val()));
            _draw();
        });

        $(document.body).on('click', '#block_rune_ap div', function(event){
            event.preventDefault();

            var $self = $(this);
            var number = parseInt($self.attr('data-level'));
            if(_selected.getSelectedAP() == number) {
                _selected.unsetAP();
                $self.removeClass('select').addClass('unselect');
            } else {
                var ap = _selected.setAP(number);
                $self.closest('fieldset').find('div').removeClass('select').addClass('unselect');
                $self.closest('fieldset').find('div[data-level="'+ap+'"]').removeClass('unselect').addClass('select');
            }

            _draw();
        });
    };

    var _draw = function(){
        var item = _selected.getItem();
        var $price = $('[data-type="price"]');
        if(item['price_reputation'] > 0)
            $price.html(item['price_reputation'] + ' реп.');
        else
            $price.html(item['price'] + ' кр.');

        //need
        $.each(item['params_need'], function(dataType, infos){
            $.each(infos, function(name, value){
               $('[data-need="true"][data-type="'+name+'"]').html(value);
            });
        });

        $('[data-type="free-stats"]').html(_selected.getAvailableStats());
        $('[data-type="free-mf"]').html(_selected.getAvailableMF());
        if(_selected.isUnik())
            $('#is_unique').show();
        else
            $('#is_unique').hide();

        //give
        $.each(item['params_give'], function(dataType, infos){
            switch (dataType) {
                case 'mf':
                    $.each(infos, function(name, value){
                        var original = _selected.getOriginalValue('params_give', 'mf', name);
                        var addedValue = value - original;
                        $('[data-give="true"][data-type="'+name+'"][data-string="true"]').html(original);
                        $('[data-give="true"][data-type="'+name+'"][data-input="true"]').val(addedValue);
                    });
                    break;
                case 'other':
                    $.each(infos, function(name, value){
                        if(name == 'hp'){
                            var mfHp = _selected.getHPfromMF();
                            var apHp = _selected.getHPfromAP();
                            var artHp = _selected.getHPfromArt();
                            $('[data-give="true"][data-type="hp_original"]').html(value);
                            $('[data-give="true"][data-type="hp_mf"]').html(mfHp);
                            $('[data-give="true"][data-type="hp_ap"]').html(apHp);
                            $('[data-give="true"][data-type="hp_art"]').html(artHp);
                        } else
                            $('[data-give="true"][data-type="'+name+'"]').html(value);
                    });
                    break;
                default:
                    $.each(infos, function(name, value){
                        $('[data-give="true"][data-type="'+name+'"]').html(value);
                    });
                    break;
            }
        });
    };

    var __construct = function () {
        _events();
    }();
}