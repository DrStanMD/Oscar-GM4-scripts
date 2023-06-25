// ==UserScript==
// @name        COPSBC Doctor info
// @namespace   Stanscripts
// @description Get COPSBC Doctor info
// @include     *cpsbc.ca/public/registrant-directory*
// @include     *oscarConsultationRequest/config/AddSpecialist.jsp*
// @include     *provider/providercontrol.jsp?year*
// @include     *provider/receptionistfindprovider.jsp*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==


//=====Get Parameters============
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

//====Cookies=======
function setCookie(cname, cvalue, exdays, cpath) {
    var d = new Date();
    //d.setTime(d.getTime()+(exdays*24*60*60*1000));
    d.setTime(d.getTime() + (exdays * 5000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; " + cpath
}
//setCookie("homephone",qqhomephone,360,"domain=example.com");

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ("https://" + location.host + "/" + firstElement + "/")
//alert(vPath)


var teststring = window.location.toString()

if (teststring.indexOf("provider/providercontrol.jsp") > -1) {
    var input118 = document.createElement('input');
    input118.type = 'button';
    input118.value = 'College';
    input118.onclick = showAlert118;
    input118.id = 'input118'
    input118.setAttribute('style', 'font-size:18px;position:fixed;top:100px;right:0px;');
    document.body.appendChild(input118);
    document.getElementById('input118').style.backgroundColor = 'pink';

    function showAlert118() {
        window.open("https://www.cpsbc.ca/public/registrant-directory?vPath=" + vPath)
    }

}

if (teststring.indexOf("public/registrant-directory") > -1) {
    //alert(params.vPath)
    if (params.vPath) {
        setCookie("myPath", params.vPath, 360, "domain=www.cpsbc.ca");
        //alert(getCookie("myPath"))
    }
}


if (teststring.indexOf("registrant-directory/search-result") > -1) {
    //alert(getCookie("myPath"))

    var discipline = ($('.ps-contact__element > span:nth-child(2)').html())
    var collegeID = document.getElementsByClassName('mspNumber')[0].innerHTML.split(" ")[1]
    var name = document.getElementsByClassName('directory-profile--name')[0].innerHTML.split(",")
    var lname = name[0]
    var fname = name[1]

    var all = document.getElementsByClassName('address-item')[0].textContent
    all = all.replace(/\s+/g, ' ').trim()
    all = all.toString()

    var all = all.split("Phone:")
    var address = all[0]

    var phone = (all[1].split("Fax:")[0])
    var fax = (all[1].split("Fax:")[1])

    var input = document.createElement('input');
    input.type = 'button';
    input.id = 'input'
    input.value = 'Copy Details';
    input.onclick = showAlert;
    input.setAttribute('style', 'font-size:18px;position:fixed;top:0px;left:0px;');
    document.body.appendChild(input);
    document.getElementById('input').style.backgroundColor = 'lime';

    function showAlert() {
      window.open(getCookie("myPath") + "/oscarEncounter/oscarConsultationRequest/config/AddSpecialist.jsp?cID=" + collegeID + "&cdiscipline=" + discipline + "&caddress=" + address + "&clname=" + lname + "&cfname=" + fname + "&cphone=" + phone + "&cfax=" + fax)

    }
}

var teststring = window.location.toString()

if (teststring.indexOf("oscarConsultationRequest/config/AddSpecialist.jsp") > -1) {
    var input = document.createElement('input');
    input.type = 'button';
    input.id = 'input'
    input.value = 'Paste Details';
    input.onclick = showAlert;
    input.setAttribute('style', 'font-size:18px;position:fixed;top:0px;left:0px;');
    document.body.appendChild(input);
    document.getElementById('input').style.backgroundColor = 'lime';

    function showAlert() {
        var address = params.caddress.replace(/%20/g, " ").trim()
        //alert(address)
        $('#EctConAddSpecialistForm').val(params.cID.trim());
        $('input[name=\'lastName\']').val(params.clname.replace(/%20/g, " ").trim());
        $('input[name=\'firstName\']').val(params.cfname.replace(/%20/g, " ").trim());
        $('input[name=\'phone\']').val(params.cphone.replace(/%20/g, " ").trim());
        $('input[name=\'fax\']').val(params.cfax.replace(/%20/g, " ").trim());
        $('textarea[name=\'address\']').val(address);
        $('input[name=\'specType\']').val(params.cdiscipline.replace(/%20/g, " ").trim());

    }
}