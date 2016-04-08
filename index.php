<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
date_default_timezone_set('Europe/Moscow');

$webRoot=dirname(__FILE__);

// Если хост равен localhost, то включаем режим отладки и подключаем отладочную
// конфигурацию

if($_SERVER['SERVER_ADDR']=='192.168.33.13'){
    define('YII_DEBUG', true);
    ini_set("display_errors", 0);
    $yii=dirname(__FILE__).'/../../frameworks/yii/yii-1.1.15/framework/YiiBase.php';
    $config=dirname(__FILE__).'/protected/config/local.php';
} else {
    define('YII_DEBUG', true);
    ini_set("display_errors", 0);
    $yii=dirname(__FILE__).'/vendor/yiisoft/yii/framework/YiiBase.php';
    $config=dirname(__FILE__).'/protected/config/main.php';
}
require_once($yii);
/**
 * Class Yii
 *
 */
class Yii extends YiiBase
{
    /**
     * @static
     * @return WebApplication
     */
    public static function app()
    {
        return parent::app();
    }
}

/**
 * Class WebApplication
 *
 * @property WebUser $user
 * @property Curl $curl
 * @property CImageHandler $ih
 * @property CImageComponent $image
 */
class WebApplication extends CWebApplication
{

}

/** @var WebApplication $app */
$app = Yii::createWebApplication($config);
$app->run();