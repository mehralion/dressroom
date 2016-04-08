<div class="tab_content">
<h1><?php echo Yii::t('app', 'Update') . ' Уровень ' . GxHtml::encode($model->level) . ' ' . GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>
    </div>