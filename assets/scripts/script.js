document.addEventListener("DOMContentLoaded", function() {
    // Handle form submission
    document.getElementById("subscribe-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const email = event.target.email.value;
  
      // Here you can add your logic to handle the email submission
      // For example, saving the email to Supabase or sending a subscription request
  
      alert(`Thank you for subscribing with ${email}!`);
      event.target.reset(); // Reset the form after submission
    });
  
    // Handle navigation links
    document.querySelectorAll(".footer-link, .social-link, .links").forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
  
        const href = this.getAttribute("href");
  
        if (href) {
          // Assuming you have the pages linked correctly
          window.location.href = href; // Redirect to the target page
        }
      });
    });
  });
  