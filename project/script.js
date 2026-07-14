// --- JAVASCRIPT: script.js ---

// 1. FORM HANDLING 
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email && password) {
    // In a real application, you would send this to a server for authentication
    alert(`Login attempt for ${email} successful!`);
    // window.location.href = 'dashboard.html'; // Example redirect
  } else {
    alert("Please enter both email and password.");
  }
}

function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!firstName || !email || !password || !confirmPassword) {
    alert("Please fill in all required fields.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
  // In a real application, you would collect all data and send it to a server.
  alert(`Registration successful for ${firstName} (${email})!`);
  e.target.reset();
}

// Event Registration function
function handleEventRegister(e) {
  e.preventDefault();

  // Get the event ID and name from the form/page
  const eventId = document.getElementById('event_id').value;
  const eventTitle = document.getElementById('event-title').textContent;
  
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;

  if (name && email) {
    alert(`Successfully registered ${name} for the event: ${eventTitle}!`);
    e.target.reset(); // Clear the form
    // In a real application, you would send this data to a server
  } else {
    alert("Please enter your name and email to register.");
  }
}

// --- 2. ACHIEVEMENTS FILTERING LOGIC (UPDATED for reliable category mapping) ---
function setupAchievementFiltering() {
  const filterButtons = document.querySelectorAll('.filter-bar .filter-btn');
  const achievementCards = document.querySelectorAll('.achievement-grid .achievement-card');

  // Debug: Log all cards and their categories
  console.log('Found achievement cards:', achievementCards.length);
  achievementCards.forEach(card => {
    console.log('Card category:', card.getAttribute('data-category'), 'Card text:', card.textContent.trim());
  });

  // Debug: Log all filter buttons
  console.log('Found filter buttons:', filterButtons.length);
  filterButtons.forEach(button => {
    console.log('Filter button text:', button.textContent.trim());
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      // Add active class to the clicked button
      button.classList.add('active-filter');

      // Get exact button text and data-category if it exists
      const buttonText = button.textContent.trim();
      const buttonCategory = button.getAttribute('data-category'); // In case buttons have data-category attributes
      let filterCategory;
      
      console.log('Button clicked:', buttonText, 'data-category:', buttonCategory);
      
      // First try data-category if it exists
      if (buttonCategory) {
        filterCategory = buttonCategory;
      }
      // Otherwise determine from text
      else if (buttonText.toLowerCase().includes('all')) {
        filterCategory = 'all';
      } else if (buttonText.toLowerCase().includes('technical')) {
        filterCategory = 'technical';
      } else if (buttonText.toLowerCase().includes('cultural')) {
        filterCategory = 'cultural';
      } else if (buttonText.toLowerCase().includes('leadership')) {
        filterCategory = 'leadership';
      } else {
        console.warn('Unknown category button:', buttonText);
        return; // Unknown button
      }

      console.log('Filtering by category:', filterCategory);
      // Filter the cards
      let visibleCount = 0;
      achievementCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        console.log('Checking card:', cardCategory, 'against filter:', filterCategory);
        
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      console.log(`Filtered results: ${visibleCount} cards visible out of ${achievementCards.length}`);
    });
  });
}

// --- 3. EVENTS FILTERING LOGIC (NEW FUNCTION) ---
// This assumes filter buttons and event cards will be added to events.html 
function setupEventFiltering() {
  const filterButtons = document.querySelectorAll('.events-filter-bar .filter-btn');
  const eventCards = document.querySelectorAll('.event-grid .event-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      // Add active class to the clicked button
      button.classList.add('active-filter');

      // Determine the category to filter by
      const buttonText = button.textContent.trim();
      let filterCategory;
      
      if (buttonText === 'All Events') {
        filterCategory = 'all';
      } else if (buttonText.includes('Technical')) {
        filterCategory = 'technical';
      } else if (buttonText.includes('Cultural')) {
        filterCategory = 'cultural'; 
      } else {
        return; // Unknown button
      }

      // Filter the cards
      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. HOME PAGE SLIDER (Seamless Loop)
// (Using the old implementation which works, but not the seamless loop version we made before)
function setupSlider(sliderClass, pause = 4000, transitionDuration = 1000, loop = true) {
  const slider = document.querySelector(sliderClass);
  if (!slider) return;

  const slides = slider.querySelectorAll('img');
  const totalSlides = slides.length;
  if (totalSlides <= 1) return; 

  let currentSlide = 0;
  slider.style.transform = `translateX(0%)`;

  function step() {
    setTimeout(() => {
      if (!loop && currentSlide === totalSlides - 1) return;

      currentSlide = (currentSlide + 1) % totalSlides; // Simpler looping logic

      slider.style.transition = `transform ${transitionDuration}ms ease-in-out`;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;

      setTimeout(() => {
        if (!loop && currentSlide === totalSlides - 1) return;
        step();
      }, transitionDuration);
    }, pause);
  }

  // Start the loop
  step();
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if on the Achievements page
    if (document.querySelector('.achievement-grid')) {
        setupAchievementFiltering();
    }

    // Check if on the Events page
    if (document.querySelector('.events-section')) {
        setupEventFiltering();
    }
    
    // Check if on the Home page to set up the sliders
    if (document.querySelector('.full-slider-bg')) {
        // Hero slider: 4000ms (4 seconds) interval
        setupSlider('.hero .slider', 4000); 
    }
});