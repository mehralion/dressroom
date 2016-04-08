<?php /* @var $this Controller */ ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->theme->baseUrl; ?>/css/styles.css" />

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>

	<?php Yii::app()->bootstrap->register(); ?>
</head>

<body>

<?php if(Yii::app()->user->isAccess()): $this->widget('bootstrap.widgets.TbNavbar',array(
    'items'=>array(
        array(
            'class'=>'bootstrap.widgets.TbMenu',
            'items'=>array(
                array(
                    'label'=>'Примерочная',
                    'url'=>array('/site/index')
                ),
                array(
                    'label'=>'Менеджер вещей',
                    'url'=>array('/items/index'),
                    'visible' => Yii::app()->user->isAccess()
                ),
                array(
                    'label'=>'Уровень рун',
                    'url'=>array('/rune/level'),
                    'visible' => Yii::app()->user->isAccess()
                ),
                array(
                    'label'=>'Админка',
                    'url'=>array('/moder/index'),
                    'visible' => Yii::app()->user->isAdmin()
                ),
            ),
        ),
    ),
)); endif; ?>

<div class="container" id="page">

	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('bootstrap.widgets.TbBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->theme->baseUrl; ?>/css/briga.css" />
	<?php echo $content; ?>

	<div class="clear"></div>

    <div id="footer">
    </div><!-- footer -->

</div><!-- page -->

</body>
</html>
