finishLazyLoading();

function finishLazyLoading() {
  // (Optional) Use native Shadow DOM if it's available in the browser.
  window.Polymer = {
    lazyRegister: true
  };

  // switch to shadow dom
  function getQueryParam(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  if (getQueryParam('dom') == 'shadow') {
    window.Polymer.dom = 'shadow';
  }

  // apply theme
  var link = document.createElement('link');
  link.setAttribute('rel', 'import');
  link.setAttribute('href', 'styles/' + (localStorage.getItem('theme') || 'default') + '-theme.html');
  document.getElementsByTagName('head')[0].appendChild(link);

  // 6. Fade splash screen, then remove.
  var onImportLoaded = function() {
    var loadEl = document.getElementById('splash');
loadEl.remove();

    // App is visible and ready to load some data!
  };

  var link = document.querySelector('#bundle');

  // 5. Go if the async Import loaded quickly. Otherwise wait for it.
  // crbug.com/504944 - readyState never goes to complete until Chrome 46.
  // crbug.com/505279 - Resource Timing API is not available until Chrome 46.
  if (link.import && link.import.readyState === 'complete') {
    onImportLoaded();
  } else {
    link.addEventListener('load', onImportLoaded);
  }
}
