// ==UserScript==
// @name           Time Tracker Billing
// @namespace      DavidScripts
// @description    Billing enabler
// @include        *billing*
// @include        *CaseManagementEntry.do*
// @include        *eform/efmshowform_data.jsp?fdid=*
// @include        *provider/providercontrol.jsp*
// @include        *casemgmt/forward.jsp*
// @include        *demographic/search.jsp*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version  2.0
// ==/UserScript== 

var mybillingscreen = localStorage.getItem("mybillingpref");
if (!localStorage.getItem("mybillingpref")) {
    mybillingscreen = "GP"
}
//alert(mybillingscreen)

//$('#serviceStartTime').css('background-color', 'aqua');
//$('#serviceEndTime').css('background-color', 'aqua');


//***This code pastes times into Juno Billing screen
function pasteTime(timeUnit, myxml) {
    var theDefault = timeUnit.split(":")[0];
    var theOptions = document.getElementsByName(myxml + "_hr")[0].options;
    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }

    var theDefault = timeUnit.split(":")[1];
    var theOptions = document.getElementsByName(myxml + "_min")[0].options;
    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
}

window.addEventListener("load", function() {
    var locator = window.location.href;


    if (/demographic\/search/i.test(locator)) {
        var TT = document.createElement("input");
        TT.type = "button";
        TT.value = "Timetracker";
        TT.onclick = TTT;
        TT.setAttribute("style", "font-size:12px;position:fixed;top:0px;left:160px;");
        document.body.appendChild(TT);

        function TTT() {
            $('input[name="keyword"]').val('Timetracker,');
            $('input[value="Search"]').click();
        }

    }



    if (/eform/i.test(locator)) {
        var tT = document.title;
        if (tT == "Time Tracker") {

            var input4 = document.createElement("input");
            input4.type = "button";
            input4.value = "Copy time";
            input4.onclick = copyTime;
            input4.setAttribute("style", "font-size:16px;position:fixed;bottom:10px;right:10px;");
            document.body.appendChild(input4);

            function copyTime() {
                var t = $('#TimeTrackerDate').val();
                if (t) {
                    alert("Copied time from " + t);
                    var DPT = $('#units').val();
                    if (DPT > 0) {
                        var a = $('#blockTs').val();
                        localStorage.setItem("startT", a);
                        var b = $('#blockTf').val();
                        localStorage.setItem("finishT", b);
                        var c = $('#units').val();
                        localStorage.setItem("Units", c);
                    }
                    var IPT = $('#iunits').val();
                    if (IPT > 0) {
                        var d = $('#iblockTs').val();
                        localStorage.setItem("istartT", d);
                        var e = $('#iblockTf').val();
                        localStorage.setItem("ifinishT", e);
                        var f = $('#iunits').val();
                        localStorage.setItem("iUnits", f);
                    }
                    var APT = $('#aunits').val();
                    if (APT > 0) {
                        var g = $('#ablockTs').val();
                        localStorage.setItem("astartT", g);
                        var h = $('#ablockTf').val();
                        localStorage.setItem("afinishT", h);
                        var i = $('#aunits').val();
                        localStorage.setItem("aUnits", i);
                    }

                }
            }
        }
    }

    if ((/billing/i.test(locator)) || (/CaseManagementEntry/i.test(locator))) {
        //alert()
        var startTime = localStorage.getItem("startT");
        if (startTime) {
            var input1 = document.createElement("input");
            input1.type = "button";
            input1.value = "Direct Patient Time";
            input1.onclick = directPatient;
            input1.setAttribute("style", "font-size:16px;position:fixed;top:460px;left:400px;background-color: yellow");
            document.body.appendChild(input1);
        }

        function directPatient() {
            $('#serviceStartTime').val(startTime);
            pasteTime(startTime, 'xml_starttime')  //forJuno
            localStorage.removeItem("startT");

            var finishTime = localStorage.getItem("finishT");
            $('#serviceEndTime').val(finishTime);
            pasteTime(finishTime, 'xml_endtime')  //forJuno
            localStorage.removeItem("finishT");

            $('.glyphicon').click();
            $("input[name='xml_diagnostic_detail1']").focus();
            var UniT = localStorage.getItem("Units");
            $('#xml_other1_unit').val(UniT);
            localStorage.removeItem("Units");
            $("[name='xml_other1']").val('98010');
            $("[name='xml_diagnostic_detail1']").val('L23');
        }

        var istartTime = localStorage.getItem("istartT");
        if (istartTime) {
            var input2 = document.createElement("input");
            input2.type = "button";
            input2.value = "Indirect Patient Time";
            input2.onclick = indirectPatient;
            input2.setAttribute("style", "font-size:16px;position:fixed;top:500px;left:400px;background-color: yellow");
            document.body.appendChild(input2);
        }

        function indirectPatient() {
            $('#serviceStartTime').val(istartTime);
            pasteTime(istartTime, 'xml_starttime')   //forJuno
            localStorage.removeItem("istartT");
            var ifinishTime = localStorage.getItem("ifinishT");
            $('#serviceEndTime').val(ifinishTime);
            pasteTime(ifinishTime, 'xml_endtime')  //forJuno
            localStorage.removeItem("ifinishT");
            $('.glyphicon').click();
            $("input[name='xml_diagnostic_detail1']").focus();
            var iUniT = localStorage.getItem("iUnits");
            $('#xml_other1_unit').val(iUniT);
            localStorage.removeItem("iUnits");
            $("[name='xml_other1']").val('98011');
            $("[name='xml_diagnostic_detail1']").val('L23');
        }




        var astartTime = localStorage.getItem("astartT");
        if (astartTime) {
            var input3 = document.createElement("input");
            input3.type = "button";
            input3.value = "Admin Time";
            input3.onclick = adminPatient;
            input3.setAttribute("style", "font-size:16px;position:fixed;top:540px;left:400px;background-color: yellow");
            document.body.appendChild(input3);
        }

        function adminPatient() {
            $('#serviceStartTime').val(astartTime);
            pasteTime(astartTime, 'xml_starttime')  //forJuno
            localStorage.removeItem("astartT");
            var afinishTime = localStorage.getItem("afinishT");
            $('#serviceEndTime').val(afinishTime);
            pasteTime(afinishTime, 'xml_endtime')  //forJuno
            localStorage.removeItem("afinishT");
            $('.glyphicon').click();
            $("input[name='xml_diagnostic_detail1']").focus();
            var aUniT = localStorage.getItem("aUnits");
            $('#xml_other1_unit').val(aUniT);
            localStorage.removeItem("aUnits");
            $("[name='xml_other1']").val('98012');
            $("[name='xml_diagnostic_detail1']").val('L23');
        }

        setTimeout(function() {
            $("input[type=checkbox][value=98022]").attr("title", "Minor procedures,maximum 2 different services $10 each\nCryotherapy\nImmunisation or injection\nUrinalysis by dipstick\nUrine pregnancy test\nUrine screening for OAT\nUrine drug screening\nPeak flow testing\nVenipuncture\nPayable in addition to visit or procedure");
            $("input[type=checkbox][value=98021]").attr("title", "Standard procedures $60\nGynecologic examinations including pelvic and speculum examinations\nCervical cancer screening\nIUD removal\nCervical polypectomy\nAnoscopy\nTrigger point injections\nTendon and bursa injections and aspirations\nIntra-articular injections and aspirations\nVaricose vein injections\nNot payable with other visits or procedures (except minor)");
            $("input[type=checkbox][value=98020]").attr("title", "Advanced procedures $110\nBiopsy of skin or mucosa\nAbscess,superficial opening\nLaceration or foreign body,minor\nExcision of tumour of skin,subcutaneous tissue or scar\nParonychia\nNail removal\nWedge excision or Vandenbos procedure of one nail\nHemorrhoid thrombotic,enucleation\nInsertion of IUD\nInsertion or removal of subdermal contraceptive implant\nVenereal warts\nCervix punch biopsy\nEndometrial biopsy\nProctosigmoidoscopy,rigid,diagnostic\nAbscess-perianal, I+D, superficial\nNasal fracture - simple reduction or with reduction and splinting\nPeripheral nerve block, single or double\nBiopsy of vulva, excisional lesion\nFine Needle aspiration of solid or cystic lesion\nApplication of Cast\nCurettage and electrosurgery of skin carcinoma\nAural polyp removal or debridement, foreign body removal\nIncision of peritonsillar abscess – under local anesthetic\nRemoval of tumour (including intraoral) or scar revision – 2 to 5 cm\nNot payable with other visits or procedures (except minor)");

            $("input[type=checkbox][value=98031]").closest('tr').css('background-color', 'yellow')
            $("input[type=checkbox][value=98032]").closest('tr').css('background-color', 'lightpink')

            var Y = "430";
            var X = "570"

            $("input[type=checkbox][value=98022]").click(function() {
                $(".proc").hide();
                var M = document.createElement("input");
                M.type = "button";
                M.value = "Cryotherapy";
                M.onclick = MM;
                M.setAttribute("style", "font-size:12px;position:fixed;top:" + Y + "px;left:" + X + "px; background-color: yellow");
                M.setAttribute("class", "proc");
                document.body.appendChild(M);

                function MM() {
                    $("[name='xml_diagnostic_detail1']").val('0781');
                }

                var M1 = document.createElement("input");
                M1.type = "button";
                M1.value = "Immunisation/Injection";
                M1.onclick = MM1;
                M1.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 30) + "px;left:" + X + "px; background-color: yellow");
                M1.setAttribute("class", "proc");
                document.body.appendChild(M1);

                function MM1() {
                    $("[name='xml_diagnostic_detail1']").val('33A');
                }

                var M2 = document.createElement("input");
                M2.type = "button";
                M2.value = "Urineanalysis";
                M2.onclick = MM2;
                M2.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 60) + "px;left:" + X + "px; background-color: yellow");
                M2.setAttribute("class", "proc");
                document.body.appendChild(M2);

                function MM2() {
                    $("[name='xml_diagnostic_detail1']").val('788');
                }

                var M3 = document.createElement("input");
                M3.type = "button";
                M3.value = "Urine Preg Test";
                M3.onclick = MM3;
                M3.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 90) + "px;left:" + X + "px; background-color: yellow");
                M3.setAttribute("class", "proc");
                document.body.appendChild(M3);

                function MM3() {
                    $("[name='xml_diagnostic_detail1']").val('V724');
                }

                var M4 = document.createElement("input");
                M4.type = "button";
                M4.value = "Urine OAT";
                M4.onclick = MM4;
                M4.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 120) + "px;left:" + X + "px; background-color: yellow");
                M4.setAttribute("class", "proc");
                document.body.appendChild(M4);

                function MM4() {
                    $("[name='xml_diagnostic_detail1']").val('9701');
                }

                var M5 = document.createElement("input");
                M5.type = "button";
                M5.value = "Urine Drug Screen";
                M5.onclick = MM5;
                M5.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 150) + "px;left:" + X + "px; background-color: yellow");
                M5.setAttribute("class", "proc");
                document.body.appendChild(M5);

                function MM5() {
                    $("[name='xml_diagnostic_detail1']").val('E0802');
                }

                var M6 = document.createElement("input");
                M6.type = "button";
                M6.value = "Peak Flow Testing";
                M6.onclick = MM6;
                M6.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 180) + "px;left:" + X + "px; background-color: yellow");
                M6.setAttribute("class", "proc");
                document.body.appendChild(M6);

                function MM6() {
                    $("[name='xml_diagnostic_detail1']").val('786');
                }

            })




            $("input[type=checkbox][value=98021]").click(function() {
                $(".proc").hide();
                var M = document.createElement("input");
                M.type = "button";
                M.value = "Gynecologic examination";
                M.onclick = MM;
                M.setAttribute("style", "font-size:12px;position:fixed;top:" + Y + "px;left:" + X + "px; background-color: yellow");
                M.setAttribute("class", "proc");
                document.body.appendChild(M);

                function MM() {
                    $("[name='xml_diagnostic_detail1']").val('V723');
                }

                var M1 = document.createElement("input");
                M1.type = "button";
                M1.value = "Anoscopy";
                M1.onclick = MM1;
                M1.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 30) + ";left:" + X + "px; background-color: yellow");
                M1.setAttribute("class", "proc");
                document.body.appendChild(M1);

                function MM1() {
                    $("[name='xml_diagnostic_detail1']").val('4556');
                }

                var M2 = document.createElement("input");
                M2.type = "button";
                M2.value = "Trigger point injections";
                M2.onclick = MM2;
                M2.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 60) + "px;left:" + X + "px; background-color: yellow");
                M2.setAttribute("class", "proc");
                document.body.appendChild(M2);

                function MM2() {
                    $("[name='xml_diagnostic_detail1']").val('7299');
                }

                var M3 = document.createElement("input");
                M3.type = "button";
                M3.value = "Tendon/bursa injections";
                M3.onclick = MM3;
                M3.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 90) + "px;left:" + X + "px; background-color: yellow");
                M3.setAttribute("class", "proc");
                document.body.appendChild(M3);

                function MM3() {
                    $("[name='xml_diagnostic_detail1']").val('7273');
                }

                var M4 = document.createElement("input");
                M4.type = "button";
                M4.value = "Intra-articular injections";
                M4.onclick = MM4;
                M4.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 120) + "px;left:" + X + "px; background-color: yellow");
                M4.setAttribute("class", "proc");
                document.body.appendChild(M4);

                function MM4() {
                    $("[name='xml_diagnostic_detail1']").val('7137');
                }


            })


            $("input[type=checkbox][value=98020]").click(function() {
                $(".proc").hide();
                var M = document.createElement("input");
                M.type = "button";
                M.value = "Biopsy skin";
                M.onclick = MM;
                M.setAttribute("style", "font-size:12px;position:fixed;top:" + Y + "px;left:" + X + "px; background-color: yellow")
                M.setAttribute("class", "proc");
                document.body.appendChild(M);

                function MM() {
                    $("[name='xml_diagnostic_detail1']").val('V820');
                }

                var M1 = document.createElement("input");
                M1.type = "button";
                M1.value = "Abscess,superficial opening";
                M1.onclick = MM1;
                M1.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 30) + "px;left:" + X + "px; background-color: yellow");
                M1.setAttribute("class", "proc");
                document.body.appendChild(M1);

                function MM1() {
                    $("[name='xml_diagnostic_detail1']").val('682');
                }

                var M2 = document.createElement("input");
                M2.type = "button";
                M2.value = "Laceration";
                M2.onclick = MM2;
                M2.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 60) + "px;left:" + X + "px; background-color: yellow");
                M2.setAttribute("class", "proc");
                document.body.appendChild(M2);

                function MM2() {
                    $("[name='xml_diagnostic_detail1']").val('8798');
                }

                var M3 = document.createElement("input");
                M3.type = "button";
                M3.value = "Foreign Body";
                M3.onclick = MM3;
                M3.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 90) + "px;left:" + X + "px; background-color: yellow");
                M3.setAttribute("class", "proc");
                document.body.appendChild(M3);

                function MM3() {
                    $("[name='xml_diagnostic_detail1']").val('7296');
                }

                var M4 = document.createElement("input");
                M4.type = "button";
                M4.value = "Excision of tumour of skin";
                M4.onclick = MM4;
                M4.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 120) + "px;left:" + X + "px; background-color: yellow");
                M4.setAttribute("class", "proc");
                document.body.appendChild(M4);

                function MM4() {
                    $("[name='xml_diagnostic_detail1']").val('1739');
                }

                var M5 = document.createElement("input");
                M5.type = "button";
                M5.value = "Paronychia";
                M5.onclick = MM5;
                M5.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 150) + "px;left:" + X + "px; background-color: yellow");
                M5.setAttribute("class", "proc");
                document.body.appendChild(M5);

                function MM5() {
                    $("[name='xml_diagnostic_detail1']").val('6819');
                }

                var M6 = document.createElement("input");
                M6.type = "button";
                M6.value = "Nail removal";
                M6.onclick = MM6;
                M6.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 180) + "px;left:" + X + "px; background-color: yellow");
                M6.setAttribute("class", "proc");
                document.body.appendChild(M6);

                function MM6() {
                    $("[name='xml_diagnostic_detail1']").val('7038');
                }

                var M7 = document.createElement("input");
                M7.type = "button";
                M7.value = "Wedge Excision Nail";
                M7.onclick = MM7;
                M7.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 210) + "px;left:" + X + "px; background-color: yellow");
                M7.setAttribute("class", "proc");
                document.body.appendChild(M7);

                function MM7() {
                    $("[name='xml_diagnostic_detail1']").val('7030');
                }

                var M8 = document.createElement("input");
                M8.type = "button";
                M8.value = "Hemorrhoid enucleation";
                M8.onclick = MM8;
                M8.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 240) + "px;left:" + X + "px; background-color: yellow");
                M8.setAttribute("class", "proc");
                document.body.appendChild(M8);

                function MM8() {
                    $("[name='xml_diagnostic_detail1']").val('4556');
                }


                var M10 = document.createElement("input");
                M10.type = "button";
                M10.value = "Venereal Warts";
                M10.onclick = MM10;
                M10.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 270) + "px;left:" + X + "px; background-color: yellow");
                M10.setAttribute("class", "proc");
                document.body.appendChild(M10);

                function MM10() {
                    $("[name='xml_diagnostic_detail1']").val('6472');
                }

                var M11 = document.createElement("input");
                M11.type = "button";
                M11.value = "Perianal abscess, I+D";
                M11.onclick = MM11;
                M11.setAttribute("style", "font-size:12px;position:fixed;top:" + (Y * 1 + 300) + "px;left:" + X + "px; background-color: yellow");
                M11.setAttribute("class", "proc");
                document.body.appendChild(M11);

                function MM11() {
                    $("[name='xml_diagnostic_detail1']").val('566');
                }




            })



        }, 500);

    }

    if (/billRegion=BC/i.test(locator)) {
        var BT = document.createElement("input");
        BT.type = "button";
        BT.value = "Toggle";
        BT.onclick = BTT;
        BT.setAttribute("style", "font-size:12px;position:fixed;top:0px;left:0px; background-color: PINK");
        document.body.appendChild(BT);
        /*
                 function BTT() {
                  if(locator.indexOf('billForm=COV') != -1){
                  a = locator.replace("COV", "LFP");
                  b = a + '&billType=COV'
                  location.href = b;
                  return;
                 }
                  if(locator.indexOf('billForm=LFP') != -1){
                  a = locator.replace("LFP", "COV");
                  b = a + '&billType=COV'
                  location.href = b;
                  return;
                 }
               }
         */
        function BTT() {
            if (locator.indexOf('billForm=' + mybillingscreen) != -1) {
                a = locator.replace(mybillingscreen, "LFP");
                b = a + '&billType=' + mybillingscreen
                location.href = b;
                return;
            }
            if (locator.indexOf('billForm=LFP') != -1) {
                a = locator.replace("LFP", mybillingscreen);
                b = a + '&billType=' + mybillingscreen
                location.href = b;
                return;
            }
        }


        $('html').keydown(function(e) {
            if (e.keyCode == 192) { // ` pushed
                BTT();
            }
        });
    }

}, false);
