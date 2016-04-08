<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
Yii::setPathOfAlias('bootstrap', dirname(__FILE__).'/../extensions/bootstrap');
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Бригада',

	// preloading 'log' component
	'preload'=>array(
        'log',
    ),

	// autoloading model and component classes
	'import'=>array(
		'application.helpers.*',
		'application.models.*',
		'application.components.*',
        'application.extensions.*', // giix components
        'ext.giix-components.*', // giix components
        'application.components.Base.*',
	),

    'theme' => 'briga',
    'modules' => array(
        'rbam'=> array(
            'authAssignmentsManagerRole'=>'authAssignmentsManager',
            'authItemsManagerRole'=>'authAssignmentsManager',
            'authenticatedRole'=>'authAssignmentsManager',
            'showMenu'=>true,
            'userClass'=>'User',
            'userIdAttribute'=>'id',
            'userNameAttribute'=>'login',
            'pageSize'=>30,
        ),
        // uncomment the following to enable the Gii tool

        'gii' => array(
            'class' => 'system.gii.GiiModule',
            'password' => '123',
            // If removed, Gii defaults to localhost only. Edit carefully to taste.
            'ipFilters' => array('127.0.0.1', '::1'),
            'generatorPaths'=>array(
                'bootstrap.gii',
            ),
        ),
        'admin' => array(),
    ),

	'defaultController'=>'site',
    'language' => 'ru',
    'sourceLanguage' => 'ru',

	// application components
	'components'=>array(
        'ih'=>array('class'=>'CImageHandler'),
        'bootstrap' => array(
            'class' => 'ext.bootstrap.components.Bootstrap', // assuming you extracted bootstrap under extensions
        ),
        'mail' => array(
            'class' => 'application.extensions.yii-mail.YiiMail',
            //'transportType'=>'smtp', /// case sensitive!
            /* 'transportOptions'=>array(
              'host'=>'smtp.gmail.com',
              'username'=>'yourgoogleemail@gmail.com',
              // or email@googleappsdomain.com
              'password'=>'yourgooglemailpassword',
              'port'=>'465',
              'encryption'=>'ssl',
              ), */
            'viewPath' => 'webroot.themes.classic.views.mail',
            'logging' => true,
            'dryRun' => false
        ),
        'clientScript' => array(
            'class' => 'ext.yuicompressor.PackageCompressor',
            'scriptMap' => array(
                'jquery.js' => false,
                'jquery.min.js' => false,
            ),
            'packages' => array( //register your packages
                'jquery-1.7.1' => array(
                    'baseUrl' => '/js/',
                    'js' => array('jquery-1.7.1.js'),
                ),
                'j-ui' => array(
                    'baseUrl' => '//ajax.googleapis.com/ajax/libs/jqueryui/1/',
                    'js' => array('jquery-ui.js', 'i18n/jquery-ui-i18n.min.js'),
                    'css' => array('themes/pepper-grinder/jquery-ui.css'),
                ),
                'prim' => array(
                    'baseUrl' => '/themes/briga/js/dress',
                    'js' => array(
                        'change.js',
                        'container.js',
                        'dummy.js',
                        'hint.js',
                        'item.js',
                        'items.js',
                        'menu.js',
                        'message.js',
                        'result.js',
                        'selected.js',
                        'selectedRune.js',
                        'start.js',
                        'tabs.js',
                        'vars.js',
                        'windows.js',
                    ),
                )
            ),
        ),
        'user'=>array(
            // enable cookie-based authentication
            'allowAutoLogin' => true,
            'loginUrl' => array('/site/login'),
            'returnUrl' => array('/site/index'),
            'class' => 'WebUser',
        ),
		// uncomment the following to use a MySQL database

        'db' => array(
            'connectionString' => 'mysql:host=88.198.205.122;dbname=prim',
            'username' => 'blogdb',
            'password' => 'zmtbqYeIRZaNwjqyOIio',
            'emulatePrepare' => true,
            'charset' => 'utf8',
            'enableParamLogging' => true,
            'enableProfiling' => true,
        ),

		'errorHandler'=>array(
			// use 'site/error' action to display errors
            'errorAction'=>'/site/error',
        ),
        'urlManager'=>array(
        	'urlFormat'=>'path',
            'showScriptName' => false,
            'urlSuffix' => '.html',
        	'rules'=>array(
                '/gii/' => array('/gii/default/index'),
                '/rbam/' => array('/rbam/rbam/index'),
				'<_a>' => array('/site/<_a>'),
                '<_c>/<_a>' => array('<_c>/<_a>'),
                '<_m>/<_c>/<_a>' => array('<_m>/<_c>/<_a>'),
        	),
        ),
        'authManager' => array(
            'class' => 'CDbAuthManager',
            'connectionID' => 'db',
            'defaultRoles' => array('Authenticated', 'Guest'),
        ),
		'log'=>array(
            'class'=>'CLogRouter',
            'routes'=>array(
                array(
                    'class'=>'CFileLogRoute',
                    'levels'=>'error, warning',
                ),
                /*array(
                    'class'=>'ext.yii-debug-toolbar.YiiDebugToolbarRoute',
                    'ipFilters'=>array('127.0.0.1'),
                ),*/
            ),
		),
		'image' => array(
                'class' => 'application.extensions.image.CImageComponent',
                'driver' => 'GD',
            ),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>require(dirname(__FILE__).'/params.php'),
);