 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
          const navbar = document.querySelector('.navbar-collapse');
          if (navbar.classList.contains('show')) {
            new bootstrap.Collapse(navbar).hide();
          }
        }
      });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('⚠️ Please fill out all fields before sending.');
        return;
      }

      const emailPattern = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');
      if (!emailPattern.test(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
      }

      const mailSubject = encodeURIComponent(subject);
      const mailBody = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:youremail@example.com?subject=' + mailSubject + '&body=' + mailBody;

      alert('✅ Thank you for contacting me, ' + name + '! Your email app will open now.');
      form.reset();
    });

    document.getElementById('year').textContent = new Date().getFullYear();