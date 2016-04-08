function Menu(itemCategoryIn, eIn) {
    var _itemCategory;
    var _e;
    var _that = this;
    this.show = function () {
        $('.menu').css({left:_e.pageX + 20, top:_e.pageY});
        $('.menu').append('<div class="item set">Одеть другую вещь</div>');
        $('.menu').append('<div class="item change">Изменить вещь</div>');
        $('.menu').append('<div class="separator"></div>');
        $('.menu').append('<div class="item unset">Снять вещь</div>');
        $('.menu').append('<div class="separator"></div>');
        $('.menu').append('<div class="item close">Закрыть окно</div>');
        $('.menu').show();
        $('.menu .item.set, .menu .item.change, .menu .item.unset, .menu .item.close').unbind('click');
        $('.menu .item.set').click(function (e) {
            var dress = new Dress();
            dress.newW(_itemCategory);
            _that.remove();
        });
        $('.menu .item.change').click(function (e) {
            var dress = new Dress();
            dress.change(_itemCategory);
            _that.remove();
        });
        $('.menu .item.unset').click(function (e) {
            container[tab].unsetItem(_itemCategory);
            dummy.unsetItem(_itemCategory);
            _that.remove();
        });
        $('.menu .item.close').click(function (e) {
            _that.remove();
        });
    }
    this.remove = function () {
        $('.menu').remove();
    }
    this.orShow = function (isEmpty) {
        $('.menu').css({left:_e.pageX + 20, top:_e.pageY});
        $('.menu').append('<div class="item or set" rel="nog">Ножи и кастеты</div>');
        $('.menu').append('<div class="item or set" rel="topor">Топоры и секиры</div>');
        $('.menu').append('<div class="item or set" rel="dubina">Дубины и булавы</div>');
        $('.menu').append('<div class="item or set" rel="mech">Мечи</div>');
        if(!isEmpty) {
            $('.menu').append('<div class="item or change">Изменить вещь</div>');
            $('.menu').append('<div class="separator"></div>');
            $('.menu').append('<div class="item unset">Снять вещь</div>');
        }
        $('.menu').append('<div class="separator"></div>');
        $('.menu').append('<div class="item close">Закрыть окно</div>');
        $('.menu').show();
        $('.menu .item.or.set, .menu .item.unset, .menu .item.close').unbind('click');
        $('.menu .item.or.set').click(function (e) {
            var dress = new Dress();
            dress.newW($(this).attr('rel'));
            $('.player .or').attr('id', $(this).attr('rel'));
            _that.remove();
        });
        $('.menu .item.or.change').click(function (e) {
            var dress = new Dress();
            dress.change($('.player .or').attr('id'));
            _that.remove();
        });
        $('.menu .item.unset').click(function (e) {
            container[tab].unsetItem(_itemCategory);
            dummy.unsetItem(_itemCategory);
            _that.remove();
        });
        $('.menu .item.close').click(function (e) {
            _that.remove();
        });
    }
    var __construct = function (itemCategoryPassed, ePassed) {
        _itemCategory = itemCategoryPassed;
        _e = ePassed;
        $('body').append('<div class="menu"></div>');
        removeHint();
    }(itemCategoryIn, eIn);
}