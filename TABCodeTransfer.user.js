// ==UserScript==
// @name           TABenableCodeTransfer
// @namespace      oscar
// @include        */billing/CA/BC/billingCodeNewUpdate.jsp*
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		if(e.target.innerHTML.indexOf("BillingCreateBillingForm.xml_diagnostic_detail1")>-1 && e.target.innerHTML.indexOf("BillingCreateBillingForm.xml_diagnostic_detail2")>-1 && e.target.innerHTML.indexOf("BillingCreateBillingForm.xml_diagnostic_detail3")>-1)
		{
			e.stopPropagation();
			e.preventDefault();
			document.head.appendChild(document.createElement('script')).innerHTML="function CodeAttach(File0,File1,File2,dx1,dx2,dx3){self.opener.document.BillingCreateBillingForm.xml_other1.value=File0;self.opener.document.BillingCreateBillingForm.xml_other2.value=File1;self.opener.document.BillingCreateBillingForm.xml_other3.value=File2;self.opener.document.BillingCreateBillingForm.xml_diagnostic_detail1.value=dx1;self.opener.document.BillingCreateBillingForm.xml_diagnostic_detail2.value=dx2;self.opener.document.BillingCreateBillingForm.xml_diagnostic_detail3.value=dx3;self.close();}";
		}	
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);
      