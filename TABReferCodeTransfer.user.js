// ==UserScript==
// @name           TABenableReferCodeTransfer
// @namespace      oscar
// @include        */billing/CA/BC/billingReferCodeUpdate.jsp*
// @include        */billing/CA/BC/billingReferCodeSearch.jsp*
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace(" self.opener.document.BillingCreateBillingForm.xml_refer3.value ='';","").replace('self.close();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);