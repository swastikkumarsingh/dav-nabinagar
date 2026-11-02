/* DAV Nabinagar local-page router
   Replaces the old navigation script without changing the homepage layout or styles.
   Pages are rendered inside the existing #main element. Demo forms do not transmit or store data.
*/
(() => {
  'use strict';

  const SCHOOL_ASSET_HOST = 'davnabinagar.com';
  const PHONE = '';
  const EMAIL = '';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const isHome = !!$('#main .hero');
  const homeFile = isHome ? 'index.html' : 'index.html';
  const localPage = (key) => `${isHome ? '' : homeFile}#/${key}`;

  const groups = {
    About: [
      ['About School', 'about'],
      ['Principal’s Message', 'principal']
    ],
    Admissions: [
      ['Admissions', 'admissions'],
      ['Admission Form', 'admission-form'],
      ['Transfer Certificate', 'tc']
    ],
    Parents: [
      ['Notice Board', 'notices'],
      ['Circulars', 'circulars'],
      ['Pay Online Fee', 'payment'],
      ['OSM Login', 'osm'],
      ['PTM', 'ptm'],
      ['Feedback', 'feedback']
    ],
    'School life': [
      ['Activities', 'activities'],
      ['Achievements', 'achievements'],
      ['Facilities', 'facilities'],
      ['Faculty', 'faculty'],
      ['Student Gallery', 'gallery'],
      ['Student Creative Corner', 'creative']
    ],
    Information: [
      ['Mandatory Public Disclosure', 'disclosure'],
      ['Help Desk · Contact Us', 'contact']
    ]
  };

  // Create the same header/footer shell, but keep all page navigation on this site.
  const headerHost = $('#site-header');
  if (headerHost) {
    headerHost.outerHTML = `
      <header class="top">
        <a class="brand" href="${isHome ? 'index.html' : 'index.html'}" aria-label="DAV Public School home">
          <img src="https://${SCHOOL_ASSET_HOST}/MyImages/LOGO.png" alt="DAV Public School logo">
          <span><b>DAV Public School</b><small>Nabinagar Mahuli, Aurangabad</small></span>
        </a>
        <nav class="main" aria-label="Primary">
          <a href="${localPage('about')}">About</a>
          <a href="${localPage('admissions')}">Admissions</a>
          <a href="${localPage('circulars')}">Circulars</a>
          <a href="${localPage('achievements')}">Achievements</a>
          <a href="${localPage('gallery')}">Gallery</a>
          <a href="${localPage('contact')}">Contact</a>
        </nav>
        <a class="btn pay" href="pay-fees.html">Pay Fees</a>
        <button class="btn glass burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu"><i></i><i></i><i></i></button>
      </header>
      <div class="scrim"></div>
      <nav class="drawer" id="drawer" aria-label="All pages">
        ${Object.entries(groups).map(([heading, links]) =>
          `<h3>${heading}</h3>${links.map(([label, key]) => `<a href="${localPage(key)}">${label}</a>`).join('')}`
        ).join('')}
      </nav>`;
  }

  const footerHost = $('#site-footer');
  if (footerHost) {
    footerHost.outerHTML = `
      <footer id="contact">
        <div class="wrap">
          <div>
            <h3>DAV Public School, Nabinagar Mahuli</h3>
            <p>Nabinagar Mahuli,<br>Aurangabad, Bihar – 824301</p>
            <p>Phone: ${PHONE || 'School contact details to be added'}<br>Email: ${EMAIL || 'School email to be added'}</p>
          </div>
          <div><h3>Quick links</h3>
            <a href="${localPage('admissions')}">Admissions</a>
            <a href="${localPage('tc')}">Transfer Certificate</a>
            <a href="${localPage('gallery')}">Student Gallery</a>
            <a href="${localPage('feedback')}">Feedback</a>
            <a href="${localPage('creative')}">Student Creative Corner</a>
          </div>
          <div><h3>Information</h3>
            <a href="${localPage('disclosure')}">Mandatory Public Disclosure</a>
            <a href="${localPage('circulars')}">Circulars</a>
            <a href="pay-fees.html">Pay Fees</a>
            <a href="${localPage('osm')}">OSM Login</a>
          </div>
          <div><h3>Location</h3><button class="map" type="button">Load map</button></div>
        </div>
        <p class="copy">© DAV Public School, Nabinagar. All rights reserved.</p>
      </footer>
      <nav class="bar" aria-label="Quick actions">
        <a class="pay" href="pay-fees.html">Pay Fees</a>
        <a href="${localPage('osm')}">OSM Login</a>
        <a href="#contact">Contact</a>
      </nav>`;
  }

  // Mobile drawer.
  const header = $('header.top');
  const drawer = $('#drawer');
  const scrim = $('.scrim');
  const burger = $('.burger');
  const toggleDrawer = (open) => {
    if (!drawer || !scrim || !burger) return;
    drawer.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger) burger.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open')));
  if (scrim) scrim.addEventListener('click', () => toggleDrawer(false));
  if (drawer) drawer.addEventListener('click', (event) => {
    if (event.target.closest('a')) toggleDrawer(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleDrawer(false);
      const lightbox = $('#lb');
      if (lightbox?.open) lightbox.close();
    }
  });

  const updateStickyHeader = () => {
    if (header) header.classList.toggle('stuck', !$('.hero') || window.scrollY > 40);
  };
  updateStickyHeader();
  window.addEventListener('scroll', updateStickyHeader, { passive: true });

  // Translate old links to the live davnabinagar.com pages into local hash routes.
  // PDF notices remain downloadable files; they are not page navigation.
  const routeFromOldLink = (anchor) => {
    const raw = anchor.getAttribute('href') || '';
    if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return null;

    let url;
    try { url = new URL(raw, window.location.href); } catch { return null; }
    if (!['davnabinagar.com', 'www.davnabinagar.com'].includes(url.hostname.toLowerCase())) return null;

    const path = decodeURIComponent(url.pathname).toLowerCase();
    if (path.includes('/file/') || /\.(pdf|jpg|jpeg|png|webp|gif|svg)$/i.test(path)) return null;

    if (path.includes('transfer-certificate')) return 'tc';
    if (path.includes('admission-form')) return 'admission-form';
    if (path.endsWith('/admission')) return 'admissions';
    if (path.includes('circular')) return 'circulars';
    if (path.includes('noticeboarddetail')) return 'notices';
    if (path.includes('/osm')) return 'osm';
    if (path.includes('feedback')) return 'feedback';
    if (path.includes('p-t-m') || path.includes('/ptm')) return 'ptm';
    if (path.includes('event-calendar') || path.includes('/event/')) return 'activities';
    if (path.includes('achievement')) return 'achievements';
    if (path.includes('full/photo')) return 'gallery';
    if (path.includes('online-magazine')) return 'creative';
    if (path.includes('mandatory-public-disclosure')) return 'disclosure';
    if (path.includes('about-school')) return 'about';
    if (path.includes('principal')) return 'principal';
    if (path.includes('pay-online-fee') || path.endsWith('/pay')) return 'payment';
    if (path.includes('contact-us')) return 'contact';

    const label = (anchor.textContent || '').trim().toLowerCase();
    if (label.includes('transfer certificate')) return 'tc';
    if (label.includes('gallery') || label.includes('photo')) return 'gallery';
    if (label.includes('admission')) return 'admissions';
    if (label.includes('circular')) return 'circulars';
    if (label.includes('notice')) return 'notices';
    if (label.includes('achievement') || label.includes('medal')) return 'achievements';
    if (label.includes('teacher') || label.includes('gandhi') || label.includes('science day')) return 'activities';
    if (label.includes('principal')) return 'principal';
    if (label.includes('about') || label.includes('story')) return 'about';
    return 'school-info';
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    const key = routeFromOldLink(anchor);
    if (!key) return;
    event.preventDefault();
    toggleDrawer(false);
    if (isHome) {
      window.location.hash = `/${key}`;
    } else {
      window.location.href = `index.html#/${key}`;
    }
  });

  // The fee page's lookup is intentionally local-only until the school supplies an API.
  const feeForm = $('#fee');
  if (feeForm) {
    feeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = $('#msg');
      if (message) {
        message.textContent = feeForm.sid?.value.trim()
          ? 'Fee lookup is not connected to the school system. No student ID was sent or saved.'
          : 'Enter the Admission / Student ID.';
      }
    });
  }

  // On the homepage, render each internal page in the same shell and CSS as the homepage.
  if (!isHome) return;
  const main = $('#main');
  if (!main) return;

  const homeMarkup = main.innerHTML;
  const template = document.createElement('div');
  template.innerHTML = homeMarkup;

  const cloneSection = (selector) => {
    const section = $(selector, template);
    return section ? section.outerHTML : '';
  };
  const page = (title, body) => `
    <section class="notices">
      <div class="wrap">
        ${title ? `<h1>${title}</h1>` : ''}
        ${body}
      </div>
    </section>`;
  const informationPage = (title, detail) => page(title,
    `<p class="note">${detail}</p><p>Use the menu to visit another section of this website.</p>`);

  const makeForm = (title, intro, fields, buttonText) => {
    const inputs = fields.map(([label, name, type]) => {
      if (type === 'textarea') {
        return `<label>${label}<textarea name="${name}" rows="4" required></textarea></label>`;
      }
      return `<label>${label}<input name="${name}" type="${type || 'text'}" ${type === 'date' ? '' : 'required'}></label>`;
    }).join('');
    return page(title, `<p>${intro}</p>
      <form class="card demo" style="margin-top:24px" novalidate>
        ${inputs}
        <button class="btn solid" type="submit" style="margin-top:20px">${buttonText}</button>
        <p class="note form-status" role="status" hidden></p>
        <p class="note">Demo only: this form does not send or save information. A school-authorized backend is required for real submissions.</p>
      </form>`);
  };

  const noticeLists = () => $$('.nlist', template).map((list) => list.outerHTML).join('');
  const activities = () => page('School activities', `
    <ul class="nlist">
      <li><time>2 October</time><strong>Gandhi Jayanti</strong><span>School observance</span></li>
      <li><time>5 September</time><strong>Teacher’s Day</strong><span>School celebration</span></li>
      <li><time>28 February</time><strong>National Science Day</strong><span>School activities</span></li>
    </ul>`);

  const pages = {
    about: ['About School', () => cloneSection('.about')],
    principal: ['Principal’s Message', () => cloneSection('.principal') + page('',
      '<p>The complete principal’s message has not been added to this local copy yet.</p>')],
    admissions: ['Admissions', () => makeForm('Admissions',
      'Send an admission enquiry. The school office must confirm availability and the next steps.',
      [['Child’s name', 'child'], ['Class applying for', 'class'], ['Parent’s name', 'parent'], ['Mobile number', 'mobile', 'tel']],
      'Prepare enquiry')],
    'admission-form': ['Admission Form', () => makeForm('Admission Form',
      'The official admission form is not connected to this local copy. This is a demonstration form only.',
      [['Child’s name', 'child'], ['Date of birth', 'dob', 'date'], ['Class applying for', 'class'], ['Parent’s name', 'parent'], ['Mobile number', 'mobile', 'tel']],
      'Review details')],
    tc: ['Transfer Certificate', () => makeForm('Transfer Certificate',
      'Use this local page to view the request layout. It cannot issue or verify an official certificate.',
      [['Student’s name', 'student'], ['Admission ID', 'admissionId'], ['Class', 'class'], ['Parent’s mobile number', 'mobile', 'tel']],
      'Review request')],
    notices: ['Notice Board', () => cloneSection('.notices')],
    circulars: ['Circulars', () => cloneSection('.notices')],
    ptm: ['Parent–Teacher Meeting', () => informationPage('Parent–Teacher Meeting',
      'The current PTM schedule and booking details have not been supplied for this local website.')],
    feedback: ['Feedback', () => makeForm('Feedback', 'Share feedback about the school website.',
      [['Your name', 'name'], ['Your message', 'message', 'textarea']], 'Review feedback')],
    activities: ['Activities', activities],
    achievements: ['Achievements', () => cloneSection('.ach')],
    facilities: ['Facilities', () => informationPage('Facilities',
      'The school’s verified facilities list has not yet been added to this local copy.')],
    faculty: ['Faculty', () => informationPage('Faculty',
      'Faculty profiles and staff details have not yet been added to this local copy.')],
    gallery: ['Student Gallery', () => cloneSection('.gallery')],
    creative: ['Student Creative Corner', () => informationPage('Student Creative Corner',
      'Student submissions and magazine content have not yet been added to this local copy.')],
    disclosure: ['Mandatory Public Disclosure', () => informationPage('Mandatory Public Disclosure',
      'The required disclosure documents have not yet been copied into this repository.')],
    contact: ['Contact School', () => page('Contact School',
      `<p><strong>DAV Public School, Nabinagar Mahuli</strong><br>Nabinagar Mahuli, Aurangabad, Bihar – 824301</p>
       <p>Phone: ${PHONE || 'School contact details to be added'}<br>Email: ${EMAIL || 'School email to be added'}</p>
       <button class="map" type="button" style="max-width:640px">Load map</button>`) ],
    osm: ['OSM Login', () => informationPage('OSM Login',
      'Student attendance, results and fee history require the school’s authorized OSM service. A secure login has not been integrated into this independent local website.')],
    payment: ['Fee Payment', () => informationPage('Fee Payment',
      'Online payments are not connected to this website. Do not enter card, UPI or banking details here. The school must provide an authorized payment integration before payment can be processed.')],
    'school-info': ['School Information', () => informationPage('School Information',
      'This section has not yet been copied into the local website.')]
  };

  let currentRoute = null;
  const renderRoute = () => {
    const hash = window.location.hash;
    const key = hash.startsWith('#/') ? hash.slice(2).split('?')[0] : '';
    if (key === currentRoute) return;
    currentRoute = key;

    if (!key) {
      main.innerHTML = homeMarkup;
      document.title = 'DAV Public School, Nabinagar Mahuli';
    } else {
      const selected = pages[key] || pages['school-info'];
      main.innerHTML = selected[1]();
      document.title = `${selected[0]} | DAV Public School, Nabinagar Mahuli`;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    updateStickyHeader();
  };

  // Buttons and controls inside dynamically-rendered pages.
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && main.contains(tab)) {
      const tablist = tab.closest('[role="tablist"]');
      if (!tablist) return;
      $$('[role="tab"]', tablist).forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        const panel = $(`#${item.getAttribute('aria-controls')}`);
        if (panel) panel.hidden = !selected;
      });
      return;
    }

    const galleryButton = event.target.closest('.gal button');
    if (galleryButton && main.contains(galleryButton)) {
      const lightbox = $('#lb');
      if (!lightbox) return;
      const image = $('img', lightbox);
      const sourceImage = $('img', galleryButton);
      if (image && sourceImage) {
        image.src = galleryButton.dataset.full || sourceImage.src;
        image.alt = sourceImage.alt;
        lightbox.showModal();
      }
      return;
    }

    const mapButton = event.target.closest('button.map');
    if (mapButton) {
      const frame = document.createElement('iframe');
      frame.className = 'map';
      frame.title = 'School location map';
      frame.loading = 'lazy';
      frame.src = 'https://www.google.com/maps?q=DAV+Public+School+Nabinagar+Mahuli&output=embed';
      frame.style.minHeight = '260px';
      mapButton.replaceWith(frame);
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.matches('.demo')) {
      event.preventDefault();
      const status = $('.form-status', form);
      if (status) {
        status.hidden = false;
        status.textContent = 'Demo mode: no information was sent or stored. The school must connect an authorized server endpoint for real submissions.';
      }
    }
  });

  const lightbox = $('#lb');
  if (lightbox) {
    const closeButton = $('button', lightbox);
    if (closeButton) closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
})();
