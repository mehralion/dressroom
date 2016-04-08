<?php
$this->breadcrumbs=array(
	'Moders',
);

$this->menu=array(
	array('label'=>'Create Moder','url'=>array('create')),
	array('label'=>'Manage Moder','url'=>array('admin')),
);
?>

<h1>Moders</h1>

<?php $this->widget('bootstrap.widgets.TbListView',array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
