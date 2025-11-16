/* auth.js - simple client-side auth using localStorage

   Note: This is for demo only (no server). Passwords stored in localStorage (not secure).
*/

// Helper to get users array
function getUsers(){
  try {
    return JSON.parse(localStorage.getItem('users')||'[]');
  } catch(e){ return []; }
}
function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }

// Signup handler
function handleSignup(e){
  e.preventDefault();
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim().toLowerCase();
  const pass = document.getElementById('su-pass').value;
  if(!name||!email||!pass){ alert('Please fill all fields'); return; }
  const users = getUsers();
  if(users.find(x=>x.email===email)){ alert('User already exists'); return; }
  users.push({name, email, pass, role:'student', created: new Date().toISOString()});
  saveUsers(users);
  localStorage.setItem('currentUser', JSON.stringify({name,email}));
  alert('Signup success');
  window.location.href = 'dashboard.html';
}

// Login handler
function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('li-email').value.trim().toLowerCase();
  const pass = document.getElementById('li-pass').value;
  const users = getUsers();
  const u = users.find(x=>x.email===email && x.pass===pass);
  if(!u){ alert('Invalid credentials'); return; }
  localStorage.setItem('currentUser', JSON.stringify({name:u.name,email:u.email}));
  window.location.href = 'dashboard.html';
}

function logout(){
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Protect pages
function protectPage(){
  const publicPages = ['login.html','signup.html','index.html'];
  const path = location.pathname.split('/').pop(); 
  if(publicPages.includes(path)) return;
  const cur = localStorage.getItem('currentUser');
  if(!cur){
    // redirect to login
    location.href = 'login.html';
  } else {
    // optionally display user name in elements with data-user
    const user = JSON.parse(cur);
    document.querySelectorAll('[data-user]').forEach(el=>{
      el.textContent = user.name;
    });
  }
}

// Add event listeners if forms exist
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('signup-form')) document.getElementById('signup-form').addEventListener('submit', handleSignup);
  if(document.getElementById('login-form')) document.getElementById('login-form').addEventListener('submit', handleLogin);
  // protect pages by default
  protectPage();
});
