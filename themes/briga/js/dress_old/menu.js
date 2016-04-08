function Menu() {
    var _that = this;
    this.showDressed = function(category, e){
        _that.close();
        $('.menu_dressed').css({left:e.pageX + 20, top:e.pageY}).show();
        $('.menu_dressed').append('<div rel="'+category+'" class="item set">Одеть другую вещь</div>');
        $('.menu_dressed').append('<div rel="'+category+'" class="item change">Изменить вещь</div>');
        $('.menu_dressed').append('<div class="separator"></div>');
        $('.menu_dressed').append('<div rel="'+category+'" class="item unset">Снять вещь</div>');
        $('.menu_dressed').append('<div class="separator"></div>');
        $('.menu_dressed').append('<div class="item close">Закрыть окно</div>');
    };
    this.showOr = function (e) {
        _that.close();
        $('.menu_dressed').css({left:e.pageX + 20, top:e.pageY}).show();
        $('.menu_dressed').append('<div class="item or set" rel="nog">Ножи и кастеты</div>');
        $('.menu_dressed').append('<div class="item or set" rel="topor">Топоры и секиры</div>');
        $('.menu_dressed').append('<div class="item or set" rel="dubina">Дубины и булавы</div>');
        $('.menu_dressed').append('<div class="item or set" rel="mech">Мечи</div>');
        $('.menu_dressed').append('<div class="separator"></div>');
        $('.menu_dressed').append('<div class="item close">Закрыть окно</div>');
    };
    this.showDressedOr = function(category, e) {
        _that.close();
        $('.menu_dressed').css({left:e.pageX + 20, top:e.pageY}).show();
        $('.menu_dressed').append('<div class="item or set" rel="nog">Ножи и кастеты</div>');
        $('.menu_dressed').append('<div class="item or set" rel="topor">Топоры и секиры</div>');
        $('.menu_dressed').append('<div class="item or set" rel="dubina">Дубины и булавы</div>');
        $('.menu_dressed').append('<div class="item or set" rel="mech">Мечи</div>');
        $('.menu_dressed').append('<div class="separator"></div>');
        $('.menu_dressed').append('<div rel="'+category+'" class="item change">Изменить вещь</div>');
        $('.menu_dressed').append('<div rel="'+category+'" class="item unset">Снять вещь</div>');
        $('.menu_dressed').append('<div class="separator"></div>');
        $('.menu_dressed').append('<div class="item close">Закрыть окно</div>');
    };
    this.close = function() {
        $('.menu_dressed').html('').hide();
    };
    var _events = function(){
        $(document.body).on('click', '.menu_dressed div.set', function(){
            var dress = new Dress();
            dress.showItems($(this).attr('rel'));
            dress = null;
            _that.close();
        });
        $(document.body).on('click', '.menu_dressed .unset', function(){
            container[tabs.getCurrentTab()].unsetItem($(this).attr('rel'));
            dummy.drawDummyImg();
            _that.close();
        });
        $(document.body).on('click', '.menu_dressed .close', function(){
            _that.close();
        });
        $(document.body).on('click', '.menu_dressed .change', function(){
            var category = $(this).attr('rel');
            var change;
            if(category == 'runa1' || category == 'runa2' || category == 'runa3') {
                change = new ChangeRune(category);
            } else {
                change = new ChangeItem(category);
            }
            change.change();
            _that.close();
        });
    };
    var __construct = function () {
        $('body').append('<div class="menu_dressed"></div>');
        _events();
    }();
}