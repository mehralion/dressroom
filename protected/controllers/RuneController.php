<?php

class RuneController extends GxController
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
            'model' => $this->loadModel($id, 'RuneLevel'),
        ));
    }

    public function actionCreate() {
        $model = new RuneLevel();
        if (isset($_POST['RuneLevel'])) {
            $model->setAttributes($_POST['RuneLevel']);

            if ($model->save()) {
                if (Yii::app()->getRequest()->getIsAjaxRequest())
                    Yii::app()->end();
                else
                    $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('create', array( 'model' => $model));
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'RuneLevel');


        if (isset($_POST['RuneLevel'])) {
            $model->setAttributes($_POST['RuneLevel']);

            if ($model->save()) {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }
        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (Yii::app()->getRequest()->getIsPostRequest()) {
            $this->loadModel($id, 'RuneLevel')->delete();

            if (!Yii::app()->getRequest()->getIsAjaxRequest())
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
    }

    public function actionLevel() {
        $model = new RuneLevel('search');
        $model->unsetAttributes();

        if (isset($_GET['RuneLevel']))
            $model->setAttributes($_GET['RuneLevel']);
        $this->render('admin', array(
            'model' => $model,
        ));
    }
}