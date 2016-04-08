<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
    /**
     * @var string the default layout for the controller view. Defaults to 'column1',
     * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
     */
    public $layout = '//layouts/main';
    public $menu = array();
    public $pageHead = '';
    public $breadcrumbs = array();

    protected function beforeAction($action)
    {
        //Yii::app()->request->setBaseUrl('/');
        parent::beforeAction($action);
        if (Yii::app()->request->getIsAjaxRequest()) {
            // Extract client script
            $clientScript = Yii::app()->clientScript;
            $clientScript->scriptMap = array(
                //'jquery-1.7.1.min.js' => false,
                'jquery-1.7.1.js' => false,
                'jquery.js' => false,
            );
        } else
            Yii::app()->clientScript->registerCoreScript('jquery-1.7.1');

        return true;
    }
}