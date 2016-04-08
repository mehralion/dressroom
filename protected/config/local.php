<?php

return CMap::mergeArray(
// наследуемся от main.php
    require(dirname(__FILE__).'/main.php'),
    array(
        'components' => array(
            'db' => array(
            'connectionString' => 'mysql:host=localhost;dbname=prim',
            'emulatePrepare' => true,
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
            'enableParamLogging' => true,
            'enableProfiling' => true,
        ),
            'image' => array(
                'class' => 'application.extensions.image.CImageComponent',
                'driver' => 'GD',
            ),
        )
    )
);
?>