<?php
/* @var $this SiteController */

$this->pageTitle = Yii::app()->name;
?>
<?php if(isset($items) && isset($items['params']) && isset($items['dressed'])): ?>
    <script type="text/javascript">
        $(function(){
            container[tab].setParams(<?php echo CJSON::encode($items['params']); ?>);
            container[tab].setDummyItems(<?php echo CJSON::encode($items['dressed']); ?>);
        });
    </script>
<?php endif; ?>
<style>
    .closeTab {
        position: relative;
        top: -12px;
        right: -11px;
        font-size: 20px;
        display: inline-block;
    }

    .tabContent {
        border: 1px solid black;
        padding: 2px;
        margin-left: 5px;
    }

    td.center {
        text-align: center;
    }

    .tabResult .c1 {
        width: 175px;
        text-align: right;
        margin-top: 15px;
    }

    .tabResult ul {
        margin-left: 0;
        padding-left: 5px;
    }

    .tabResult .c2 li {
        list-style: none;
    }
    #fuzz{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        z-index:100;
        background: url('/themes/bootstrap/images/fuzz.gif');
        display:none;
        text-align:left;
    }
        /*Позиционирование окна в самом центре*/
    .msgbox{
        position:absolute;
        width:270px;
        height:20px;
        z-index:200;
        border:5px solid #222;
        background: #FFF;
        top: 50%;
        left: 50%;
        margin-top: -15px;
        margin-left: -100px;
        background-position: right;
        background-color: #ffffff;
        padding-left: 10px;
        padding-top: 3px;
        padding-right: 10px;
        font-weight: bold;
    }
    .msgbox img {
        float: right;
    }
</style>
<ul class="nav nav-tabs header">
    <li class="add_cabin"><a data-toggle="tab" href="#">+</a></li>
    <li class="cabin_result"><a data-toggle="tab" href="#">Сводная таблица</a></li>
    <li class="active cabins" id="0"><a data-toggle="tab" href="#">Кабинка 1</a></li>
</ul>
<div class="tab-content">
    <div class="tab">
        <?php
        foreach (Yii::app()->user->getFlashes() as $key => $message) {
            echo '<div class="flash-' . $key . '">' . $message . "</div>\n";
        }
        ?>
        <div class="c1">
            <?php $this->renderPartial('dress/pers'); ?>
            <?php $this->renderPartial('dress/stats'); ?>
        </div>
        <div class="c2">
            <?php $this->renderPartial('dress/params'); ?>
        </div>
    </div>
    <div class="tabResult" style="display: none;">
        <div class="c1">
            <ul class="stats">
                <li>Сила</li>
                <li>Ловкость</li>
                <li>Интуиция</li>
                <li>Выносливость</li>
                <li>Интеллект</li>
                <li>Мудрость</li>
                <li>Всего статов</li>
            </ul>
            <div class="separator"></div>
            <ul class="hp">
                <li>Уровень жизни</li>
            </ul>
            <div class="separator"></div>
            <ul class="uron">
                <li>Урон</li>
            </ul>
            <div class="separator"></div>
            <ul class="mf">
                <li>Мф. критических ударов</li>
                <li>Мф. против крит. ударов</li>
                <li>Мф. увертливости</li>
                <li>Мф. против увертлив.</li>
            </ul>
            <div class="separator"></div>
            <ul class="bron">
                <li>Броня головы</li>
                <li>Броня корпуса</li>
                <li>Броня пояса</li>
                <li>Броня ног</li>
            </ul>
        </div>
        <div class="c2">
            <div class="item_0">
                <ul style="width: 15px">
                    <li>Кабинка 1</li>
                </ul>
            </div>
        </div>
    </div>
</div>
<?php $this->beginWidget('bootstrap.widgets.TbModal', array(
    'id'=>'myModal',
    'htmlOptions' => array(
        //'style' => 'width:860px;height:700px;'
    ),
    'events' => array(
        'hidden' => 'js:function () {changeWindow(\'\', \'\', \'\', \'hidden\');}'
    )
)); ?>

<div class="modal-header">
    <a class="close" data-dismiss="modal">&times;</a>
    <h4></h4>
</div>

<div class="modal-body">
    <p></p>
</div>

<div class="modal-footer">
    <?php $this->widget('bootstrap.widgets.TbButton', array(
        'label'=>'Закрыть',
        'url'=>'#',
        'htmlOptions'=>array('data-dismiss'=>'modal'),
    )); ?>
</div>

<?php $this->endWidget(); ?>
<div id="fuzz">
    <div class="msgbox">
        Загружаем вещи...
        <img src="/themes/bootstrap/images/ajax-loader.gif">
    </div>
</div>
<script type="text/javascript">
    $(function(){
        $("#fuzz").css("height", $(document).height());
    });
    $(window).bind("resize", function(){
        $("#fuzz").css("height", $(window).height());

    });
</script>