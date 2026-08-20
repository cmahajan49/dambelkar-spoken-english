/**
 * ============================================================================
 * DAMBELKARS SPOKEN ENGLISH CLASSES
 * Master Frontend Demo Script (Pure Client-Side)
 * Optimized for Mobile & Desktop
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation (Side Drawer + Backdrop)
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const navItems = document.querySelectorAll('.nav-item');

  function openDrawer() {
    if (navLinks) navLinks.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (navLinks) navLinks.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --------------------------------------------------------------------------
  // 2. Active Navigation Link on Scroll & Back-to-Top Button
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 140;

    // Active nav link highlight
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (targetNav) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navItems.forEach(link => link.classList.remove('active'));
          targetNav.classList.add('active');
        }
      }
    });

    // Back to top button visibility
    if (backToTopBtn) {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Copy Address Functionality & Toast Notification
  // --------------------------------------------------------------------------
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  let toastTimer;

  function showToast(message) {
    if (!toastNotification) return;
    if (toastText) toastText.textContent = message;

    toastNotification.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 2500);
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = "Dambelkars Spoken English Classes, Vikas Mitra Mandal Chowk, Dnydeep Colony, Wanawari, Hingne Budrukh, Karvenagar, Pune, Maharashtra 411052";
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
          showToast("Address copied to clipboard!");
        }).catch(() => {
          showToast("Address: Karvenagar, Pune 411052");
        });
      } else {
        showToast("Address: Karvenagar, Pune 411052");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Animated Number Counters
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  let hasAnimatedCounters = false;

  function animateCounters() {
    if (hasAnimatedCounters) return;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 40);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.textContent = count;
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });

    hasAnimatedCounters = true;
  }

  // Trigger counters on load
  setTimeout(animateCounters, 300);

  // --------------------------------------------------------------------------
  // 5. FAQ Accordion Interaction
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for accordion behavior
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 6. Strict 10-Digit Mobile Number Validation Handler (Reusable)
  // Requirements:
  // - Accepts ONLY digits (0-9)
  // - Exactly 10 digits
  // - Rejects letters, special characters, spaces, punctuation
  // - Rejects more than 10 digits
  // - Real-time feedback message and counter (X/10)
  // - Form cannot submit until exactly 10 digits are entered
  // --------------------------------------------------------------------------
  function setupStrictPhoneInput(inputElement, counterElement, statusTextElement) {
    if (!inputElement) return;

    function updateStatus(message, type) {
      if (!statusTextElement) return;
      statusTextElement.className = 'phone-status-text';
      if (!message || type === 'clear') {
        statusTextElement.textContent = '';
        statusTextElement.classList.remove('show');
        return;
      }

      statusTextElement.textContent = message;
      if (type === 'error') {
        statusTextElement.classList.add('status-error', 'show');
      } else if (type === 'success') {
        statusTextElement.classList.add('status-success', 'show');
      } else {
        statusTextElement.classList.add('status-info', 'show');
      }
    }

    function validate() {
      const rawVal = inputElement.value;
      const cleanDigits = rawVal.replace(/\D/g, '');

      // Strictly remove non-digits
      if (rawVal !== cleanDigits) {
        inputElement.value = cleanDigits;
      }

      const count = cleanDigits.length;
      if (counterElement) {
        counterElement.textContent = `${count}/10`;
      }

      if (count === 0) {
        inputElement.classList.remove('is-valid', 'is-invalid');
        updateStatus('Please enter a 10-digit mobile number.', 'info');
        return false;
      }

      if (count < 10) {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
        updateStatus(`Contact number must be exactly 10 digits. Currently: ${count}/10`, 'error');
        return false;
      }

      if (count === 10) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        updateStatus('✓ Valid 10-digit mobile number.', 'success');
        return true;
      }

      if (count > 10) {
        inputElement.value = cleanDigits.slice(0, 10);
        if (counterElement) counterElement.textContent = '10/10';
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        updateStatus('Maximum 10 digits allowed. Extra numbers removed.', 'error');
        return true;
      }

      return false;
    }

    // Keydown Listener: Disallow non-numeric keys, spaces, and >10 digits
    inputElement.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
        'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End'
      ];

      // Allow shortcut commands (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X)
      if (e.ctrlKey || e.metaKey) return;

      // Allow control navigation keys
      if (allowedKeys.includes(e.key)) return;

      // Disallow space key
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        updateStatus('Spaces are not allowed. Digits only.', 'error');
        return;
      }

      // Check if key is digit 0-9
      const isDigit = /^[0-9]$/.test(e.key);
      if (!isDigit) {
        e.preventDefault();
        updateStatus('Only digits (0-9) are accepted. No letters or symbols.', 'error');
        return;
      }

      // Check if limit of 10 is reached and no text is selected
      const selectedLength = inputElement.selectionEnd - inputElement.selectionStart;
      const currentCount = inputElement.value.replace(/\D/g, '').length;
      if (currentCount >= 10 && selectedLength === 0) {
        e.preventDefault();
        updateStatus('Cannot enter more than 10 digits.', 'error');
      }
    });

    // Input Listener
    inputElement.addEventListener('input', validate);

    // Paste Listener
    inputElement.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteText = (e.clipboardData || window.clipboardData).getData('text');
      const cleanPaste = pasteText.replace(/\D/g, '').slice(0, 10);

      if (!cleanPaste) {
        updateStatus('Pasted content contains no valid digits.', 'error');
        return;
      }

      inputElement.value = cleanPaste;
      validate();
    });

    // Blur / Focus
    inputElement.addEventListener('focus', validate);
    inputElement.addEventListener('blur', validate);

    return { validate };
  }

  // Setup Contact Form Phone Validator
  const contactPhoneInput = document.getElementById('userPhone');
  const contactPhoneCounter = document.getElementById('digitCountPill');
  const contactPhoneStatus = document.getElementById('phoneStatusText');
  const contactPhoneValidator = setupStrictPhoneInput(contactPhoneInput, contactPhoneCounter, contactPhoneStatus);

  // Setup Modal Demo Form Phone Validator
  const modalPhoneInput = document.getElementById('modalPhone');
  const modalPhoneCounter = document.getElementById('modalDigitCount');
  const modalPhoneStatus = document.getElementById('modalPhoneStatusText');
  const modalPhoneValidator = setupStrictPhoneInput(modalPhoneInput, modalPhoneCounter, modalPhoneStatus);

  // --------------------------------------------------------------------------
  // 7. Modal Management System (Demo Modal, Course Modal, Success Modal, Lightbox)
  // --------------------------------------------------------------------------
  const demoModalOverlay = document.getElementById('demoModalOverlay');
  const courseModalOverlay = document.getElementById('courseModalOverlay');
  const successModalOverlay = document.getElementById('successModalOverlay');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  const openDemoBtns = document.querySelectorAll('.open-demo-modal');
  const closeDemoModalBtn = document.getElementById('closeDemoModalBtn');
  const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  function openModal(modal) {
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open Demo Modal Triggers
  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      // If course modal was open, close it first
      if (courseModalOverlay) closeModal(courseModalOverlay);
      openModal(demoModalOverlay);
    });
  });

  // Close Buttons
  if (closeDemoModalBtn) closeDemoModalBtn.addEventListener('click', () => closeModal(demoModalOverlay));
  if (closeCourseModalBtn) closeCourseModalBtn.addEventListener('click', () => closeModal(courseModalOverlay));
  if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', () => closeModal(successModalOverlay));
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => closeModal(lightboxOverlay));

  // Close on Backdrop Click
  [demoModalOverlay, courseModalOverlay, successModalOverlay, lightboxOverlay].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal(overlay);
        }
      });
    }
  });

  // Close on ESC Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [demoModalOverlay, courseModalOverlay, successModalOverlay, lightboxOverlay].forEach(overlay => {
        closeModal(overlay);
      });
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 8. Course Explore Modal Handler
  // --------------------------------------------------------------------------
  const exploreBtns = document.querySelectorAll('.btn-explore');
  const courseDetailTitle = document.getElementById('courseDetailTitle');
  const courseDetailDesc = document.getElementById('courseDetailDesc');
  const courseDetailDuration = document.getElementById('courseDetailDuration');
  const courseDetailLevel = document.getElementById('courseDetailLevel');
  const modalCourseSelect = document.getElementById('modalCourse');

  exploreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course') || 'Spoken English';
      const courseDesc = btn.getAttribute('data-desc') || '';
      const courseDuration = btn.getAttribute('data-duration') || '2 Months';
      const courseLevel = btn.getAttribute('data-level') || 'All Levels';

      if (courseDetailTitle) courseDetailTitle.textContent = courseName;
      if (courseDetailDesc) courseDetailDesc.textContent = courseDesc;
      if (courseDetailDuration) courseDetailDuration.textContent = courseDuration;
      if (courseDetailLevel) courseDetailLevel.textContent = courseLevel;

      // Pre-select course in demo modal
      if (modalCourseSelect) {
        modalCourseSelect.value = courseName;
      }

      openModal(courseModalOverlay);
    });
  });

  // --------------------------------------------------------------------------
  // 9. Gallery Lightbox Modal Handler
  // --------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const caption = card.getAttribute('data-caption') || '';

      if (lightboxImg && fullSrc) {
        lightboxImg.src = fullSrc;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }

      openModal(lightboxOverlay);
    });
  });

  // --------------------------------------------------------------------------
  // 10. Form Submission Handling (Demo Only - Pure Frontend)
  // --------------------------------------------------------------------------
  const contactDemoForm = document.getElementById('contactDemoForm');
  const modalDemoForm = document.getElementById('modalDemoForm');
  const successPhoneTarget = document.getElementById('successPhoneTarget');

  // Contact Section Form Submit
  if (contactDemoForm) {
    contactDemoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const nameError = document.getElementById('nameErrorMsg');
      let isValid = true;

      // Validate Name
      if (nameInput) {
        if (!nameInput.value.trim()) {
          if (nameError) {
            nameError.textContent = 'Please enter your full name.';
            nameError.classList.add('show');
          }
          nameInput.focus();
          isValid = false;
        } else {
          if (nameError) nameError.classList.remove('show');
        }
      }

      // Validate Contact Phone
      const isPhoneOk = contactPhoneValidator ? contactPhoneValidator.validate() : false;
      if (!isPhoneOk) {
        if (contactPhoneInput) contactPhoneInput.focus();
        isValid = false;
      }

      if (!isValid) return;

      // Frontend Demo Simulation
      const submitBtn = document.getElementById('submitFormBtn');
      if (submitBtn) submitBtn.classList.add('loading');

      setTimeout(() => {
        if (submitBtn) submitBtn.classList.remove('loading');
        
        const phoneVal = contactPhoneInput ? contactPhoneInput.value : '';
        if (successPhoneTarget) {
          successPhoneTarget.textContent = `+91 ${phoneVal}`;
        }

        contactDemoForm.reset();
        if (contactPhoneCounter) contactPhoneCounter.textContent = '0/10';
        if (contactPhoneInput) contactPhoneInput.classList.remove('is-valid', 'is-invalid');
        if (contactPhoneStatus) {
          contactPhoneStatus.textContent = '';
          contactPhoneStatus.classList.remove('show');
        }

        openModal(successModalOverlay);
      }, 600);
    });
  }

  // Modal Demo Form Submit
  if (modalDemoForm) {
    modalDemoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const modalName = document.getElementById('modalName');
      const modalNameError = document.getElementById('modalNameError');
      let isValid = true;

      if (modalName) {
        if (!modalName.value.trim()) {
          if (modalNameError) {
            modalNameError.textContent = 'Please enter your full name.';
            modalNameError.classList.add('show');
          }
          modalName.focus();
          isValid = false;
        } else {
          if (modalNameError) modalNameError.classList.remove('show');
        }
      }

      const isPhoneOk = modalPhoneValidator ? modalPhoneValidator.validate() : false;
      if (!isPhoneOk) {
        if (modalPhoneInput) modalPhoneInput.focus();
        isValid = false;
      }

      if (!isValid) return;

      const modalSubmitBtn = document.getElementById('modalSubmitBtn');
      if (modalSubmitBtn) modalSubmitBtn.classList.add('loading');

      setTimeout(() => {
        if (modalSubmitBtn) modalSubmitBtn.classList.remove('loading');
        closeModal(demoModalOverlay);

        const phoneVal = modalPhoneInput ? modalPhoneInput.value : '';
        if (successPhoneTarget) {
          successPhoneTarget.textContent = `+91 ${phoneVal}`;
        }

        modalDemoForm.reset();
        if (modalPhoneCounter) modalPhoneCounter.textContent = '0/10';
        if (modalPhoneInput) modalPhoneInput.classList.remove('is-valid', 'is-invalid');
        if (modalPhoneStatus) {
          modalPhoneStatus.textContent = '';
          modalPhoneStatus.classList.remove('show');
        }

        openModal(successModalOverlay);
      }, 600);
    });
  }
});
