<div class="tab_content">
<h1><?php echo Yii::t('app', 'Уровень рун'); ?></h1>
<a href="<?php echo Yii::app()->createUrl('/rune/create') ?>">Добавить</a>
<?php $this->widget('bootstrap.widgets.TbGridView', array(
	'id' => 'rune-level-grid',
    'type'=>'striped bordered condensed',
	'dataProvider' => $model->search(),
	'columns' => array(
        'level',
		array(
            'name' => 'info',
            'value' => '$data->getInfo()',
            'type' => 'raw'
        ),
        array(
            'class'=>'bootstrap.widgets.TbButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
        ),
	),
)); ?>
    </div>