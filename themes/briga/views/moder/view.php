<h1>Просмотр модератора <?php echo $model->login; ?></h1>

<?php $this->widget('bootstrap.widgets.TbDetailView',array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'login',
	),
)); ?>
