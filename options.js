// Saves options to chrome.storage
function switch_options() {
  var onOff = document.getElementById('onOffSwitch').checked;
  console.log(onOff);
  chrome.storage.sync.set({
    onOff: onOff
  });
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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('onOffSwitch').addEventListener('click',
    switch_options);