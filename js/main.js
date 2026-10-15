// ---------- Flat icon sprite ----------
const icons={home:'M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z',
user:'M12 4a4 4 0 110 8 4 4 0 010-8zM4 21c0-4 4-6 8-6s8 2 8 6z',
folder:'M3 5h7l2 2h9v12H3z',check:'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
mail:'M3 5h18v2l-9 6-9-6zM3 9.500l9 6 9-6V19H3z',
phone:'M6.600 10.800a15 15 0 006.600 6.600l2.200-2.200c.3-.3.700-.4 1-.2 1.100.4 2.300.6 3.600.6.600 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.500c.6 0 1 .4 1 1 0 1.300.2 2.500.6 3.600.1.300 0 .700-.2 1z',
insta:'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.500a4.500 4.500 0 100 9 4.500 4.500 0 000-9zm5.500-2a1 1 0 100 2 1 1 0 000-2z',
trash:'M6 7h12l-1 14H7zM9 3h6l1 2h4v2H4V5h4z',plus:'M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z',
heart:'M12 21s-8-5.300-8-11a4.500 4.500 0 018-2.800A4.500 4.500 0 0120 10c0 5.700-8 11-8 11z',
book:'M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-7a2 2 0 00-2 2v14a2 2 0 012-2h7z',
star:'M12 2l2.900 6.300 6.800.7-5.100 4.600 1.500 6.700-6.100-3.500-6.100 3.500 1.500-6.700L2.300 9l6.800-.7z',
chat:'M4 4h16v12H8l-4 4z',cap:'M12 3L1 9l11 6 9-4.800V17h2V9zM5 13.300V17c0 1.700 3.100 3 7 3s7-1.300 7-3v-3.700l-7 3.800z',
users:'M9 4.500a3.500 3.500 0 110 7 3.500 3.500 0 010-7zM2 20c0-3.500 3.200-5.500 7-5.500s7 2 7 5.500zM17.500 6.500a2.500 2.500 0 110 5 2.500 2.500 0 010-5zM17 14c3 0 5 1.500 5 4v2h-4.500v-2c0-1.600-.5-2.900-1.500-4z',
list:'M4 5h16v3H4zM4 10.500h16v3H4zM4 16h16v3H4z',link:'M4 4h10v3H7v10h10v-7h3v10H4zM12 3h9v9l-3.500-3.500-6 6-2-2 6-6z'};
document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute" aria-hidden="true">'+
Object.entries(icons).map(([k,d])=>`<symbol id="i-${k}" viewBox="0 0 24 24"><path fill-rule="evenodd" d="${d}"/></symbol>`).join('')+'</svg>');

// ---------- Mobile menu ----------
const mb=document.querySelector('.menu-btn'),nl=document.querySelector('.nav ul');
if(mb)mb.addEventListener('click',()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o)});

// ---------- About: animate skill bars ----------
document.querySelectorAll('.bar i').forEach(b=>setTimeout(()=>b.style.width=b.dataset.w+'%',200));

// ---------- Academic Planner ----------
const form=document.getElementById('taskForm');
if(form){
  let tasks=JSON.parse(localStorage.getItem('jo-tasks')||'[]'),filter='all';
  const list=document.getElementById('taskList');
  const save=()=>localStorage.setItem('jo-tasks',JSON.stringify(tasks));
  function render(){
    list.innerHTML='';
    const shown=tasks.filter(t=>filter==='all'||(filter==='done'?t.done:!t.done));
    if(!shown.length){const e=document.createElement('li');e.className='empty';e.textContent='No tasks here yet. Add your first task above.';list.append(e)}
    shown.forEach(t=>{
      const li=document.createElement('li');li.className=`task ${t.priority}${t.done?' done':''}`;
      const cb=document.createElement('input');cb.type='checkbox';cb.checked=t.done;cb.setAttribute('aria-label','Mark complete');
      cb.onchange=()=>{t.done=cb.checked;save();render()};
      const sp=document.createElement('span');sp.textContent=t.text;
      const sm=document.createElement('small');sm.textContent=`${t.priority} priority${t.due?' · due '+t.due:''}`;sp.append(sm);
      const del=document.createElement('button');del.setAttribute('aria-label','Delete task');
      del.innerHTML='<svg class="ic"><use href="#i-trash"/></svg>';
      del.onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);save();render()};
      li.append(cb,sp,del);list.append(li);
    });
    const d=tasks.filter(t=>t.done).length;
    document.getElementById('nAll').textContent=tasks.length;
    document.getElementById('nDone').textContent=d;
    document.getElementById('nLeft').textContent=tasks.length-d;
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const txt=form.task.value.trim(),err=document.getElementById('taskErr');
    if(!txt){err.textContent='Type a task before adding it.';return}
    err.textContent='';
    tasks.push({id:Date.now(),text:txt,priority:form.priority.value,due:form.due.value,done:false});
    save();form.reset();render();
  });
  document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');filter=b.dataset.f;render();
  });
  render();
}

// ---------- Contact form validation ----------
const cf=document.getElementById('contactForm');
if(cf){
  const rules={
    name:v=>v?'' :'Enter your name.',
    email:v=>!v?'Enter your email address.':/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?'':'Enter a valid email, like name@example.com.',
    phone:v=>!v?'Enter your phone number.':/^\d+$/.test(v)?'':'Use digits only, with no spaces or symbols.',
    message:v=>v?'':'Write a short message.'
  };
  cf.addEventListener('submit',e=>{
    e.preventDefault();let ok=true;
    Object.keys(rules).forEach(k=>{
      const f=cf[k],m=rules[k](f.value.trim()),out=document.getElementById(k+'Err');
      out.textContent=m;f.classList.toggle('bad',!!m);if(m)ok=false;
    });
    document.getElementById('ok').style.display=ok?'block':'none';
    if(ok){cf.reset()}
  });
}
