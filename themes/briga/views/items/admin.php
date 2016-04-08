<div class="tab_content">
<h1><?php echo Yii::t('app', 'Вещи'); ?></h1>
<a href="<?php echo Yii::app()->createUrl('/items/create') ?>">Добавить</a>
<?php $this->widget('bootstrap.widgets.TbGridView', array(
	'id' => 'obk-items-grid',
    'type'=>'striped bordered condensed',
	'dataProvider' => $model->search(),
	'filter' => $model,
	'columns' => array(
		array(
            'name' => 'img',
            'type' => 'raw',
            'value' => 'CHtml::image(Yii::app()->baseUrl."/images/dressroom/".$data->img)'
        ),
		array(
            'name' => 'category_id',
            'value' => 'Category::model()->findByPk($data->category_id)->attributes["name"]',
            'filter' => GxHtml::listDataEx(Category::model()->findAllAttributes(null, true))
        ),
		'name',
		'price_reputation',
		'price',
		'need_level',
		/*
		'nsila',
		'nlovk',
		'ninta',
		'nvinos',
		'nnoj',
		'ntopor',
		'nmech',
		'ndubina',
		'nalign',
		'minu',
		'maxu',
		'gsila',
		'glovk',
		'ginta',
		'gintel',
		'gmudra',
		'ghp',
		'mfkrit',
		'mfakrit',
		'mfuvorot',
		'mfauvorot',
		'gnoj',
		'gtopor',
		'gdubina',
		'gmech',
		'img',
		'bron1',
		'bron2',
		'bron3',
		'bron4',
		'massa',
		'freestats',
		'freemf',
		'usil_uron',
		'usil_bron',
		'usil_max_mf',
		array(
					'name' => 'is_art',
					'value' => '($data->is_art === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		array(
					'name' => 'can_mf',
					'value' => '($data->can_mf === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		array(
					'name' => 'can_ap',
					'value' => '($data->can_ap === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		array(
					'name' => 'can_podgon',
					'value' => '($data->can_podgon === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		*/
        array(
            'class'=>'bootstrap.widgets.TbButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
        ),
	),
)); ?>
    </div>