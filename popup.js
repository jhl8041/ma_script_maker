// Saves options to chrome.storage
function switch_options() {
  var onOff = document.getElementById('onOffSwitch').checked;
  chrome.storage.sync.set({onOff: onOff});
  return onOff;
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    onOff: true
  }, function(items) {
    document.getElementById('onOffSwitch').checked = items.onOff;
  });
}

function checkState(){
	var state = switch_options();
	if (state == true){
		chrome.tabs.executeScript({file: 'imageMarker.js'}); 
	}
	else{
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.executeScript(tab.id, {code: 'window.location.reload();'});
		});
	}
}

document.addEventListener('DOMContentLoaded', function(){
	restore_options();
});
document.getElementById('onOffSwitch').addEventListener('click', checkState);