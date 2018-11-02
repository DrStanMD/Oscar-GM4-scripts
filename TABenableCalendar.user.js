// ==UserScript==
// @name           TABenableCalendar
// @namespace      oscar
// @include        */share/CalendarPopup.jsp*
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);