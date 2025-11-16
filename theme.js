/* theme.js - Light/Dark theme switcher stored in localStorage */
(function(){
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  html.dataset.theme = saved;
})();
function toggleTheme(){
  const html = document.documentElement;
  const now = html.dataset.theme === 'light' ? 'dark' : 'light';
  html.dataset.theme = now;
  localStorage.setItem('theme', now);
}
