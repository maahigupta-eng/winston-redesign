const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const gate = $('#gate'), app = $('#appShell'), bg = $('#gateBg'), glow = $('#cursorGlow');
const steps = [
  ['Meet Winston','Winston is introduced as an intelligence environment, not a text box. The site should first teach the user how to move through it.'],
  ['Define sovereignty','The theory appears in large, readable blocks: material reproduction, symbolic authority, contested claims, and institutional limits.'],
  ['Test a case','The user clicks a country, company, or UN office and Winston opens the relevant sovereignty condition.'],
  ['See misallocation','Charts become flows: actual money, wrong diagnosis, corrected material/symbolic mix, expected consequence.'],
  ['Meet Maahi','Your photos and story sit on their own page, showing the builder, thesis journey, and why this became Winston.']
];
const cases = {
  Pakistan:['Shared and contested sovereignty','Winston maps material pressures, symbolic legitimacy, military authority, civilian institutions, and external support before recommending resource allocation.'],
  Ukraine:['Territorial invasion + symbolic reproduction','Winston separates battlefield support from recognition, alliance narrative, sanctions legitimacy, and the reproduction of Ukrainian state authority.'],
  Meta:['Platform sovereignty','Winston tests whether a corporation can discipline symbolic and material conditions across users, infrastructure, moderation, and markets.'],
  'UN Offices':['Institutional sovereignty','Winston asks when UN presence stabilizes authority and when missions become symbolic without matching material power.']
};
function setJourney(i=0){ $$('.timeline button').forEach((b,n)=>b.classList.toggle('active',n===i)); $('#journeyCard').innerHTML=`<h3>${steps[i][0]}</h3><p>${steps[i][1]}</p>`; }
function setCase(name='Pakistan'){ const [tag,body]=cases[name]; $('#caseCard').innerHTML=`<p class="overline">${tag}</p><h3>${name}</h3><p>${body}</p><a class="btn primary" href="#demo">Run visual demo</a>`; }
function updateClocks(){ const opts={hour:'2-digit',minute:'2-digit',hour12:false}; $('#clockNY').textContent=new Intl.DateTimeFormat('en-US',{...opts,timeZone:'America/New_York'}).format(new Date()); $('#clockGeneva').textContent=new Intl.DateTimeFormat('en-US',{...opts,timeZone:'Europe/Zurich'}).format(new Date()); $('#clockIslamabad').textContent=new Intl.DateTimeFormat('en-US',{...opts,timeZone:'Asia/Karachi'}).format(new Date()); $('#clockDelhi').textContent=new Intl.DateTimeFormat('en-US',{...opts,timeZone:'Asia/Kolkata'}).format(new Date()); }
document.addEventListener('mousemove',e=>{ const x=e.clientX/window.innerWidth*100, y=e.clientY/window.innerHeight*100; document.documentElement.style.setProperty('--mx',x+'%'); document.documentElement.style.setProperty('--my',y+'%'); if(glow){glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'} if(bg){bg.style.transform=`translate(${(x-50)/-18}px,${(y-50)/-18}px) scale(1.06)`} });
$('#enterBtn').addEventListener('click',()=>{ gate.classList.add('hide'); app.classList.add('live'); app.setAttribute('aria-hidden','false'); setTimeout(()=>gate.style.display='none',900); });
$('#menuBtn').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
$$('.timeline button').forEach((b,i)=>b.addEventListener('click',()=>setJourney(i)));
$$('.map-pin').forEach(b=>b.addEventListener('click',()=>setCase(b.dataset.case)));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.16}); $$('.reveal').forEach(el=>io.observe(el));
setJourney(0); setCase('Pakistan'); updateClocks(); setInterval(updateClocks,1000);
new Chart($('#splitChart'),{type:'doughnut',data:{labels:['Material','Symbolic','Institutional drag'],datasets:[{data:[42,38,20],borderWidth:0}]},options:{plugins:{legend:{labels:{color:'#f4efe6',font:{family:'Inter'}}}},animation:{animateRotate:true,duration:1800}}});
