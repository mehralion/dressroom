<?php

// This is the configuration for yiic console application.
// Any writable CConsoleApplication properties can be configured here.
return array(
    'aliases' => array(
        'webroot' => realpath(__DIR__.'/../..'),
    ),
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'My Console Application',
    'commandMap' => array(
        'packages' => array(
            'class' => 'ext.yuicompressor.PackagesCommand'
        ),
        // ...
    ),
    'components' => array(
        'assetManager'=>array(
            'class'     =>'CAssetManager',
            'basePath'  =>realpath(__DIR__.'/../../assets'),
            'baseUrl'   =>'/assets',
        ),
        'request' => array(
            'baseUrl' => '',
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
        // ...
    ),
);