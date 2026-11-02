(()=>{
const B='https://davnabinagar.com',PHONE='';/* TODO: add school phone, e.g. '+91XXXXXXXXXX' */
const idx=location.pathname.endsWith('pay-fees.html')?'index.html':'';
const groups={'About':[['About School','638519BA-60C7-4EF4-83D7-C08DC3CD7A44/CMS/Page/About-School'],['Principal’s Message','1716C582-A288-4485-9026-54EB82C65A49/CMS/Page/Principal%e2%80%99s-Message']],
'Admissions':[['Admissions','Admission'],['Admission Form','1D13B7E1-A4B9-42A3-A6E0-E653583D2F79/CMS/Page/Admission-Form'],['Transfer Certificate','transfer-certificate']],
'Parents':[['Circulars','4B061AB5-B643-4395-AAE6-6A120C2EC393/CMS/Page/Circulars'],['Pay Online Fee','pay'],['OSM Login','OSM'],['PTM','DA298B97-EA64-48C8-877E-3EBE146090F5/CMS/Page/P-T-M'],['Feedback','feedback']],
'School life':[['Activities','Event-Calendar'],['Achievements','Achievement'],['Facilities',''],['Faculty',''],['Photo Gallery','Full/Photo/all'],['Student Creative Corner','Online-Magazine?mz=1']],
'Information':[['Mandatory Public Disclosure','B9BBBABB-9B5B-43E6-93BA-E8B255865E6C/CMS/Page/MANDATORY-PUBLIC-DISCLOSURE'],['Help Desk · Contact Us','F4086BCE-DD26-4519-98BB-555CCCF08240/CMS/Page/Contact-Us']]};
const href=p=>p==='pay'?'pay-fees.html':`${B}/${p}`;
const home=idx||'';
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const call=PHONE?`tel:${PHONE}`:'#contact';
q('#site-header').outerHTML=`<header class="top"><a class="brand" href="${home||'index.html'}"><img src="${B}/MyImages/LOGO.png" alt="DAV Public School logo"><span><b>DAV Public School</b><small>Nabinagar Mahuli, Aurangabad</small></span></a>
<nav class="main" aria-label="Primary"><a href="${home}#about">About</a><a href="${B}/Admission">Admissions</a><a href="${B}/${groups.Parents[0][1]}">Circulars</a><a href="${home}#achievements">Achievements</a><a href="${home}#gallery">Gallery</a><a href="${home}#contact">Contact</a></nav>
<a class="btn pay" href="pay-fees.html">Pay Fees</a>
<button class="btn glass burger" aria-expanded="false" aria-controls="drawer" aria-label="Menu"><i></i><i></i><i></i></button></header>
<div class="scrim"></div>
<nav class="drawer" id="drawer" aria-label="All pages">${Object.entries(groups).map(([g,l])=>`<h3>${g}</h3>`+l.map(([t,p])=>`<a href="${p===''?B+'/':href(p)}">${t}</a>`).join('')).join('')}</nav>`;
q('#site-footer').outerHTML=`<footer id="contact"><div class="wrap">
<div><h3>DAV Public School, Nabinagar Mahuli</h3><p>Nabinagar Mahuli,<br>Aurangabad, Bihar – 824301</p><p>Website: <a href="${B}">davnabinagar.com</a><br>Email &amp; phone: to be supplied by the school</p></div>
<div><h3>Quick links</h3><a href="${B}/Admission">Admission</a><a href="${B}/transfer-certificate">Transfer Certificate</a><a href="${B}/Full/Photo/all">Gallery</a><a href="${B}/feedback">Feedback</a><a href="${B}/Online-Magazine?mz=1">Student Creative Corner</a></div>
<div><h3>Information</h3><a href="${B}/${groups.Information[0][1]}">Mandatory Public Disclosure</a><a href="${B}/${groups.Parents[0][1]}">Circulars</a><a href="pay-fees.html">Pay Fees</a><a href="${B}/OSM">OSM Login</a></div>
<div><h3>Location</h3><button class="map" type="button">Load map</button></div></div>
<p class="copy">© DAV Public School, Nabinagar. All rights reserved.</p></footer>
<nav class="bar" aria-label="Quick actions"><a class="pay" href="pay-fees.html">Pay Fees</a><a href="${B}/OSM">OSM Login</a><a href="${call}">Call School</a></nav>`;
const hd=q('header.top'),dr=q('#drawer'),sc=q('.scrim'),bg=q('.burger');
const tog=o=>{dr.classList.toggle('open',o);sc.classList.toggle('on',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>tog(!dr.classList.contains('open'));sc.onclick=()=>tog(false);
addEventListener('keydown',e=>e.key==='Escape'&&tog(false));qa('a',dr).forEach(a=>a.addEventListener('click',()=>tog(false)));
const stick=()=>hd.classList.toggle('stuck',!q('.hero')||scrollY>40);stick();addEventListener('scroll',stick,{passive:true});
/* tabs */
const tabs=qa('[role=tab]');tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>{const s=x===t;x.setAttribute('aria-selected',s);q('#'+x.getAttribute('aria-controls')).hidden=!s})});
/* lightbox */
const lb=q('#lb');if(lb){qa('.gal button').forEach(b=>b.onclick=()=>{q('img',lb).src=b.dataset.full;q('img',lb).alt=q('img',b).alt;lb.showModal()});
q('button',lb).onclick=()=>lb.close();lb.onclick=e=>e.target===lb&&lb.close()}
/* click-to-load map */
q('.map').onclick=e=>{e.target.outerHTML='<iframe class="map" title="School location" loading="lazy" src="https://www.google.com/maps?q=DAV+Public+School+Nabinagar+Mahuli&output=embed"></iframe>'};
/* fee form: no fabricated data */
const f=q('#fee');if(f)f.onsubmit=e=>{e.preventDefault();q('#msg').textContent=f.sid.value.trim()?'Fee lookup is not connected yet. Use “Continue to secure payment” to pay on the school portal. / शुल्क खोज अभी उपलब्ध नहीं है।':'Enter the Admission / Student ID. / कृपया आईडी दर्ज करें।'};
})();
