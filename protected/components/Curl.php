<?php
/**
 * Created by JetBrains PhpStorm.
 * User: СпокоенКакЛед
 * Date: 07.08.12
 * Time: 18:47
 * To change this template use File | Settings | File Templates.
 */
class Curl
{
    private $curl;

    public function __construct()
    {
        $this->curl = curl_init();
    }

    public function useCurl($url, $post = null)
    {
        curl_setopt($this->curl, CURLOPT_URL, $url);
        curl_setopt($this->curl, CURLOPT_HEADER, true);
        curl_setopt($this->curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko/20100101 Firefox/11.0");
        //curl_setopt($this->curl, CURLOPT_COOKIEJAR, $this->cookiePath);
        //curl_setopt($this->curl, CURLOPT_COOKIEFILE, $this->cookiePath);
        //curl_setopt($this->curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        if (isset($post)) {
            curl_setopt($this->curl, CURLOPT_POST, true);
            curl_setopt($this->curl, CURLOPT_POSTFIELDS, $post);
        }
        $content = curl_exec($this->curl);
        $err = curl_errno($this->curl);
        $errmsg = curl_error($this->curl);
        $header = curl_getinfo($this->curl);

        $header['errno'] = $err;
        $header['errmsg'] = $errmsg;
        $header['content'] = $content;
        return $header;
    }

    public function __destruct()
    {
        curl_close($this->curl);
    }
}
