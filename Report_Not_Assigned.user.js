// ==UserScript==
// @name        Report Not Assigned
// @namespace   Stanscripts
// @description Adds a new patient when not assigned
// @include     *lab/CA/ALL/labDisplay.jsp?*

// @include     *demographic/demographicaddrecordcustom.jsp*
// @version  15.1
// @require  https://code.jquery.com/jquery-3.6.4.min.js
// @grant       none
// ==/UserScript==
// @include     */annotation/annotation.jsp?display*
//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ("https://" + location.host + "/" + firstElement + "/")
//alert(vPath)
var teststring = window.location.toString()

if (teststring.indexOf("lab/CA/ALL/labDisplay.jsp") > -1) {

    var input = document.createElement("input");
    input.type = "button";
    input.value = "Add new patient";
    input.id = "newdemo";
    input.onclick = ButtonFunction;
    input.setAttribute("style", "font-size:14px; position:absolute; top:50px; left:300px; background-color: lime;");
    document.body.appendChild(input);

    function ButtonFunction() {
        window.open(vPath + "/demographic/demographicaddrecordcustom.jsp")
    }


    var demoArray = []

    function ms(first, second) {
        var mySubString = str.substring(
            str.indexOf(first) + 20,
            str.lastIndexOf(second)
        );
        //alert(str)
        //alert(mySubString.trim())
        demoArray.push(mySubString.trim())
    }

    var str = $(".FieldData").text()
    s1 = 'Patient Name:'
    s2 = 'Date of Birth:'
    s3 = 'Age:'
    s4 = 'Sex:'
    s5 = 'Health #'
    s6 = 'Home Phone:'
    s7 = 'Work Phone:'

    ms(s1, s2)
    ms(s2, s3)
    ms(s3, s4)
    ms(s4, s5)
    ms(s5, s6)

    //alert(demoArray)
    localStorage.setItem("mydemoArray", JSON.stringify(demoArray));
}

if (teststring.indexOf("demographic/demographicaddrecordcustom") > -1) {

    //========Buttons============
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "UPDATE";
    input1.id = "testbutton";
    input1.onclick = ButtonFunction1;
    input1.setAttribute("style", "font-size:14px; position:absolute; top:20px; left:400px; background-color: lime;");
    document.body.appendChild(input1);


    function ButtonFunction1() {
        var storedNames = JSON.parse(localStorage.getItem("mydemoArray"));
        //alert(storedNames)
        var fullname = storedNames[0].split(" ")
        var lastname = fullname[2]
        var firstname = fullname[0]
        var dob = storedNames[1].split("-")

        //=========Option List Default============
        //For the sex
        var theDefault = storedNames[3]
        var theOptions = document.getElementsByName('sex')[0].options;

        for (var theOption of theOptions) {
            if (typeof(theOption) == 'object') {
                if (theOption.text == theDefault) {
                    theOption.selected = true;
                    break;
                }
            }
        }

        $('input[name=\'last_name\']').css('background-color', 'yellow');
        $('input[name=\'last_name\']').val(lastname);
        $('input[name=\'first_name\']').val(firstname);
        $('input[name=\'year_of_birth\']').val(dob[0]);
        $('input[name=\'month_of_birth\']').val(dob[1]);
        $('input[name=\'date_of_birth\']').val(dob[2]);
        //$('input[name=\'sex\']').val(storedNames[3]);
        $('input[name=\'hin\']').val(storedNames[4]);
    }
}
