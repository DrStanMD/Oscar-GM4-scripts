// ==UserScript==
// @name        pagescraper and timestamp
// @include     *casemgmt/forward.jsp?action=view&demographicNo=*
// @exclude     *10.8.1.56*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==
//adds demographic data to the echart header. useful for filling out forms so you don't have to click back and forth between master and echart. need to edit the "url:" address to reflect the master page for your own OSCAR URL.

//this.onload = function(){alert(Date())};
//window.onunload = function(){alert(Date())};

/*
$(window).on('beforeunload', function(){
    return 'Are you sure you want to leave?';
});
*/
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')
var demoNo = JSON.stringify(location.href);
demoNo = demoNo.substring(demoNo.indexOf('demographicNo') + 14, demoNo.indexOf('&provid'));
var city = '';
var address = '';
var DOB = '';
var HCN = '';
var HCVC = '';
var fName = '';
var lName = '';
var prov = '';
var postalCode = '';
var postalCode2 = '';
var sex = '';
var phone = '';
var rostered = '';
var rostered3 = '';
var rostered2 = '';
var email = '';
var cell = '';
var Age = ''
var fulladdress = ''
var work = ''
//alert( vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&displaymode=edit&dboperation=search_detail')
$.ajax({
  url: vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&displaymode=edit&dboperation=search_detail',
  dataType: 'html',
  success: function (data) {
    var demographics = [
    ];
    $(data).find('div.demographicSection li').each(function () {
      demographics.push({
        'label': $(this).children('.label').text(),
        'text': $(this).children('.info').text()
      });
    });

    var demoStr = JSON.stringify(demographics);
    console.log(demoStr);
   // alert(demoStr)
    //===========Cookies===============
    function setCookie(cname, cvalue, exdays, cpath)
    {
      var d = new Date();
      //d.setTime(d.getTime()+(exdays*24*60*60*1000));
      d.setTime(d.getTime() + (exdays * 5000));
      var expires = 'expires=' + d.toGMTString();
      document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
    }
    work = demoStr.substring(demoStr.indexOf('Phone(W):') + 19, demoStr.indexOf('"},{"label":"Cell Phone:'));
    email = demoStr.substring(demoStr.indexOf('Email:') + 16, demoStr.indexOf('"},{"label":"Newsletter:"'));
    cell = demoStr.substring(demoStr.indexOf('Cell Phone:') + 21, demoStr.indexOf('"},{"label":"Address'));
    lName = demoStr.substring(demoStr.indexOf('Last Name:') + 20, demoStr.indexOf('"},{"'));
    fName = demoStr.substring(demoStr.indexOf('First Name:') + 21, demoStr.indexOf('"},{"label":"Title:'));
    sex = demoStr.substring(demoStr.indexOf('Sex:') + 14, demoStr.indexOf('Sex:') + 15);
    DOB = demoStr.substring(demoStr.indexOf('DOB:') + 5, demoStr.indexOf('DOB:') + 15);
    Age = demoStr.substring(demoStr.indexOf('"label":"Age:') + 23, demoStr.indexOf('(DOB:'));
    prov = demoStr.substring(demoStr.indexOf('Province :","text') + 20, demoStr.indexOf('Province :","text') + 22);
    postalCode = demoStr.substring(demoStr.indexOf('Postal :","text') + 18, demoStr.indexOf('Postal :","text') + 21);
    postalCode2 = demoStr.substring(demoStr.indexOf(postalCode) + 3, demoStr.indexOf(postalCode) + 7);
    postalCode2 = postalCode2.trim();
    postalCode2 = postalCode2.substring(0, 3);
    phone = demoStr.substring(demoStr.indexOf('Phone(H):') + 19, demoStr.indexOf('"},{"label":"Phone(W):'));
    address = demoStr.substring(demoStr.indexOf('Address:","text":"') + 18, demoStr.indexOf('"},{"label":"City:'));
    city = demoStr.substring(demoStr.indexOf('City:","text":"') + 15, demoStr.indexOf('tProvince') - 44);
    fulladdress = address + '<br>' + city + ', ' + prov + '.<br>' + postalCode + ' ' + postalCode2
    //alert(fulladdress)
    HCN = demoStr.substring(demoStr.indexOf('Health Ins. #:') + 18, demoStr.indexOf('},{"label":"HC Type:"'));
    HCVC = HCN.substring(HCN.length - 3, HCN.length - 1);
    HCN = HCN.substring(6, 16);
    res = HCN.slice(0, 4)
    res = res + ' ' + HCN.slice(4, 7)
    res = res + ' ' + HCN.slice(7)
    HCN = res + ' ' + prov
    // alert(HCN)
    rostered = demoStr.substring(demoStr.indexOf('Roster Status') + 24);
    rostered2 = rostered.charAt(0);
    rostered3 = rostered.charAt(1);
    rostered = rostered2.concat(rostered3);
    setCookie('qemail', email, 360, 'path=/');
    setCookie('qcell', cell, 360, 'path=/');
    setCookie('qphone', phone, 360, 'path=/');
    setCookie('qfName', fName, 360, 'path=/');
    setCookie('qlName', lName, 360, 'path=/');
    setCookie('qDOB', DOB, 360, 'path=/');
    setCookie('qAge', Age, 360, 'path=/');
    setCookie('qsex', sex, 360, 'path=/');
    setCookie('qPHN', HCN, 360, 'path=/');
    setCookie('qfulladdress', fulladdress, 360, 'path=/');
    setCookie('qwork', work, 360, 'path=/');
    console.log(rostered);
    var header = document.getElementById('encounterHeader');
    var headerExtra1 = 'Add: '
    var headerExtra2 = 'DOB: '
    var headerExtra3 = 'File#: '
    var headerExtra4 = 'HC: '
    header.innerHTML += ('<br>' + headerExtra1.bold() + address + ',' + city + ',' + postalCode + postalCode2 + ' '
    + headerExtra2.bold() + DOB + ' ' + headerExtra3.bold() + demoNo + ' ' + headerExtra4.bold()
    + HCN + HCVC + '   email: ' + email + '   '
    + '<a href="mailto:' + email + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
    );
  }
});
