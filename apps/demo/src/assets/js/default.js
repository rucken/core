var spinners = [
  '<div class="sk-spinner sk-spinner-rotating-plane"></div>',
  '<div class="sk-spinner sk-spinner-double-bounce"><div class="sk-double-bounce1"></div><div class="sk-double-bounce2"></div></div>',
  '<div class="sk-spinner sk-spinner-wave"><div class="sk-rect1"></div><div class="sk-rect2"></div><div class="sk-rect3"></div><div class="sk-rect4"></div><div class="sk-rect5"></div></div>',
  '<div class="sk-spinner sk-spinner-wandering-cubes"><div class="sk-cube1"></div><div class="sk-cube2"></div></div>',
  '<div class="sk-spinner sk-spinner-pulse"></div>',
  '<div class="sk-spinner sk-spinner-chasing-dots"><div class="sk-dot1"></div><div class="sk-dot2"></div></div>',
  '<div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div>',
  '<div class="sk-spinner sk-spinner-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
  '<div class="sk-spinner sk-spinner-cube-grid"><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div></div>',
  '<div class="sk-spinner sk-spinner-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>'
];
function getRandomSpinner() {
  return spinners[Math.floor(Math.random() * spinners.length)];
}
function getPrimaryBtnStyle() {
  var div = document.createElement('div');
  div.classList.add('btn');
  div.classList.add('btn-primary');
  div.classList.add('hidden');
  document.body.appendChild(div);
  return getComputedStyle(div);
}
function setTheme(themeUrl) {
  var links = document.getElementsByTagName('link');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.getAttribute('rel').indexOf('style') !== -1 && link.getAttribute('title')
      && link.getAttribute('title') === 'bootstrap' && link.getAttribute('href') !== themeUrl) {
      link.setAttribute('href', themeUrl);
    }
  }
}
function setLocalTheme(value) {
  localStorage.setItem('theme', value);
}
function getLocalTheme() {
  if (localStorage.getItem('theme') && localStorage.getItem('theme').indexOf('/3/')!==-1) {
    return localStorage.getItem('theme');
  }
  return false;
}
function setLocalVersion(value) {
  localStorage.setItem('version', value);
}
function getLocalVersion() {
  if (localStorage.getItem('version')) {
    return localStorage.getItem('version');
  }
  return false;
}
function getVersion() {
  var ver = 'none';
  var metaList = document.getElementsByTagName('meta');
  for (var i = 0; i < metaList.length; i++) {
    var meta = metaList[i];
    if (meta.getAttribute('name') !== null && meta.getAttribute('name').indexOf('version') === 0) {
      ver = meta.getAttribute('content');
    }
  }
  if (ver !== 'none') {
    return ver;
  }
  return false;
}
function showPleaseWait(message) {
  if (window.loading_screen === false) {
    return;
  }
  var style = getPrimaryBtnStyle();
  var version = getVersion();
  var localVersion = getLocalVersion();
  var spinner = getRandomSpinner();
  var loadingHtml = [];
  loadingHtml.push('<h1 style="color:' + style.color + '">' + document.title + '</h1>');
  if (!message) {
    if (version !== false && localVersion === false) {
      loadingHtml.push('<h5 style="color:' + style.color + '">Version: ' + version + '</h5>');
    }
    if (version !== false && localVersion !== false && version === localVersion) {
      loadingHtml.push('<h5 style="color:' + style.color + '">Version: ' + version + '</h5>');
    }
    if (version !== false && localVersion !== false && version !== localVersion) {
      loadingHtml.push('<h5 style="color:' + style.color + '">Updating...</h5>');
    }
  } else {
    loadingHtml.push('<h5 style="color:' + style.color + '">' + message + '</h5>');
  }
  loadingHtml.push('<br/>');
  loadingHtml.push(spinner);
  window.loading_screen = window.pleaseWait({
    backgroundColor: style.backgroundColor,
    logo: '',
    loadingHtml: loadingHtml.join('')
  });
}
var theme = getLocalTheme();
if (theme === false) {
  showPleaseWait();
} else {
  setTheme(theme);
  showPleaseWait();
}
