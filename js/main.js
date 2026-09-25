/**
 * VerdantBio Agriscience - Main JavaScript
 * High performance Vanilla JavaScript for modern interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==================================================
     1. STICKY HEADER & SCROLLSPY
  ================================================== */
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const handleScroll = () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy navigation highlight
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ==================================================
     2. MOBILE NAVIGATION
  ================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav .btn');

  const openMobileNav = () => {
    menuToggle.classList.add('active');
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ==================================================
     3. SMOOTH SCROLLING FOR INTERNAL LINKS
  ================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==================================================
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==================================================
     5. ANIMATED NUMBER COUNTERS
  ================================================== */
  const statsSection = document.querySelector('.stats-section');
  const counterElements = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease out quadratic progress for smooth finish
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutProgress * target);

        counter.textContent = currentCount.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ==================================================
     6. PRODUCT CATEGORY FILTERING
  ================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==================================================
     7. TESTIMONIAL SLIDER / CAROUSEL
  ================================================== */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialDots');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (track && testimonialCards.length > 0) {
    let currentIndex = 0;
    let cardWidth = 0;
    let gap = 30;
    let visibleCards = 3;

    const updateSliderDimensions = () => {
      const width = window.innerWidth;
      if (width < 768) {
        visibleCards = 1;
      } else if (width < 1200) {
        visibleCards = 2;
      } else {
        visibleCards = 3;
      }

      const maxIndex = Math.max(0, testimonialCards.length - visibleCards);
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      createDots();
      moveToSlide(currentIndex);
    };

    const maxIndex = () => Math.max(0, testimonialCards.length - visibleCards);

    const createDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalPages = maxIndex() + 1;

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const moveToSlide = (index) => {
      const firstCard = testimonialCards[0];
      cardWidth = firstCard.offsetWidth;
      const totalShift = (cardWidth + gap) * index;
      track.style.transform = `translateX(-${totalShift}px)`;
      currentIndex = index;
      updateDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          moveToSlide(currentIndex - 1);
        } else {
          moveToSlide(maxIndex()); // Loop to end
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex()) {
          moveToSlide(currentIndex + 1);
        } else {
          moveToSlide(0); // Loop to beginning
        }
      });
    }

    // Touch Swipe Support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeDistance = touchStartX - touchEndX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance > 0 && currentIndex < maxIndex()) {
          moveToSlide(currentIndex + 1);
        } else if (swipeDistance < 0 && currentIndex > 0) {
          moveToSlide(currentIndex - 1);
        }
      }
    };

    window.addEventListener('resize', updateSliderDimensions);
    updateSliderDimensions();
  }

  /* ==================================================
     8. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  ================================================== */
  const contactForm = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (contactForm) {
    const validateField = (field) => {
      const value = field.value.trim();
      const errorEl = document.getElementById(`${field.id}Error`);
      let isValid = true;

      if (field.hasAttribute('required') && !value) {
        isValid = false;
      } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
      } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s+\-()]{7,20}$/;
        isValid = phoneRegex.test(value);
      }

      if (!isValid) {
        field.classList.add('invalid');
        if (errorEl) errorEl.classList.add('visible');
      } else {
        field.classList.remove('invalid');
        if (errorEl) errorEl.classList.remove('visible');
      }

      return isValid;
    };

    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (!formIsValid) {
        const firstInvalid = contactForm.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" style="width:18px;height:18px;animation:spin 1s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="60"></circle>
        </svg>
        Sending Message...
      `;

      // Simulate asynchronous form submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();

        if (successBanner) {
          successBanner.classList.add('visible');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          setTimeout(() => {
            successBanner.classList.remove('visible');
          }, 8000);
        }
      }, 1200);
    });
  }

  /* ==================================================
     9. BACK TO TOP BUTTON
  ================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
