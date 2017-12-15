// ==UserScript==
// @name       Oscar host sign in
// @include     *bc_demo
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// ==/UserScript==
//$('#username').datepicker();
$('#username').val('demo')
$('#password').val('Demo1234')
$('#pin').val('1234')

/*
$('head').append('<link '
+ 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/start/jquery-ui.min.css" '
+ 'rel="stylesheet" type="text/css">'
);
*/


//this.onload = function(){myFunction("LOAD")};

//$(this).on('unload', myFunction("UNLOAD"))

//document.addEventListener('beforeunload', myFunction("UNLOAD"));
//document.addEventListener('blur', myFunction("UNLOAD"));

//document.onreadystatechange (alert(document.readyState))
/*
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      alert(this.responseText);
    if (this.readyState == 4 && this.status == 200) {
  alert(this.responseText);
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
  */