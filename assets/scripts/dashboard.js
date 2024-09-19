/** @format */

// Supabase configuration
const supabaseUrl = "https://vlrfphqpurzzdwunfest.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmZwaHFwdXJ6emR3dW5mZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzI2MDIsImV4cCI6MjA0MTgwODYwMn0.MbRsqjWNF334kOLcc-BW8u36LKgwGHZ305pnYo2JRcg";

// DOM element selections
const reports = document.querySelector(".reports-wrapper");
const doctors = document.querySelector(".doctors");
const doctorH = document.querySelector(".docctor-heading");

// Import and initialize Supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";
const supabase = createClient(supabaseUrl, supabaseKey);

// Get user information from local storage
const logUser = JSON.parse(localStorage.getItem("activeId"));
import { showLoading } from "../scripts/custom_alert.js";

// Function to fetch and display user information
async function getUserInfo() {
    if (logUser) {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", logUser)
                .single();
            
            if (error) {
                console.error("Error fetching user details:", error);
                return;
            }
            
            if (!data) {
                console.error("No user data found.");
                return;
            }

            const user = data;
            heroSection(user);
            getDoctorData(user);

            // Display logic based on user type
            if (user.type === "doctor") {
                doctors.style.display = "none";
                doctorH.style.display = "none";
            } else if (user.type === "patient") {
                reports.style.display = "none";
            }
        } catch (error) {
            console.error("Error in getUserInfo:", error);
        }
    } else {
        console.error("No active user found in local storage.");
    }
}

// Function to populate hero section (only for logged-in users)
function heroSection(user) {
    if (user) {
        const heroWrapper = document.querySelector(".hero-wrapper");
        heroWrapper.innerHTML = `
        <div class="hero-text">
            <p class="greet">Welcome Back,</p>
            <h3 class="userName"><span>${user.type === "doctor" ? "Dr" : "Dear"}.</span> ${user.name}</h3>
            <p class="appointMent">
                ${user.type === "doctor"
                    ? `Connect with <span> patients</span> who need your care`
                    : `Find the <span>Expert Care</span> you deserve`}
            </p>
        </div>
        `;
    }
}

// Fetch and display general content (like doctor listings)
async function getDoctors() {
    showLoading("loading");
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("type", "doctor");

        if (error) {
            console.error("Error fetching doctors:", error);
        } else {
            setTimeout(() => showLoading("hideLoading"), 500);
            addDoctorstoDashboard(data);
        }
    } catch (error) {
        console.error("Error in getDoctors:", error);
    }
}

// Function to add doctors to dashboard (always display)
function addDoctorstoDashboard(users) {
    if (users && users.length > 0) {
        users.forEach((doctor) => {
            doctors.innerHTML += `
            <a href="/blog.html?id=${doctor.id}" target="_blank" rel="noopener noreferrer">
                <div class="doctor-items">
                    <div class="doctor-thumnail">
                        <img src="${doctor.userAvatar || "https://shorturl.at/8TClo"}" alt="User Avatar">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div>
                        <div class="doctor-info-name">
                            <div class="doctor-info">
                                <span class="doc-name"> Dr. ${doctor.name} </span>
                                <span class="rating1">
                                    <li>
                                        <i class="fas fa-star"></i>
                                        <span class="count"> ${doctor.rating || 0}.5</span>
                                    </li>
                                </span>
                            </div>
                            <div class="doc-hospital">
                                <span>${doctor.hospitalName || "No Name"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>`;
        });
    } else {
        doctors.innerHTML = `No Doctors found`;
    }
}

// Fetch and display doctor's data (only for logged-in doctors)
async function getDoctorData(user) {
    if (user && user.type === "doctor") {
        showLoading();
        try {
            const { data, error } = await supabase
                .from("withdrawals")
                .select("*")
                .eq("doctorid", logUser);

            if (error) {
                console.error("Error fetching doctor data:", error);
            } else {
                const totalWithdrawal = data ? data.length : 0;

                let sum = 0;
                if (data) {
                    data.forEach((amount) => {
                        sum += amount.amount;
                    });
                }
                renderDoctorReport(sum, totalWithdrawal, user);
                setTimeout(() => showLoading("hideLoading"), 500);
            }
        } catch (error) {
            console.error("Error in getDoctorData:", error);
        }
    }
}

// Render doctor's report (only for logged-in doctors)
function renderDoctorReport(sum, totalWithdrawal, user) {
    reports.innerHTML = `
    <div class="report__item item">
        <div class="report__icons">
            <i class="fas fa-users"></i>
        </div>
        <div class="report__text">
            <span class="count"> ${user.patientsTreated || 0}</span>
            <span class="count-text">Total Patients</span>
        </div>
    </div>
    <div class="report__item item">
        <div class="report__icons">
            <i class="fas fa-calculator"></i>
        </div>
        <div class="report__text">
            <span class="count"> ${totalWithdrawal || 0}</span>
            <span class="count-text">Total Withdrawal</span>
        </div>
    </div>
    <div class="report__item item">
        <div class="report__icons">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="report__text">
            <span class="count"> $${sum || 0}</span>
            <span class="count-text">Approved Withdrawal</span>
        </div>
    </div>
    <div class="report__item item">
        <div class="report__icons">
            <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="report__text">
            <span class="count"> $${user.totalEarnings || 0}</span>
            <span class="count-text">Total Earnings</span>
        </div>
    </div>`;
}

// Function to handle active menu item
function setActiveMenuItem() {
    const menuItems = document.querySelectorAll('.sidebar-left-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Initialize the menu
setActiveMenuItem();

// Initial function calls
getUserInfo();
getDoctors();


  // Sample data to search from (this should be replaced by fetching data from Supabase)
  const data = [
    { name: 'City Hospital', type: 'hospital', details: 'Located in downtown.' },
    { name: 'Dr. John Doe', type: 'doctor', details: 'Specialist in Cardiology.' },
    { name: 'Green Valley Clinic', type: 'hospital', details: 'Open 24/7.' },
    { name: 'Dr. Sarah Smith', type: 'doctor', details: 'Pediatrician with 10 years experience.' },
  ];

  // Search functionality
  document.getElementById('searchIcon').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = data.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.details.toLowerCase().includes(query)
    );
    console.log('Search Results:', results); // Display search results (implement displaying on UI as needed)
  });

  // Notification functionality
  const notificationIcon = document.getElementById('notificationIcon');
  const notificationCount = document.getElementById('notificationCount');

  // Fetch notifications from Supabase (sample setup)
  function fetchNotifications() {
    // Fetch notifications from your Supabase table (placeholder function)
    const notifications = [
      { message: 'Appointment confirmed.' },
      { message: 'New doctor available.' }
    ]; // Replace with actual fetching logic

    // Update notification count
    notificationCount.textContent = notifications.length;
    notificationIcon.addEventListener('click', () => {
      console.log('Notifications:', notifications); // Show notifications on click (implement UI logic)
    });
  }
  fetchNotifications();

  // Profile image upload
  const profileImage = document.getElementById('profileImage');
  const uploadProfileImage = document.getElementById('uploadProfileImage');

  profileImage.addEventListener('click', () => {
    uploadProfileImage.click();
  });

  uploadProfileImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImage.src = e.target.result;
        // Upload to Supabase storage here (placeholder logic)
        console.log('Profile image updated.');
      };
      reader.readAsDataURL(file);
    }
  });





  // In your script file

// Fetch notifications (mocked data)
async function loadNotifications() {
    // Replace with actual Supabase query to fetch notifications
    return [
      { id: 1, message: 'New message from Dr. Smith' },
      { id: 2, message: 'Appointment scheduled for tomorrow' },
    ];
  }
  
  // Display notifications
  async function showNotifications() {
    const notifications = await loadNotifications();
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.innerHTML = notifications.map(n => `<div class="notification">${n.message}</div>`).join('');
    dropdown.style.display = 'block';

    dropdown.addEventListener('click', (event) => {
      if (event.target.classList.contains('notification')) {
        // Handle notification click (e.g., mark as read, navigate to related page)
        console.log('Notification clicked:', event.target.innerText);
      }
    })
  }
  
  // Toggle notifications display on icon click
  document.getElementById('notificationIcon').addEventListener('click', () => {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  