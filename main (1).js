(()=>{
const B='https://davnabinagar.com',PHONE='',EMAIL='';/* TODO: school phone '+91…' and email */
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const onIndex=!!q('.hero'),px=onIndex?'':'index.html';
const href=k=>k==='pay'?'pay-fees.html':k==='OSM'?B+'/OSM':`${px}#/${k}`;
const groups={'About':[['About School','about'],['Principal’s Message','principal']],
'Admissions':[['Admissions','admissions'],['Admission Form','admission-form'],['Transfer Certificate','tc']],
'Parents':[['Notice Board','notices'],['Circulars','circulars'],['Pay Online Fee','pay'],['OSM Login','OSM'],['PTM','ptm'],['Feedback','feedback']],
'School life':[['Activities','activities'],['Achievements','achievements'],['Facilities','facilities'],['Faculty','faculty'],['Photo Gallery','gallery'],['Student Creative Corner','creative']],
'Information':[['Mandatory Public Disclosure','disclosure'],['Help Desk · Contact Us','contact']]};
const call=PHONE?`tel:${PHONE}`:'#contact';
q('#site-header').outerHTML=`<header class="top"><a class="brand" href="${px||'#'}"><img src="${B}/MyImages/LOGO.png" alt="DAV Public School logo"><span><b>DAV Public School</b><small>Nabinagar Mahuli, Aurangabad</small></span></a>
<nav class="main" aria-label="Primary"><a href="${href('about')}">About</a><a href="${href('admissions')}">Admissions</a><a href="${href('circulars')}">Circulars</a><a href="${href('achievements')}">Achievements</a><a href="${href('gallery')}">Gallery</a><a href="${href('contact')}">Contact</a></nav>
<a class="btn pay" href="pay-fees.html">Pay Fees</a>
<button class="btn glass burger" aria-expanded="false" aria-controls="drawer" aria-label="Menu"><i></i><i></i><i></i></button></header>
<div class="scrim"></div>
<nav class="drawer" id="drawer" aria-label="All pages">${Object.entries(groups).map(([g,l])=>`<h3>${g}</h3>`+l.map(([t,k])=>`<a href="${href(k)}">${t}</a>`).join('')).join('')}</nav>`;
q('#site-footer').outerHTML=`<footer id="contact"><div class="wrap">
<div><h3>DAV Public School, Nabinagar Mahuli</h3><p>Nabinagar Mahuli,<br>Aurangabad, Bihar – 824301</p><p>Phone: ${PHONE||'to be supplied'}<br>Email: ${EMAIL||'to be supplied'}</p></div>
<div><h3>Quick links</h3>${[['Admissions','admissions'],['Transfer Certificate','tc'],['Gallery','gallery'],['Feedback','feedback'],['Student Creative Corner','creative']].map(([t,k])=>`<a href="${href(k)}">${t}</a>`).join('')}</div>
<div><h3>Information</h3><a href="${href('disclosure')}">Mandatory Public Disclosure</a><a href="${href('circulars')}">Circulars</a><a href="pay-fees.html">Pay Fees</a><a href="${B}/OSM">OSM Login (school portal)</a></div>
<div><h3>Location</h3><button class="map" type="button">Load map</button></div></div>
<p class="copy">© DAV Public School, Nabinagar. All rights reserved.</p></footer>
<nav class="bar" aria-label="Quick actions"><a class="pay" href="pay-fees.html">Pay Fees</a><a href="${B}/OSM">OSM Login</a><a href="${call}">Call School</a></nav>`;
/* drawer + header */
const hd=q('header.top'),dr=q('#drawer'),sc=q('.scrim'),bg=q('.burger');
const tog=o=>{dr.classList.toggle('open',o);sc.classList.toggle('on',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>tog(!dr.classList.contains('open'));sc.onclick=()=>tog(false);
addEventListener('keydown',e=>e.key==='Escape'&&tog(false));qa('a',dr).forEach(a=>a.addEventListener('click',()=>tog(false)));
const stick=()=>hd.classList.toggle('stuck',!q('.hero')||scrollY>40);addEventListener('scroll',stick,{passive:true});
/* delegated interactions */
document.addEventListener('click',e=>{
 const t=e.target.closest('[role=tab]');if(t){const r=t.closest('.wrap');qa('[role=tab]',r).forEach(x=>{const s=x===t;x.setAttribute('aria-selected',s);q('#'+x.getAttribute('aria-controls')).hidden=!s})}
 const g=e.target.closest('.gal button');if(g){const lb=q('#lb');q('img',lb).src=g.dataset.full;q('img',lb).alt=q('img',g).alt;lb.showModal()}
 const m=e.target.closest('.map');if(m&&m.tagName==='BUTTON')m.outerHTML='<iframe class="map" title="School location" loading="lazy" src="https://www.google.com/maps?q=DAV+Public+School+Nabinagar+Mahuli&output=embed"></iframe>'});
const lb=q('#lb');if(lb){q('button',lb).onclick=()=>lb.close();lb.onclick=e=>e.target===lb&&lb.close()}
document.addEventListener('submit',e=>{const f=e.target;
 if(f.id==='fee'){e.preventDefault();q('#msg').textContent=f.sid.value.trim()?'Fee lookup is not connected yet. Use “Continue to secure payment” to pay on the school portal. / शुल्क खोज अभी उपलब्ध नहीं है।':'Enter the Admission / Student ID. / कृपया आईडी दर्ज करें।'}
 if(f.classList.contains('demo')){e.preventDefault();const n=q('.note',f);n.hidden=false;n.textContent='This form works, but it is not connected to the school’s email yet, so nothing was sent or stored. Please call the school office to complete this request.'}});
if(!onIndex)return;
/* in-site router (home page hosts every inner page) */
const main=q('#main'),home=main.innerHTML,tmp=document.createElement('div');tmp.innerHTML=home;
const sp='<div class="spacer"></div>',sec=s=>sp+q(s,tmp).outerHTML;
const txt=(t,b)=>`<section class="page"><div class="wrap"><h1>${t}</h1>${b}</div></section>`;
const todo=(t,w)=>txt(t,`<p class="note">${w} has not been supplied yet. The school should provide it, and it can then be added to this page.</p>`);
const form=(t,i,fs,b)=>txt(t,`<p>${i}</p><form class="card demo" style="margin-top:24px">${fs.map(([l,n,ty])=>ty==='area'?`<label>${l}<textarea name="${n}" rows="4" required></textarea></label>`:`<label>${l}<input name="${n}" type="${ty||'text'}" required></label>`).join('')}<button class="btn solid" style="margin-top:20px">${b}</button><p class="note" role="status" hidden></p></form>`);
const nl=()=>qa('.nlist',tmp).map(u=>u.outerHTML).join('');
const ev=(img,t,d)=>`<div class="ev"><img loading="lazy" src="${B}/File/4564/${img}" alt="${t}"><div><h3>${t}</h3><p>${d}</p></div></div>`;
const P={
about:['About School',()=>sec('.about')],
principal:['Principal’s Message',()=>sec('.principal')+txt('',`<p>Education can be described by its process, by the bond between teacher and student, and by its effect. Knowledge, Vidya, has two broad kinds: Paravidya and Aparavidya.</p><p class="note">The full message text is yet to be supplied by the school.</p>`)],
admissions:['Admissions',()=>form('Admissions','Send an admission enquiry. The school office will confirm the next steps.',[['Child’s name','child'],['Class applying for','cls'],['Parent’s name','parent'],['Mobile number','mob','tel']],'Send enquiry')],
'admission-form':['Admission Form',()=>form('Admission form','The official form and fee details are yet to be supplied. Use this enquiry form until then.',[['Child’s name','child'],['Date of birth','dob','date'],['Class applying for','cls'],['Parent’s name','parent'],['Mobile number','mob','tel']],'Submit')],
tc:['Transfer Certificate',()=>form('Transfer certificate','Request a transfer certificate. Keep the Admission ID ready.',[['Student’s name','name'],['Admission ID','sid'],['Class','cls'],['Parent’s mobile number','mob','tel']],'Send request')],
notices:['Notice Board',()=>txt('Notice board',nl())],
circulars:['Circulars',()=>txt('Circulars',q('#p-parents',tmp).outerHTML.replace(' hidden',''))],
ptm:['PTM',()=>todo('Parent–teacher meetings','The PTM schedule')],
feedback:['Feedback',()=>form('Feedback','Tell us what is working and what is not.',[['Your name','name'],['Message','msg','area']],'Send feedback')],
activities:['Activities',()=>txt('Activities',ev('Event_fa4d7a15-8697-4b64-a0de-1c4ae57daf72_mahatma-gandhi-jayanti-195646-lEqsBm0X.jpg','Gandhi Jayanti','Observed on 2 October, the birthday of Mahatma Gandhi, also marked as the International Day of Non-Violence.')+ev('Event_2b426a5e-fc08-440b-b98b-59224e48bd99_happy-teachers-day.jpg','Teacher’s Day','Celebrated on 5 September, the birth anniversary of Dr Sarvepalli Radhakrishnan.')+ev('Event_be74fe4a-5bf0-4b9c-a3f6-ce456f471572_SCIENCE.jpg','Science Day','National Science Day is observed every year on 28 February.'))],
achievements:['Achievements',()=>sec('.ach')],
facilities:['Facilities',()=>todo('Facilities','The list of facilities')],
faculty:['Faculty',()=>todo('Faculty','Faculty details')],
gallery:['Photo Gallery',()=>sec('.gallery')],
creative:['Student Creative Corner',()=>todo('Student creative corner','Student work')],
disclosure:['Mandatory Public Disclosure',()=>todo('Mandatory public disclosure','The disclosure documents')],
contact:['Contact Us',()=>txt('Contact us',`<p><b>DAV Public School, Nabinagar Mahuli</b><br>Nabinagar Mahuli, Aurangabad, Bihar – 824301</p><p>Phone: ${PHONE||'to be supplied'}<br>Email: ${EMAIL||'to be supplied'}</p><button class="map" type="button" style="max-width:640px">Load map</button>`)]};
let cur='';
const route=()=>{const h=location.hash;if(h==='#contact'&&cur!=='')return;
 const k=h.startsWith('#/')?h.slice(2):'';if(k===cur)return;cur=k;
 const p=P[k];main.innerHTML=p?p[1]():home;document.title=(p?p[0]+' | ':'')+'DAV Public School, Nabinagar Mahuli';
 if(!p&&h.length>1)q(h)?.scrollIntoView();else scrollTo(0,0);stick()};
addEventListener('hashchange',route);route();stick();
})();
