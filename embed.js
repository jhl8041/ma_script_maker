alert('hh');
var s = document.createElement('script');

chrome.storage.sync.get({
onOff: true
}, function(items) {
	if (items.onOff){
		alert('it is on');
		s.src = chrome.extension.getURL('clicker.js');
		document.head.appendChild(s);
	}
	else{
		alert('it is off');
	}
});



