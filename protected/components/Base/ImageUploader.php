<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 25.09.12
 * Time: 18:17
 * To change this template use File | Settings | File Templates.
 */
class ImageUploader
{
    public function upload($path, $filename, $uploader)
    {
        if (!file_exists($path)) {
            mkdir($path);
            mkdir($path.'thumbs/');
            mkdir($path.'thumbs_small/');
        }
        $uploader->saveAs($path.$filename);
        //Используем функции расширения CImageHandler;
        $ih = new CImageHandler();
        Yii::app()->ih
            ->load($path.$filename)
            ->thumb('200', false)
            ->save($path . 'thumbs/' . $filename)
            ->reload()
            ->thumb('50', '50')
            ->save($path . 'thumbs_small/' . $filename)
            ->reload()
            ->thumb('800', '800')
            ->save($path . $filename)
        ;
    }
}
