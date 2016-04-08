<div class="tab_content">
<h1><?php echo Yii::t('app', 'Просмотр') . ' ' . GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
        'level',
        'stats',
        'mf',
        'hp',
        'mp',
        'armor',
        'strange',
        'agility',
        'intuition',
        'intellect',
        'wisdom',
        'increased:boolean',
        'min_damage',
        'max_damage',
        'possession_m',
	),
)); ?>

</div>