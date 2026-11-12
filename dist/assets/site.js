const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mega = document.querySelector('.mega');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  mega.open = false;
}
menu.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    closeMenu();
  } else {
    nav.classList.add('open');
    menu.setAttribute('aria-expanded', 'true');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (mega.open) {
    mega.open = false;
    mega.querySelector('summary').focus();
  } else if (nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', (event) => {
  if (mega.open && !mega.contains(event.target)) mega.open = false;
});
const currentPath = location.pathname.replace(/\/$/, '') || '/';
for (const link of nav.querySelectorAll(':scope > a')) {
  if (link.pathname === currentPath) link.setAttribute('aria-current', 'page');
}
const form = document.querySelector('#enquiry');
if (form) {
  const topic = new URLSearchParams(location.search).get('topic');
  if (topic && /^[a-z0-9-]{1,90}$/.test(topic)) {
    const select = form.elements.namedItem('Interested in');
    const term = topic.replaceAll('-', ' ');
    const option = [...select.options].find((item) => item.text.toLowerCase().includes(term));
    if (option) select.value = option.value;
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('SourceWorx briefing — ' + data.get('Interested in'));
    const body = encodeURIComponent([...data].map(([name, value]) => name + ': ' + value).join('\r\n'));
    document.querySelector('#form-status').textContent = 'Your email app can open the draft. Send it there to submit your request.';
    location.href = 'mailto:hello@sourceworx.ai?subject=' + subject + '&body=' + body;
  });
}
