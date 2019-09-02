// ==UserScript==
// @name     Email and Next appointment for tickler
// @version  15.1
// @include *tickler/ticklerAdd.jsp?demographic_no*
// @include *tickler/ForwardDemographicTickler.do*
// @include */tickler/ticklerAdd.jsp*
// @grant    none
// ==/UserScript==
//========Get Path============
var demo_no = ''
var myemail = ''
var myappointment = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
var searchbutton = document.getElementsByName('Submit');
//$(searchbutton[0]).css('background-color', 'yellow')
var appbutton = '<button type="button" id="appbuttonId">Next appointment</button>'
function getAppointment() {
  //alert('HI')
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail' //window.open(newURL)
  //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText
      if (!str) {
        return;
      }
      var myReString = '<span style="margin-left: 20px;font-style:italic">' + '(.|[\n])*' //var myReString = '<span class="label">' + measure + '(.|[\n])*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() //
        //alert(y)
        var z = y.indexOf('Next Appointment')
        var mycode = y.substring(z + 18) //alert(mycode)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2)
        myappointment = mycode3
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}

function validateEmail(emailField) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var x = re.test(String(emailField)) //alert(x)
  if (x == false)
  {
    alert('Invalid Email Address');
    return false;
  } 
  else
  {
    //alert(emailField);
    var mailto_link = 'mailto:' + myemail + '?Subject=Confidential medical information'
    window = window.open(mailto_link, 'emailWindow')
    return true;
  }
}
function do_email() {
  //alert(this.value)
  demo_no = this.value
  getMeasures('Email')
  if (myemail) {
    validateEmail(myemail)
  } 
  else {
    alert('no email address on file')
  }
} //******get demographic email****

demo_no = params.demographic_no
if (demo_no) {
  //alert(demo_no)
  var myemail = ''
  function getMeasures(measure) {
    xmlhttp = new XMLHttpRequest();
    var pathArray = window.location.pathname.split('/');
    var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail' //window.open(newURL)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var str = xmlhttp.responseText
        if (!str) {
          return;
        }
        var myReString = '<span class="label">' + measure + '(.|[\n])*'
        var myRe = new RegExp(myReString, 'g');
        var myArray
        while ((myArray = myRe.exec(str)) !== null) {
          y = myArray.toString() //alert(y)
          var z = y.indexOf('info')
          var mycode = y.substring(z + 6)
          var mycode2 = mycode.indexOf('</span>')
          var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
          myemail = mycode3
        }
      }
    }
    xmlhttp.open('GET', newURL, false);
    xmlhttp.send();
  }
  $(document).ready(function () {
    var mytextarea = document.getElementsByName('textarea');
    //getMeasures('Email')
    //alert(myemail)
    getAppointment() //alert(myappointment)
    if (/\S/.test(myappointment)) {
      $(searchbutton[0]).after('  ' + appbutton)
      $('#appbuttonId').text('Next office visit is ' + myappointment)
      document.getElementById('appbuttonId').setAttribute('style', 'font-size:14px;');
      $('#appbuttonId').css('background-color', '#08e8de')
      if(mytextarea[0].value=="")
      {mytextarea[0].value = '**Next office visit is ' + myappointment.trim() + '.' 
      }
      else{
      mytextarea[0].value = mytextarea[0].value + '  \n**Next office visit is ' + myappointment.trim() + '.' 
      }
      mytextarea[0].setSelectionRange(0, 0);
      mytextarea[0].value = '\n' + mytextarea[0].value
      mytextarea[0].setSelectionRange(0, 0);
      
    }
  })
}
