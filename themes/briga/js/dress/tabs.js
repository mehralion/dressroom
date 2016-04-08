/**
 * Created by Николай on 04.06.14.
 */
function Tabs()
{
    var _that = this;
    var _index = 0;
    var _cabins;
    var _add_cabin;
    var _cabin_result;

    this.getCurrentTab = function() {
        return _index;
    };

    this.events = function() {
        $(document.body).on('click', '#add_cabin', function(event){
            event.preventDefault();

            _addCabin();
        });

        $(document.body).on('click', '#cabins li a.delete', function(event){
            event.preventDefault();

            _deleteCabin($(this));
        });

        $(document.body).on('click', '#cabins li a:not(.delete)', function(event){
            event.preventDefault();

            var $self = $(this).closest('li');

            _choose(parseInt($self.attr('data-index')));
        });

        $(document.body).on('click', '#cabin_result', function(event){
            event.preventDefault();

            if(debug)
                console.log('Смотрим результаты');

            $('#fighter').hide();
            $('#result').show();

            var $self = $(this);
            _cabins.find('li').removeClass('active');
            $self.addClass('active');

            var result = new Result();
            result.drawResult();
        });
    };

    var _addCabin = function(){
        var newIndex = parseInt(_cabins.find('li:last').attr('data-index')) + 1;
        var count = _cabins.find('li').length + 1;

        var $li = $('<li>', {'data-index':newIndex}).appendTo(_cabins);
        var $span = $('<span>', {'class':'btn_orange'}).appendTo($li);
        $('<a>', {'href':'#', 'text':'Кабинка '+count, 'class':'title'}).appendTo($span);
        $('<a>', {'href':'#', 'class':'delete'}).appendTo($span);

        container[newIndex] = new Container();

        _choose(newIndex);
    };

    var _deleteCabin = function($obj){
        $obj.closest('li').remove();

        $.each(_cabins.find('li .title'), function(i, el){
            $(el).html('Кабинка '+ (i + 1));
        });

        var index = parseInt(_cabins.find('li:last').attr('data-index'));
        _choose(index);
    };

    var _choose = function(index){
        $('#fighter').show();
        $('#result').hide();
        _cabins.find('li').removeClass('active');
        $('#cabin_result').removeClass('active');
        if(index === null || index === undefined)
            _index = 0;
        else
            _index = index;

        console.log('Текущий', _index);
        currentContainer = container[_index];
        _cabins.find('[data-index="'+_index+'"]').addClass('active');

        dummy.drawDummyImg();
    };

    this.cloneTab = function(){
        var params = $.extend(true, {}, currentContainer.getParams());
        var dummyItems = $.extend(true, {}, currentContainer.getDummyItems());

        _addCabin();

        container[_index].setParams(params);
        container[_index].setDummyItems(dummyItems, true);
        dummy.drawDummyImg();
    };

    var __construct = function () {
        _cabins = $('#cabins');
        _add_cabin = $('#add_cabin');
        _cabin_result = $('#cabin_result');

        _that.events();
    }();
}