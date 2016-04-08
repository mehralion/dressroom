<div class="tab_content">
<h1><?php echo Yii::t('app', 'Добавить вещь'); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>
    </div>