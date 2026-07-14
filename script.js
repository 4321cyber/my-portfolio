document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // MOBILE MENU DRAWER
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll('a')) : [];

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileToggle.classList.add('active');
    document.body.classList.add('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileToggle.focus();
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  mobileToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  if (mobileMenu && mobileLinks.length > 0) {
    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = mobileMenu.querySelectorAll('a[href]');
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  // ==========================================
  // HEADER SCROLL COMPOSITION
  // ==========================================
  const header = document.querySelector('.site-header');

  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================
  // ACTIVE NAV LINKS UPDATE ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ==========================================
  // PORTFOLIO FILTER MECHANIC
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.opacity = '0';
          card.classList.remove('hide');

          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          setTimeout(() => {
            card.classList.add('hide');
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // SCROLL REVEAL — SAFE, PROGRESSIVE SYSTEM
  // ==========================================
  document.body.classList.add('js-ready');

  const revealElements = document.querySelectorAll('.reveal');

  function revealElement(el) {
    el.classList.add('in');
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    requestAnimationFrame(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          revealElement(el);
          revealObserver.unobserve(el);
        }
      });
    });
  } else {
    revealElements.forEach(revealElement);
  }

  // ==========================================
  // INTERSECTION OBSERVER FOR SKILL BARS
  // ==========================================
  const skillFills = document.querySelectorAll('.skill-level-fill');

  if ('IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = `${fill.getAttribute('data-width')}%`;
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

    skillFills.forEach(fill => skillsObserver.observe(fill));
  } else {
    skillFills.forEach(fill => {
      fill.style.width = `${fill.getAttribute('data-width')}%`;
    });
  }

  const skillFillsPro = document.querySelectorAll('.skill-fill-professional');

  if ('IntersectionObserver' in window) {
    const skillsProObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = `${fill.getAttribute('data-width')}%`;
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

    skillFillsPro.forEach(fill => skillsProObserver.observe(fill));
  } else {
    skillFillsPro.forEach(fill => {
      fill.style.width = `${fill.getAttribute('data-width')}%`;
    });
  }

  // ==========================================
  // CONTACT FORM INTERACTION
  // ==========================================
  // --- EmailJS configuration: paste your keys here ---
  const EMAILJS_PUBLIC_KEY = 'DZKd_TkDrjnL088dl';
  const EMAILJS_SERVICE_ID = 'service_kya3xvn';
  const EMAILJS_TEMPLATE_ID = 'template_ca5saor';
  // -------------------------------------------------

  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';
      submitBtn.style.opacity = '0.8';

      const emailjsReady = typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

      const finishSuccess = () => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        submitBtn.style.background = '#00f59b';
        submitBtn.style.color = '#060913';
        submitBtn.style.opacity = '1';

        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      };

      const finishError = () => {
        submitBtn.innerHTML = 'Failed to Send';
        submitBtn.style.background = '#ff5470';
        submitBtn.style.color = '#ffffff';
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      };

      if (!emailjsReady) {
        console.warn('EmailJS not configured. Add your keys in script.js (EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID).');
        setTimeout(finishSuccess, 1500);
        return;
      }

      const templateParams = {
        from_name: contactForm.contactName.value,
        from_email: contactForm.contactEmail.value,
        message: contactForm.contactMessage.value
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => finishSuccess())
        .catch((error) => {
          console.error('EmailJS send failed:', error);
          finishError();
        });
    });
  }

  // ==========================================
  // FOOTER COPYRIGHT YEAR AUTOLOAD
  // ==========================================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // SMOOTH ANCHOR NAVIGATION FALLBACK
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerHeight = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // ADMIN PANEL (5-CLICK EASTER EGG + UPLOAD)
  // ==========================================
  const adminFab = document.getElementById('adminFab');
  const adminModal = document.getElementById('adminModal');
  const modalClose = document.getElementById('modalClose');
  const decryptKeyInput = document.getElementById('decryptKey');
  const submitKeyBtn = document.getElementById('submitKeyBtn');
  const authScreen = document.getElementById('authScreen');
  const uploadScreen = document.getElementById('uploadScreen');
  const projectUploadForm = document.getElementById('projectUploadForm');
  const previewProjBtn = document.getElementById('previewProjBtn');
  const livePreviewContainer = document.getElementById('livePreviewContainer');
  const previewCardSlot = document.getElementById('previewCardSlot');
  const previewClose = document.getElementById('previewClose');
  const previewModal = document.getElementById('previewModal');

  // Image source elements
  const tabFile = document.getElementById('tabFile');
  const tabUrl = document.getElementById('tabUrl');
  const panelFile = document.getElementById('panelFile');
  const panelUrl = document.getElementById('panelUrl');
  const dropZone = document.getElementById('dropZone');
  const projImageInput = document.getElementById('projImage');
  const fileChosenPreview = document.getElementById('fileChosenPreview');
  const fileThumb = document.getElementById('fileThumb');
  const fileNameLabel = document.getElementById('fileNameLabel');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const projImageUrl = document.getElementById('projImageUrl');
  const urlPreviewContainer = document.getElementById('urlPreviewContainer');
  const urlThumb = document.getElementById('urlThumb');
  const loadUrlBtn = document.getElementById('loadUrlBtn');
  const removeUrlBtn = document.getElementById('removeUrlBtn');

  let fabClicks = 0;
  let clickTimeout = null;
  let activeImageSource = null;
  let projectImageBase64 = null;
  let projectImageUrl = null;
  const CORRECT_DECRYPT_KEY = 'giovanne2026';

  // Tab switching
  function switchTab(tab) {
    if (tab === 'file') {
      tabFile.classList.add('active');
      tabUrl.classList.remove('active');
      panelFile.classList.remove('hide');
      panelUrl.classList.add('hide');
    } else {
      tabUrl.classList.add('active');
      tabFile.classList.remove('active');
      panelUrl.classList.remove('hide');
      panelFile.classList.add('hide');
    }
  }

  tabFile.addEventListener('click', () => switchTab('file'));
  tabUrl.addEventListener('click', () => switchTab('url'));

  // File upload via drop-zone click or drag-and-drop
  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be under 10 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      projectImageBase64 = e.target.result;
      activeImageSource = 'file';
      fileThumb.src = projectImageBase64;
      fileNameLabel.textContent = file.name;
      fileChosenPreview.classList.remove('hide');
      dropZone.style.minHeight = '0';
    };
    reader.readAsDataURL(file);
  }

  projImageInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  dropZone.addEventListener('click', () => {
    projImageInput.click();
  });

  removeFileBtn.addEventListener('click', () => {
    projImageInput.value = '';
    projectImageBase64 = null;
    activeImageSource = null;
    fileChosenPreview.classList.add('hide');
    fileThumb.src = '';
    fileNameLabel.textContent = 'No file chosen';
    dropZone.style.minHeight = '';
  });

  // URL image load
  loadUrlBtn.addEventListener('click', () => {
    const url = projImageUrl.value.trim();
    if (!url) {
      alert('Please paste an image URL first.');
      return;
    }
    const testImg = new Image();
    testImg.onload = () => {
      projectImageUrl = url;
      activeImageSource = 'url';
      urlThumb.src = url;
      urlPreviewContainer.classList.remove('hide');
      loadUrlBtn.textContent = '✓ Image Loaded';
      loadUrlBtn.style.borderColor = 'var(--accent-primary)';
      loadUrlBtn.style.color = 'var(--accent-primary)';
    };
    testImg.onerror = () => {
      alert('Could not load image from that URL. Make sure it is a direct image link and that the server allows cross-origin requests.');
    };
    testImg.src = url;
  });

  removeUrlBtn.addEventListener('click', () => {
    projectImageUrl = null;
    activeImageSource = null;
    projImageUrl.value = '';
    urlThumb.src = '';
    urlPreviewContainer.classList.add('hide');
    loadUrlBtn.textContent = 'Load & Preview Image';
    loadUrlBtn.style.borderColor = '';
    loadUrlBtn.style.color = '';
  });

  // 5-click FAB trigger
  adminFab.addEventListener('click', () => {
    fabClicks++;
    if (clickTimeout) clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => { fabClicks = 0; }, 2500);

    if (fabClicks === 5) {
      adminModal.classList.add('open');
      document.body.classList.add('menu-open');
      authScreen.classList.remove('hide');
      uploadScreen.classList.add('hide');
      decryptKeyInput.value = '';
      decryptKeyInput.classList.remove('shake-input');
      fabClicks = 0;
    }
  });

  // Modal close trigger
  function closeAdminModal() {
    adminModal.classList.remove('open');
    document.body.classList.remove('menu-open');
    projectUploadForm.reset();
    projectImageBase64 = null;
    projectImageUrl = null;
    activeImageSource = null;
    fileChosenPreview.classList.add('hide');
    fileThumb.src = '';
    urlPreviewContainer.classList.add('hide');
    urlThumb.src = '';
    projImageUrl.value = '';
    loadUrlBtn.textContent = 'Load & Preview Image';
    loadUrlBtn.style.borderColor = '';
    loadUrlBtn.style.color = '';
    dropZone.style.minHeight = '';
    livePreviewContainer.classList.add('hide');
    previewCardSlot.innerHTML = '';
    switchTab('file');
  }

  modalClose.addEventListener('click', closeAdminModal);
  adminModal.addEventListener('click', (e) => { if (e.target === adminModal) closeAdminModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (adminModal.classList.contains('open')) {
        closeAdminModal();
      } else if (previewModal && previewModal.classList.contains('open')) {
        closePreviewModal();
      }
    }
  });

  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.project-view-btn');
      if (!btn) return;
      const card = btn.closest('.project-card');
      if (!card) return;
      const imgSrc = card.getAttribute('data-image') || 'images/apex_analytics.jpg';
      const liveLink = card.getAttribute('data-live-link') || '';
      openPreviewModal(imgSrc, liveLink);
    });
  }

  function openPreviewModal(imageSrc, liveLink) {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('previewIframe');
    const img = document.getElementById('previewImage');
    const fallback = document.getElementById('previewFallback');
    const fallbackLink = document.getElementById('previewFallbackLink');

    modal.classList.add('open');
    document.body.classList.add('menu-open');
    fallback.style.display = 'none';

    if (liveLink) {
      iframe.src = liveLink;
      iframe.style.display = 'block';
      img.style.display = 'none';
      fallbackLink.href = liveLink;

      iframe.onload = () => {
        setTimeout(() => {
          try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (!doc) throw new Error('No document');
          } catch (e) {
            showPreviewFallback();
          }
        }, 500);
      };
    } else {
      iframe.style.display = 'none';
      iframe.src = 'about:blank';
      img.src = imageSrc;
      img.style.display = 'block';
    }
  }

  function showPreviewFallback() {
    document.getElementById('previewIframe').style.display = 'none';
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('previewFallback').style.display = 'flex';
  }

  function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    modal.classList.remove('open');
    document.body.classList.remove('menu-open');
    const iframe = document.getElementById('previewIframe');
    iframe.src = 'about:blank';
    iframe.style.display = 'none';
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('previewFallback').style.display = 'none';
  }

  if (previewClose) {
    previewClose.addEventListener('click', closePreviewModal);
  }
  if (previewModal) {
    previewModal.addEventListener('click', (e) => { if (e.target === previewModal) closePreviewModal(); });
  }

  // Key authentication
  if (submitKeyBtn) {
    submitKeyBtn.addEventListener('click', () => {
      if (decryptKeyInput.value.trim() === CORRECT_DECRYPT_KEY) {
        authScreen.classList.add('hide');
        uploadScreen.classList.remove('hide');
      } else {
        decryptKeyInput.classList.add('shake-input');
        decryptKeyInput.focus();
        setTimeout(() => decryptKeyInput.classList.remove('shake-input'), 500);
      }
    });
  }
  decryptKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitKeyBtn.click(); });

  // Get active image source
  function getImageSource() {
    if (activeImageSource === 'file' && projectImageBase64) return projectImageBase64;
    if (activeImageSource === 'url' && projectImageUrl) return projectImageUrl;
    return null;
  }

  // Build card HTML
  function generateProjectCardHtml(title, desc, tagsArray, imageSource, liveLink, category) {
    const tagsHtml = tagsArray.map(t => `<span class="tag">${t.trim()}</span>`).join('');
    const linkHref = liveLink || '#contact';
    const linkText = liveLink ? 'Visit Project' : 'Inquire Details';
    const card = document.createElement('div');
    card.className = 'project-card reveal in';
    card.style.borderColor = 'var(--accent-primary)';
    card.style.boxShadow = '0 10px 25px rgba(0,245,155,0.15)';
    if (category) card.setAttribute('data-category', category);
    card.setAttribute('data-image', imageSource);
    card.setAttribute('data-live-link', liveLink || '');
    card.innerHTML = `
      <div class="project-image">
        <img src="${imageSource}" alt="${title}">
        <div class="project-overlay">
          <button type="button" class="project-view-btn" title="Preview project">
            <span class="project-view-tag">Live Preview</span>
          </button>
        </div>
      </div>
      <div class="project-body">
        <div class="project-tags">${tagsHtml}</div>
        <h3 class="project-title">${title}</h3>
        <p class="project-desc">${desc}</p>
        <a href="${linkHref}" class="project-link" ${liveLink ? 'target="_blank" rel="noopener noreferrer"' : ''}>${linkText} <span class="arrow">&rarr;</span></a>
      </div>`;
    return card;
  }

  // Preview button
  previewProjBtn.addEventListener('click', () => {
    const title = document.getElementById('projTitle').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const tagsRaw = document.getElementById('projTags').value.trim();
    const imgSrc = getImageSource() || 'images/apex_analytics.jpg';

    if (!title || !desc || !tagsRaw) {
      alert('Please fill in Title, Description, and Tags before previewing.');
      return;
    }

    const newCard = generateProjectCardHtml(title, desc, tagsRaw.split(','), imgSrc, document.getElementById('projLink').value.trim(), document.getElementById('projCategory').value);
    previewCardSlot.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'preview-card-wrapper';
    wrapper.appendChild(newCard);
    previewCardSlot.appendChild(wrapper);
    livePreviewContainer.classList.remove('hide');
    adminModal.querySelector('.modal-content').scrollTo({ top: 9999, behavior: 'smooth' });
  });

  // Form submit (Post to portfolio)
  projectUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('projTitle').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const category = document.getElementById('projCategory').value;
    const tagsRaw = document.getElementById('projTags').value.trim();
    const liveLink = document.getElementById('projLink').value.trim();
    const imgSrc = getImageSource();

    if (!title || !desc || !tagsRaw) {
      alert('Please fill in all required fields (Title, Description, Tags).');
      return;
    }
    if (!imgSrc) {
      alert('Please add a project image — either upload a file or load one from a URL.');
      return;
    }

    const projectData = {
      title,
      description: desc,
      category,
      tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()) : [],
      liveLink,
      imageBase64: activeImageSource === 'file' ? imgSrc : null,
      imageUrl: activeImageSource === 'url' ? imgSrc : null,
    };

    try {
      await syncProjectToFirestore(projectData);
    } catch (error) {
      alert('Failed to save project to Firestore: ' + error.message);
      return;
    }

    const newCard = generateProjectCardHtml(title, desc, tagsRaw.split(','), imgSrc, liveLink, category);
    newCard.style.outline = '2px solid var(--accent-primary)';
    newCard.style.outlineOffset = '4px';

    const grid = document.querySelector('.projects-grid');
    if (grid) {
      grid.insertBefore(newCard, grid.firstChild);
      setTimeout(() => {
        newCard.style.transition = 'outline 1.5s ease';
        newCard.style.outline = '2px solid transparent';
      }, 1000);
    }

    alert('Project saved permanently to portfolio and Firestore!');

    closeAdminModal();

    setTimeout(() => {
      const sec = document.getElementById('projects');
      if (sec) window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }, 500);
  });

  // ==========================================
  // FIREBASE INTEGRATION (CONFIG IN CODE)
  // ==========================================
  const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAWqiBne9K5CAlPu6lKM0Hj_pIauCoFbKM",
  authDomain: "portfolio-ed333.firebaseapp.com",
  projectId: "portfolio-ed333",
  storageBucket: "portfolio-ed333.firebasestorage.app",
  messagingSenderId: "1062583790235",
  appId: "1:1062583790235:web:656d9185098a575afa343e",
  measurementId: "G-06T5K33B55"
};

  let db = null;

  async function initFirebase() {
    try {
      if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        console.log('Firebase initialized successfully.');
        return true;
      } else {
        console.error('Firebase SDK not loaded.');
        return false;
      }
    } catch (error) {
      console.error('Firebase init error:', error.message);
      return false;
    }
  }

  async function loadProjectsFromFirestore() {
    if (!db) {
      const initialized = await initFirebase();
      if (!initialized) return;
    }

    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = '<div id="projectsLoading" class="projects-loading">Loading projects...</div>';

    try {
      const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
      grid.innerHTML = '';

      if (snapshot.empty) {
        grid.innerHTML = '<div class="projects-empty">No projects found.</div>';
        console.log('No projects found in Firestore.');
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const tagsArray = data.tags || [];
        const imgSrc = data.imageUrl || data.imageBase64 || 'images/apex_analytics.jpg';
        const newCard = generateProjectCardHtml(data.title, data.description, tagsArray, imgSrc, data.liveLink || '', data.category);
        newCard.setAttribute('data-firestore-id', doc.id);
        grid.appendChild(newCard);
      });

      console.log(`Loaded ${snapshot.size} project(s) from Firestore.`);
    } catch (error) {
      grid.innerHTML = '<div class="projects-empty">Failed to load projects.</div>';
      console.error('Failed to load projects:', error.message);
    }
  }

  async function syncProjectToFirestore(projectData) {
    if (!db) {
      const initialized = await initFirebase();
      if (!initialized) {
        throw new Error('Firebase initialization failed. Cannot save project.');
      }
    }

    try {
      await db.collection('projects').add({
        ...projectData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('Project synced to Firestore successfully.');
    } catch (error) {
      console.error('Failed to sync:', error.message);
      throw error;
    }
  }

  // Auto-load projects from Firestore on page load
  function autoLoadFromFirestore() {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      setTimeout(autoLoadFromFirestore, 500);
      return;
    }
    loadProjectsFromFirestore();
  }

  if (document.readyState === 'complete') {
    autoLoadFromFirestore();
  } else {
    window.addEventListener('load', autoLoadFromFirestore);
  }

  const cvDownloadBtn = document.getElementById('cvDownloadBtn');
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', async () => {
      const cvUrl = 'assets/resume/Giovanne_Agblevor_CV.docx';
      try {
        const response = await fetch(cvUrl, { method: 'HEAD' });
        if (response.ok) {
          const a = document.createElement('a');
          a.href = cvUrl;
          a.download = 'Giovanne_Agblevor_CV.docx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          throw new Error('CV file not found');
        }
      } catch (error) {
        window.open(cvUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
});
