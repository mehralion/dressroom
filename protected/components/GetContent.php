<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class GetContent
{
    public function isRealPlayer($login) {
        $login = str_replace(' ', '%20', $login);
        $login = iconv('UTF-8', 'windows-1251', $login);
        $info = iconv('windows-1251', 'UTF-8', file_get_contents('http://oldbk.com/inf.php?login=' . $login));
        if (preg_match('/For AD Registration/ui', $info))
            return true;
        else
            return false;
    }

    private $alignPattern = 'http:\/\/i.oldbk.com\/i\/align_(.*?)\.gif';
    private $clanPattern = 'http:\/\/i.oldbk.com\/i\/klan\/(.*?)\.gif';
    private $infoPattern = 'href=inf.php\?([0-9]*)';
    public function isRealPlayer2($login, $s = true) {
        $align = array();
        $clan = array();
        $infoNum = array();
        $level = array();

        $result = array(
            'align' => 0,
            'clan' => '',
            'level' => 0,
            'info' => 0
        );

        $login = str_replace(' ', '%20', $login);
        $login = iconv('UTF-8', 'windows-1251', $login);
        $info = iconv('windows-1251', 'UTF-8', file_get_contents('http://oldbk.com/inf.php?login=' . $login));
        $content = str_replace(array("\r\n", "  ", "\t", "\n"), array("", "", "", ""), $info);

		$status = true;
		if($s)
			$status = preg_match('/For DIL Registration/ui', $content);
        if ($status){

            if(preg_match('/'.$this->alignPattern.'/ui', $content, $align))
                $result['align'] = $align[1];
            if(preg_match('/'.$this->clanPattern.'/ui', $content, $clan))
                $result['clan'] = $clan[1];
            if(preg_match('/'.$this->infoPattern.'/ui', $content, $infoNum))
                $result['info'] = $infoNum[1];
            if(preg_match('/\[([0-9]*)\](?:.*)inf.php/ui', $content, $level))
                $result['level'] = $level[1];

            return $result;
        }
        else
            return false;
    }

    public static function getPage($login)
    {
        $login = str_replace(' ', '%20', $login);
        $login = iconv('UTF-8', 'windows-1251', $login);
        $info = iconv('windows-1251', 'UTF-8', @file_get_contents('http://oldbk.com/inf.php?login=' . $login.'&showallunicgifts=1&showallgifts=1&showallflowers=1&showallmedals=1'));
        $content = str_replace(array("\r\n", "\t", "\n"), array("", "", ""), $info);
        $city = 'avaloncity';
        if(preg_match('/CapitalCity/ui', $info))
            $city = 'capitalcity';
        $content = preg_replace(array('/<HTML>(.+?)<\/head>|<script(.+?)<\/script>|<\/BODY><\/HTML>/ui','/href=inf.php\?([0-9]*)/ui', '/logs.php\?log=([0-9]*)/'), array('','href="http://oldbk.com/inf.php?${1}"', 'http://'.$city.'.oldbk.com/logs.php?log=${1}'),$content);
        return $content;
    }
    public static function getItems($login)
    {
        $login = str_replace(' ', '%20', $login);
        $login = iconv('UTF-8', 'windows-1251', $login);
        $info = iconv('windows-1251', 'UTF-8', @file_get_contents('http://oldbk.com/inf.php?login=' . $login.'&short=1'));
        $content = str_replace(array("\r\n", "\t", "\n"), array(";", ";", ";"), $info);
        //$content = $info;
        $city = 'avaloncity';
        if(preg_match('/CapitalCity/ui', $info))
            $city = 'capitalcity';
        $content = preg_replace(array('/<HTML>(.+?)<\/head>|<script(.+?)<\/script>|<\/BODY><\/HTML>/ui','/href=inf.php\?([0-9]*)/ui', '/logs.php\?log=([0-9]*)/'), array('','href="http://oldbk.com/inf.php?${1}"', 'http://'.$city.'.oldbk.com/logs.php?log=${1}'),$content);
        return $content;
    }
}