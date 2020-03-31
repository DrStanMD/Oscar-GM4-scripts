// ==UserScript==
// @name        BCAR Auto-populate 
// @description Auto populate BC-AR with measurements
// @namespace   Stanscript
// @include     *forwardshortcutname.jsp?formname=BC-AR*
// @include     *form/formbcarpg2.jsp?demographic_no*
// @include     *form/formbcar2012pg*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
//alert()
var BCA = [
    [
        'ar2_labHBsAgDate',
        'ILD',
        'HpBS'
    ],
    [
        'c_EDD',
        'IL',
        'EDC'
    ],
    [
        'pg1_lmp',
        'IL',
        'LMP'
    ],
    [
        'ar2_lmpDate',
        'IL',
        'LMP'
    ],
    [
        'ar2_labHem1st',
        'IL123R',
        'HB',
        '0'
    ],
    [
        'ar2_labHem3rd',
        'IL123R',
        'HB',
        '1'
    ],
    [
        'c_ppHt',
        'IL',
        'HT'
    ],
    [
        'c_ppWt',
        'IL',
        'WT'
    ],
    [
        'ar2_1USoundDate',
        'IL',
        'OBUS'
    ],
    [
        'ar2_gestAgeUs',
        'ILCom',
        'LMP'
    ],
    [
        'ar2_labRATRes1',
        'IL123R',
        'BRHA',
        '0'
    ], //Rh ab
    [
        'ar2_labRATDate1',
        'IL123D',
        'BRHA',
        '0'
    ], //Rh ab
    [
        'ar2_labRATRes2',
        'IL123R',
        'BRHA',
        '1'
    ], //Rh ab
    [
        'ar2_labRATDate2',
        'IL123D',
        'BRHA',
        '1'
    ],
    [
        'ar2_labRATRes3',
        'IL123R',
        'BRHA',
        '2'
    ], //Rh ab
    [
        'ar2_labRATDate3',
        'IL123D',
        'BRHA',
        '2'
    ],
    [
        'ar2_labOtherTSH',
        'IL',
        'TSH'
    ],
    [
        'ar2_labRubella',
        'IL',
        'RUB'
    ],
    [
        'ar2_labBlood',
        'Op',
        'ABO'
    ],
    [
        'ar2_labRh',
        'Op',
        'Rh'
    ],
    [
        'ar2_labOtherTest',
        'TSH',
        'TSH'
    ],
    [
        'ar2_labHIV',
        'Op',
        'HIVG'
    ],
    [
        'ar2_labHivTestY',
        'CByn',
        'HIVG'
    ],
    [
        'ar2_labSTS',
        'Op',
        'VDRL'
    ],
    [
        'ar2_labHBsAgY',
        'CByn',
        'HpBS'
    ],
    [
        'ar2_labHBsAgNR',
        'CByn',
        'HpBS'
    ],
    [
        'ar2_age',
        'IL',
        'AGED'
    ],
    [
        'ar2_labHBsAg', //BCAR only
        'Op',
        'HpBS'
    ],
    [
        'ar2_labAfpTS', //BCAR only
        'Op',
        'SIPS'
    ],
    // ['c_ppBMI','IL','BMI'],
    'ar2_labRhIgG2',
    'ar2_labGWeek',
    'ar2_labDiabDate',
    'ar2_labDiabRes',
    'ar2_labGBSTestN',
    'ar2_labGBSTestY',
    'ar2_labGBSRes',
    'pg2_date1',
    'pg2_wt1',
    'pg2_bp1',
]
var measureArray = [];
var measureDateArray = [];
var measureCommentArray = [];

function getMeasures(measure) {
    measureArray = [];
    measureDateArray = [];
    xmlhttp = new XMLHttpRequest();
    var pathArray = window.location.pathname.split('/');
    var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/oscarEncounter/oscarMeasurements/SetupDisplayHistory.do?type=' + measure;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var str = xmlhttp.responseText; //local variable
            str = str.replace('&gt;', '>')
            str = str.replace('&lt;', '<')
            // alert(str)
            if (!str) {
                return;
            }
            //   var myRe = /<td width="10">([\w,\.]+)<\/td>/g; //for the measurement

            var myRe = /<td width="10">((.*?)+)<\/td>/g; //for the measurement
            //   var myRe = /<td width="10">([\d,\.]+)<\/td>/g; //for the measurement
            var myArray;
            var i = 0;
            while ((myArray = myRe.exec(str)) !== null) {
                measureArray[i] = myArray[1];
                i = i + 1;
            }
            var myRe = /<td width="150">([0-9,-]+)<\/td>\s*<td width="150">/g; //the first date is the observation date
            var myArray;
            var i = 0;
            while ((myArray = myRe.exec(str)) !== null) {
                measureDateArray[i] = myArray[1];
                i = i + 1;
            }
            var myRe = /<td width="300">((.*?)+)<\/td>\s*<td width="150">/g; //for the comment
            var myArray;
            var i = 0;
            while ((myArray = myRe.exec(str)) !== null) {
                measureCommentArray[i] = myArray[1];
                i = i + 1;
            }
        }
    }
    xmlhttp.open('GET', newURL, false);
    xmlhttp.send();
}


var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'UPDATE FIELDS';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:35px;right:0px;');
document.body.appendChild(input1);



function ButtonFunction1() {

    for (i = 0; i < BCA.length; i++) {
        var group = BCA[i][1]
        var groupmeasure = BCA[i][2]
        var groupname = BCA[i][0]
        var seqno = BCA[i][3]
        //******************************************************************************************
        switch (group) {
            case 'IL123R': //Input line with last three dates Results
                getMeasures(groupmeasure)
                x = measureArray
                n = x.slice(seqno, seqno + 1)
                var date = new Date(n);
                var d = Date.parse(n);
                if (d > 10000000) {
                    n = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                }
                var vname = 'input[name=\'' + groupname + '\']'
                $(vname).val(n)
                break;
            case 'IL123D': //Date with last three dates Results
                getMeasures(groupmeasure)
                x = measureDateArray
                n = x.slice(seqno, seqno + 1)
                //   alert(n)
                var date = new Date(n);
                var d = Date.parse(n);
                if (d > 10000000) {
                    n = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                }
                var vname = 'input[name=\'' + groupname + '\']'
                $(vname).val(n)
                break;
            case 'ILCom': //Input line
                getMeasures(groupmeasure)
                //x = (measureArray.length)
                var vname = 'input[name=\'' + groupname + '\']'
                $(vname).val(measureCommentArray[0])
                break;
            case 'ILD': //Input line
                getMeasures(groupmeasure)
                n = measureDateArray[0]
                var date = new Date(n);
                var d = Date.parse(n);
                if (d > 10000000) {
                    n = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                }
                //x = (measureArray.length)

                var vname = 'input[name=\'' + groupname + '\']'
                $(vname).val(n)
                break;
            case 'IL': //Input line
                getMeasures(groupmeasure)
                n = measureArray[0]
                var date = new Date(n);
                var d = Date.parse(n);
                if (d > 10000000) {
                    n = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
                }
                //x = (measureArray.length)

                var vname = 'input[name=\'' + groupname + '\']'
                $(vname).val(n)
                break;


            case 'Op': //option list
                getMeasures(groupmeasure)
                //  alert(measureArray)
                //  x = (measureArray.length)
                // alert(measureArray)
                //  var theDefault = measureArray[x - 1]
                var theDefault = measureArray[0]
                // alert(theDefault)
                var theOptions = document.getElementsByName(groupname)[0].options;

                for (var theOption of theOptions) {

                    var xx = theDefault.indexOf('Non-Reactive')
                    var yy = theDefault.indexOf('Nonreactive')
                    var zz = theDefault.indexOf('Reactive')
                    //alert(theDefault)
                    if (typeof(theOption) == 'object') {
                        if (theOption.text == 'Pos' && theDefault == 'pos') {
                            theDefault = 'Pos'
                        }
                        if (theOption.text == 'pos' && theDefault == 'Pos') {
                            theDefault = 'pos'
                        }
                        if (theOption.text == 'Neg' && theDefault == 'neg') {
                            theDefault = 'Neg'
                        }
                        if (theOption.text == 'neg' && theDefault == 'Neg') {
                            theDefault = 'neg'
                        }
                        if (theOption.text == '+ve' && (theDefault == 'pos' || theDefault == 'Pos')) {
                            theDefault = '+ve'
                        }
                        if (theOption.text == '-ve' && (theDefault == 'neg' || theDefault == 'Neg')) {
                            theDefault = '-ve'
                        }
                        if (theOption.text == 'NR' && theDefault == 'N') {
                            theDefault = 'NR'
                        }
                        if (theOption.text == 'NR' && (xx > -1 || yy > -1)) {
                            theDefault = 'NR'
                        }
                        if (theOption.text == 'R' && zz > -1) {
                            theDefault = 'R'
                        }
                        if (theOption.text == theDefault) {
                            theOption.selected = true;
                            break;
                        }
                    }
                }
                break;


            case 'TSH': //textarea
                //   alert(i)
                getMeasures('TSH')
                //alert(measureArray)
                //  x = (measureArray.length)
                var vname = 'textarea[name=\'' + groupname + '\']'
                var aa = $(vname).text() + ';\nTSH '
                // alert(aa)
                $(vname).text(aa + (measureArray[0]) + ' on ' + measureDateArray[0])
                break;
            case 'CByn': //Checkbox yes/no
                // alert("testing"+groupmeasure)
                getMeasures(groupmeasure)
                x = (measureArray.length)
                //  alert(measureArray)
                if (x !== 0) {
                    //    alert(groupname)
                    var vname = 'input:checkbox[name=\'' + groupname + '\']'
                    $(vname).click()
                } else {
                    groupname = groupname.slice(0, -1) + 'N'
                    alert(groupname)
                    vname = 'input:checkbox[name=\'' + groupname + '\']'
                    $(vname).click()
                }
                break
            default:
                //defaultcodeblock


        }
        setTimeout(function() {
            $('input[name=\'c_ppBMI\']').dblclick()
        }, 1000);
    }

}
