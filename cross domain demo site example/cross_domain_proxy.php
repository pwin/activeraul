<?php

function get_payload(){
        if(isset($_POST['method']) && !empty($_POST['method'])){
                return $_POST['payload'];
        }
        else{
                return "error";
        }
}

function get_url(){
        if(isset($_POST['url']) && !empty($_POST['url'])){
                return $_POST['url'];
        }
        else{
                return "error";
        }
}

function get_type(){
        if(isset($_POST['type']) && !empty($_POST['type'])){
                return $_POST['type'];
        }
        else{
                return "error";
        }
}

function do_putRequest(){
        $payload = get_payload();
        $url = get_url();

        if(($payload == "error") || ($url == "error")){
                echo "error";
        }

        $opts = array('http' =>
                array(
                        'method'  => 'PUT',
                        'header'  => 'Content-type: application/xml',
                        'content' => $payload
                )
        );

        $context  = stream_context_create($opts);
        file_get_contents($url, false, $context);

        $opts = array('http' =>
                array(
                        'method'=>"GET",
                        'header'=>"Accept: application/xhtml+xml\r\n"
                )
        );

        $context = stream_context_create($opts);
        echo file_get_contents($url, false, $context);
}

function do_postRequest(){
        $payload = get_payload();
        $url = get_url();

        if(($payload == "error") || ($url == "error")){
                echo "error";
        }

        $opts = array('http' =>
                array(
                        'method'  => 'POST',
                        'header'  => 'Content-type: application/xml',
                        'content' => $payload
                )
        );

        $context  = stream_context_create($opts);
        file_get_contents($url, false, $context);

        $opts = array('http' =>                
				array(
                        'method'=>"GET",
                        'header'=>"Accept: application/xhtml+xml\r\n"
                )
        );

        $context = stream_context_create($opts);
        echo file_get_contents($url, false, $context);
}

function do_getRequest(){
        $url = get_url();
        $type = get_type();

        if(($url == "error") || ($url == "error")){
                echo "error";
        }

        if($type == 'rdf'){
                $type = "Accept: application/rdf+xml\r\n";
        }
        else if($type == 'html'){
                $type = "Accept: application/xhtml+xml\r\n";
        }

        $opts = array('http' =>
                array(
                'method'=>"GET",
                'header'=>$type
          )
        );

        $context = stream_context_create($opts);
        echo file_get_contents($url, false, $context);
}



if(isset($_POST['method']) && !empty($_POST['method'])){
    if($_POST['method'] == 'get'){
                do_getRequest();
        }
        if($_POST['method'] == 'post'){
                do_postRequest();
        }
        if($_POST['method'] == 'put'){
                do_putRequest();
        }
}
else{
        echo "error";
}

?>