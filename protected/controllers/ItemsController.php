<?php

class ItemsController extends GxController
{
    public function filters()
    {
        /*return array(
            'accessControl',
        );*/
    }

    public function accessRules()
    {
        return array(
            array('allow',
                'actions' => array(
                    'index',
                    'view',
                    'create',
                    'update',
                    'delete',
                ),
                'expression' => 'Yii::app()->user->isAccess()',
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'ObkItems'),
        ));
    }

    public function actionCreate() {
        $model = new ObkItems;
        if (isset($_POST['ObkItems'])) {
            $model->setAttributes($_POST['ObkItems']);

            $t = Yii::app()->db->beginTransaction();
            try {
                $image = CUploadedFile::getInstance($model,'img');
                if($image)
                    $model->img = uniqid().'.'.$image->extensionName;

                if ($model->save()) {
                    if(!$image || ($image && $image->saveAs(Yii::app()->basePath.'/../images/dressroom/'.$model->img))) {
                        $t->commit();
                        $this->redirect(array('view', 'id' => $model->id));
                    }
                }

                $t->rollback();
            } catch (Exception $ex) {
                $t->rollback();
            }
        }
        $this->render('create', array( 'model' => $model));
    }

    public function actionUpdate($id) {
        /** @var ObkItems $model */
        $model = $this->loadModel($id, 'ObkItems');
        $oldImg = $model->img;

        if (isset($_POST['ObkItems'])) {
            $model->setAttributes($_POST['ObkItems']);
            $model->img = $oldImg;

            $t = Yii::app()->db->beginTransaction();
            try {
                $image = CUploadedFile::getInstance($model,'img');
                if($image)
                    $model->img = uniqid().'.'.$image->extensionName;

                if ($model->save()) {
                    if(!$image || ($image && $image->saveAs(Yii::app()->basePath.'/../images/dressroom/'.$model->img))) {
                        $t->commit();
                        $this->redirect(array('view', 'id' => $model->id));
                    }
                }

                $t->rollback();
            } catch (Exception $ex) {
                $t->rollback();
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (Yii::app()->getRequest()->getIsPostRequest()) {
            $this->loadModel($id, 'ObkItems')->delete();

            if (!Yii::app()->getRequest()->getIsAjaxRequest())
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
    }

    public function actionIndex() {
        $model = new ObkItems('search');
        $model->unsetAttributes();

        if (isset($_GET['ObkItems']))
            $model->setAttributes($_GET['ObkItems']);
        $this->render('admin', array(
            'model' => $model,
        ));
    }
}