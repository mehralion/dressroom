<?php

// this file must be stored in:
// protected/components/WebUser.php

class WebUser extends CWebUser
{

    public function init()
    {
        parent::init();
        if(isset($_SESSION['siteUser']) && $this->isGuest) {
            //$_SESSION['siteUser'] = iconv('windows-1251', 'utf-8', $_SESSION['siteUser']);
            $identity = new UserIdentity($_SESSION['siteUser'], null);
            $identity->authenticate();
            $duration = 3600*24;
            $this->login($identity, $duration);
        } elseif(!isset($_SESSION['siteUser']))
            $this->logout();
    }

    // Store model to not repeat query.
    private $_model;

    // Return first name.
    // access it by Yii::app()->user->first_name
    function getName()
    {
        $user = $this->loadUser($this->id);
        if(!is_null($user))
            return Base::buildLogin($user->align, $user->clan, $user->login, $user->info);
        else
            return false;
    }

    function getClan()
    {
        $user = $this->loadUser($this->id);
        if(!is_null($user))
            return $user->clan;
        else
            return false;
    }

    // Load user model.
    protected function loadUser($id=null)
    {
        if($this->_model===null)
        {
            //if($id!==null)
             //   $this->_model=Users::model()->findByPk($id);
        }
        return $this->_model;
    }

    private $_moderLogin = array(
        'СпокоенКакЛед',
        'ЭльдарБек',
        '-Ковальски-'
    );

    private $_moderFromDB = array(

    );

    /**
     * @return array
     */
    private function getModerList()
    {
        if(count($this->_moderFromDB) > 0)
            return CMap::mergeArray($this->_moderFromDB, $this->_moderLogin);

        /** @var Moder[] $moderList */
        $moderList = Moder::model()->findAll();
        foreach($moderList as $model)
            $this->_moderFromDB[] = $model->login;

        return CMap::mergeArray($this->_moderFromDB, $this->_moderLogin);
    }

    public function isAccess()
    {
        return true;
        return !$this->isGuest && in_array($this->id, $this->getModerList());
    }

    public function isAdmin()
    {
        return !$this->isGuest && in_array($this->id, $this->_moderLogin);
    }
}