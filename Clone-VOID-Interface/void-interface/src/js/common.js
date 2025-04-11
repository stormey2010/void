// Toggle sidebar on mobile
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (sidebar) {
    sidebar.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');

    // Add animation flair to the main content when sidebar toggles
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (sidebar.classList.contains('open')) {
        mainContent.style.transform = 'scale(0.98)';
        mainContent.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        mainContent.style.filter = 'blur(2px)';
      } else {
        mainContent.style.transform = 'scale(1)';
        mainContent.style.filter = 'blur(0)';
      }
    }
  }
}

// Handle dropdown toggles with enhanced animations
function setupDropdowns() {
  const dropdownButtons = document.querySelectorAll('.dropdown-button');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = button.nextElementSibling;

      // Add animation class before toggling
      if (!dropdown.classList.contains('active')) {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px) scale(0.95)';
      }

      // Close all other dropdowns
      document.querySelectorAll('.dropdown-content').forEach(content => {
        if (content !== dropdown && content.classList.contains('active')) {
          content.style.opacity = '0';
          content.style.transform = 'translateY(-10px) scale(0.95)';

          setTimeout(() => {
            content.classList.remove('active');
          }, 200);
        }
      });

      // Toggle the clicked dropdown
      if (!dropdown.classList.contains('active')) {
        dropdown.classList.add('active');

        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0) scale(1)';
        }, 10);
      } else {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px) scale(0.95)';

        setTimeout(() => {
          dropdown.classList.remove('active');
        }, 200);
      }
    });
  });

  // Close dropdowns when clicking elsewhere with smooth animation
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content.active').forEach(content => {
      content.style.opacity = '0';
      content.style.transform = 'translateY(-10px) scale(0.95)';

      setTimeout(() => {
        content.classList.remove('active');
      }, 200);
    });
  });
}

// Update time display with fade animation
function updateTimeDisplay() {
  const timeDisplay = document.querySelector('.time-display');
  if (timeDisplay) {
    timeDisplay.style.opacity = '0.5';

    setTimeout(() => {
      const now = new Date();
      const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
      timeDisplay.textContent = now.toLocaleString('en-US', options);

      timeDisplay.style.opacity = '1';
    }, 300);
  }
}

// Toggle tabs with enhanced animations
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Skip if already active
      if (tab.classList.contains('active')) return;

      // Find active tab and content
      const activeTab = document.querySelector('.tab.active');
      const activeContent = document.querySelector('.tab-content:not([style*="display: none"])');
      const tabContentId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(tabContentId);

      if (activeTab && activeContent && targetContent) {
        // Remove active class from all tabs with smooth transition
        tabs.forEach(t => {
          if (t !== tab && t.classList.contains('active')) {
            t.classList.remove('active');
          }
        });

        // Fade out active content
        activeContent.style.opacity = '0';
        activeContent.style.transform = 'translateY(10px)';

        setTimeout(() => {
          // Hide previous content
          activeContent.style.display = 'none';

          // Add active class to clicked tab
          tab.classList.add('active');

          // Prepare and show new content
          targetContent.style.opacity = '0';
          targetContent.style.transform = 'translateY(10px)';
          targetContent.style.display = 'block';

          setTimeout(() => {
            // Fade in new content
            targetContent.style.opacity = '1';
            targetContent.style.transform = 'translateY(0)';
            targetContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          }, 10);
        }, 300);
      } else {
        // Fallback for simpler implementation
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
          content.style.display = 'none';
        });

        if (targetContent) {
          targetContent.style.display = 'block';
          targetContent.style.opacity = '1';
          targetContent.style.transform = 'translateY(0)';
        }
      }
    });
  });

  // Activate first tab by default if none active
  const activeTab = document.querySelector('.tab.active');
  if (!activeTab) {
    const firstTab = document.querySelector('.tab');
    if (firstTab) {
      firstTab.click();
    }
  } else {
    // Ensure the active tab's content is displayed
    const activeTabContentId = activeTab.getAttribute('data-tab');
    const activeContent = document.getElementById(activeTabContentId);

    if (activeContent) {
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      activeContent.style.display = 'block';
      activeContent.style.opacity = '1';
      activeContent.style.transform = 'translateY(0)';
    }
  }
}

// Initialize gauge charts with animated loading
function initGauges() {
  const gauges = document.querySelectorAll('.gauge');

  gauges.forEach((gauge, index) => {
    const value = parseInt(gauge.getAttribute('data-value')) || 0;
    const fill = gauge.querySelector('.gauge-fill');
    const text = gauge.querySelector('.gauge-text');

    // Reset initial position
    if (fill) {
      fill.style.transform = 'rotate(0deg)';
    }

    if (text) {
      text.textContent = '0%';
    }

    // Animate with delay based on index
    setTimeout(() => {
      let currentValue = 0;
      const duration = 1500; // Animation duration in ms
      const interval = 16; // Animation interval in ms (approx 60fps)
      const steps = duration / interval;
      const increment = value / steps;

      // Animation function
      const animate = () => {
        currentValue += increment;

        if (currentValue > value) {
          currentValue = value;
        }

        if (fill) {
          // Rotate to represent the value (0-100)
          const rotation = (currentValue / 100) * 180;
          fill.style.transform = `rotate(${rotation}deg)`;
        }

        if (text) {
          text.textContent = `${Math.round(currentValue)}%`;
        }

        if (currentValue < value) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, index * 200); // Stagger start of animations
  });
}

// Initialize tooltips with enhanced hover effects
function initTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  tooltips.forEach(tooltip => {
    tooltip.classList.add('tooltip');

    // Create tooltip element
    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltip-text';
    tooltipText.textContent = tooltip.getAttribute('data-tooltip');
    tooltip.appendChild(tooltipText);

    // Add mouseenter event for animated appearance
    tooltip.addEventListener('mouseenter', () => {
      tooltipText.style.opacity = '0';
      tooltipText.style.transform = 'translateY(5px)';
      tooltipText.style.display = 'block';

      setTimeout(() => {
        tooltipText.style.opacity = '1';
        tooltipText.style.transform = 'translateY(0)';
        tooltipText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      }, 10);
    });

    // Add mouseleave event for animated disappearance
    tooltip.addEventListener('mouseleave', () => {
      tooltipText.style.opacity = '0';
      tooltipText.style.transform = 'translateY(5px)';

      setTimeout(() => {
        tooltipText.style.display = 'none';
      }, 300);
    });
  });
}

// Set up modals with enhanced animations
function setupModals() {
  const modalButtons = document.querySelectorAll('[data-modal]');

  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);

      if (modal) {
        // Prepare for animation
        const modalContent = modal.querySelector('.modal');

        modal.style.opacity = '0';
        modal.style.display = 'flex';

        if (modalContent) {
          modalContent.style.transform = 'scale(0.8)';
          modalContent.style.opacity = '0';
        }

        // Animate in
        setTimeout(() => {
          modal.style.opacity = '1';
          modal.style.transition = 'opacity 0.3s ease';

          if (modalContent) {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease';
          }
        }, 10);
      }
    });
  });

  // Close button functionality with animation
  const closeButtons = document.querySelectorAll('.modal-close');

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-backdrop');
      const modalContent = modal.querySelector('.modal');

      if (modal) {
        modal.style.opacity = '0';

        if (modalContent) {
          modalContent.style.transform = 'scale(0.8)';
          modalContent.style.opacity = '0';
        }

        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
  });

  // Close on backdrop click with animation
  const modals = document.querySelectorAll('.modal-backdrop');

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        const modalContent = modal.querySelector('.modal');

        modal.style.opacity = '0';

        if (modalContent) {
          modalContent.style.transform = 'scale(0.8)';
          modalContent.style.opacity = '0';
        }

        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
  });
}

// Add interactive hover effects to dashboard cards
function initCardEffects() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle transform on hover
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      card.style.borderColor = 'rgba(110, 43, 248, 0.3)';
      card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

      // Animate child elements
      const cardTitle = card.querySelector('.card-title');
      if (cardTitle) {
        cardTitle.style.color = 'var(--primary)';
        cardTitle.style.transition = 'color 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      // Reset transform on mouse leave
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
      card.style.borderColor = 'rgba(255, 255, 255, 0.05)';

      // Reset child elements
      const cardTitle = card.querySelector('.card-title');
      if (cardTitle) {
        cardTitle.style.color = 'var(--text-primary)';
      }
    });
  });
}

// Add parallax effect to login background
function initLoginParallax() {
  const loginContainer = document.querySelector('.login-container');

  if (loginContainer) {
    loginContainer.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      loginContainer.style.backgroundPosition = `${x * 20}px ${y * 20}px`;

      // Move login card slightly for depth effect
      const loginCard = document.querySelector('.login-card');
      if (loginCard) {
        loginCard.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
        loginCard.style.transition = 'transform 0.1s ease-out';
      }
    });
  }
}

// Add animation to login form submission
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Disable form elements
      const formElements = loginForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }

      // Get submit button
      const submitButton = loginForm.querySelector('button[type="submit"]');

      // Add loading state
      if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="loading"></div> Logging in...';
        submitButton.classList.add('btn-glow');
      }

      // Simulate login with animation
      setTimeout(() => {
        // Fade out login card
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
          loginCard.style.opacity = '0';
          loginCard.style.transform = 'scale(0.9) translateY(-20px)';
          loginCard.style.transition = 'all 0.5s ease';
        }

        // Redirect after animation
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      }, 1500);
    });
  }
}

// Create text typing animation effect
function createTypingAnimations() {
  const typingElements = document.querySelectorAll('.typing-text');

  typingElements.forEach(element => {
    const text = element.textContent;
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const delay = parseInt(element.getAttribute('data-delay')) || 0;

    // Clear the original text
    element.textContent = '';

    // Create a span with the typing animation class
    const typingSpan = document.createElement('span');
    typingSpan.className = 'typing-animation';
    typingSpan.style.animation = `typing ${duration}ms steps(${text.length}, end), blink 0.75s step-end infinite`;
    typingSpan.style.animationDelay = `${delay}ms`;
    typingSpan.style.width = '0';
    typingSpan.textContent = text;

    element.appendChild(typingSpan);

    // Set final width after animation
    setTimeout(() => {
      typingSpan.style.width = '100%';
    }, delay + duration);
  });
}

// Add animation to stat cards
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');

  statValues.forEach((element, index) => {
    const finalValue = element.textContent;
    const isPercentage = finalValue.includes('%');
    const isDecimal = finalValue.includes('.');

    // Skip if not a number
    if (isNaN(parseFloat(finalValue))) return;

    // Extract numeric value and suffix
    let numericValue = parseFloat(finalValue);
    let suffix = '';

    if (isPercentage) {
      suffix = '%';
    } else if (isDecimal) {
      suffix = 's';
    }

    // Set initial value to 0
    element.textContent = isDecimal ? '0.00' + suffix : '0' + suffix;

    // Animate with delay based on index
    setTimeout(() => {
      let startValue = 0;
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const stepValue = numericValue / totalSteps;

      const interval = setInterval(() => {
        startValue += stepValue;

        if (startValue > numericValue) {
          startValue = numericValue;
          clearInterval(interval);
        }

        // Format number based on type
        let formattedValue;
        if (isDecimal) {
          formattedValue = startValue.toFixed(2) + suffix;
        } else if (isPercentage) {
          formattedValue = Math.round(startValue) + suffix;
        } else {
          formattedValue = Math.round(startValue) + suffix;
        }

        element.textContent = formattedValue;
      }, stepTime);
    }, index * 200);
  });
}

// Apply particle animation to the background (for pages that need it)
function initParticleBackground() {
  const particleContainer = document.querySelector('.particle-bg');

  if (particleContainer) {
    // Create particle elements
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random position, size, and animation duration
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animDuration = Math.random() * 20 + 10;
      const animDelay = Math.random() * 10;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.animation = `floatParticle ${animDuration}s linear infinite`;
      particle.style.animationDelay = `${animDelay}s`;

      particleContainer.appendChild(particle);
    }
  }
}

// Initialize tool search functionality
function initToolSearch() {
  const searchInput = document.getElementById('toolSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#toolsTableBody tr');

    rows.forEach(row => {
      const name = row.getAttribute('data-tool-name').toLowerCase();
      const category = row.getAttribute('data-tool-category').toLowerCase();
      const description = row.getAttribute('data-tool-description').toLowerCase();

      const matches = name.includes(searchTerm) || 
                     category.includes(searchTerm) || 
                     description.includes(searchTerm);

      row.style.display = matches ? '' : 'none';
    });
  });
}

// Initialize page with all enhancements
function initPage() {
  // Setup hamburger menu
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleSidebar);
  }

  // Update time every minute
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 60000);

  // Setup interactive elements
  setupDropdowns();
  setupTabs();
  initGauges();
  initTooltips();
  setupModals();
  initCardEffects();
  initLoginParallax();
  setupLoginForm();
  createTypingAnimations();
  animateStats();
  initParticleBackground();
  
  // Add tool search initialization
  initToolSearch();

  // Add active class to current page link in sidebar with animation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach((link, index) => {
    // Add staggered animation to all links
    link.style.opacity = '0';
    link.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      link.style.opacity = '1';
      link.style.transform = 'translateX(0)';
      link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 100 + index * 50);

    // Mark active link
    if (link.getAttribute('href') === currentPage) {
      setTimeout(() => {
        link.classList.add('active');
      }, 500);
    }
  });

  // Add fade-in animation to main content
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.style.opacity = '0';

    setTimeout(() => {
      pageContent.style.opacity = '1';
      pageContent.style.transition = 'opacity 0.5s ease';
    }, 300);
  }

  // Initialize page-specific animations based on URL
  if (currentPage === 'login.html' || !currentPage) {
    initLoginAnimations();
  } else if (currentPage === 'index.html') {
    initDashboardAnimations();
  }
}

// Login page specific animations
function initLoginAnimations() {
  const loginLogo = document.querySelector('.login-logo');
  const loginTitle = document.querySelector('.login-title');
  const loginSubtitle = document.querySelectorAll('.login-subtitle');
  const loginForm = document.getElementById('login-form');
  const loginFooter = document.querySelector('.login-footer');

  // Reset initial state
  if (loginLogo) loginLogo.style.opacity = '0';
  if (loginTitle) loginTitle.style.opacity = '0';
  loginSubtitle.forEach(el => { if (el) el.style.opacity = '0'; });
  if (loginForm) loginForm.style.opacity = '0';
  if (loginFooter) loginFooter.style.opacity = '0';

  // Animate in sequence
  setTimeout(() => {
    if (loginLogo) {
      loginLogo.style.opacity = '1';
      loginLogo.style.transition = 'opacity 0.5s ease';
    }
  }, 300);

  setTimeout(() => {
    if (loginTitle) {
      loginTitle.style.opacity = '1';
      loginTitle.style.transition = 'opacity 0.5s ease';
    }
  }, 600);

  loginSubtitle.forEach((el, index) => {
    setTimeout(() => {
      if (el) {
        el.style.opacity = '1';
        el.style.transition = 'opacity 0.5s ease';
      }
    }, 900 + index * 200);
  });

  setTimeout(() => {
    if (loginForm) {
      loginForm.style.opacity = '1';
      loginForm.style.transition = 'opacity 0.5s ease';
    }
  }, 1300);

  setTimeout(() => {
    if (loginFooter) {
      loginFooter.style.opacity = '1';
      loginFooter.style.transition = 'opacity 0.5s ease';
    }
  }, 1600);
}

// Dashboard specific animations
function initDashboardAnimations() {
  const statCards = document.querySelectorAll('.stat-card');
  const quickActions = document.querySelector('.card');

  // Animate stat cards sequentially
  statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 300 + index * 150);
  });

  // Animate quick actions card
  if (quickActions) {
    quickActions.style.opacity = '0';
    quickActions.style.transform = 'translateY(20px)';

    setTimeout(() => {
      quickActions.style.opacity = '1';
      quickActions.style.transform = 'translateY(0)';
      quickActions.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 800);
  }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
