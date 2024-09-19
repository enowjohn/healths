/** @format */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

const supabaseUrl = 'https://vlrfphqpurzzdwunfest.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmZwaHFwdXJ6emR3dW5mZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzI2MDIsImV4cCI6MjA0MTgwODYwMn0.MbRsqjWNF334kOLcc-BW8u36LKgwGHZ305pnYo2JRcg';  // Replace with your real key
const supabase = createClient(supabaseUrl, supabaseKey);

const logUser = JSON.parse(localStorage.getItem('activeId'));

// If no user is logged in, redirect to login page
if (!logUser) {
  window.location.href = '/login.html';
}

// Fetch user profile data
async function loadUserProfile() {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', logUser)
    .single();

  if (error || !user) {
    console.error('Error fetching user data:', error);
    return;
  }

  // Populate the form fields with user data
  document.getElementById('fullName').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('phone').value = user.phone;
  document.getElementById('gender').value = user.gender;

  // Load user profile image
  if (user.profile_image) {
    document.getElementById('profileImage').src = user.profile_image;
  }
}

// Handle profile image upload
document.getElementById('uploadImage').addEventListener('change', async function (e) {
  const file = e.target.files[0];
  if (!file) return;

  // Upload image to Supabase storage
  const fileName = `${logUser}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('profile_images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return;
  }

  // Get the public URL for the image
  const { publicURL, error: urlError } = supabase.storage
    .from('profile_images')
    .getPublicUrl(fileName);

  if (urlError) {
    console.error('Error fetching public URL:', urlError);
    return;
  }

  // Set the new profile image
  document.getElementById('profileImage').src = publicURL;

  // Update the user's profile image in the database
  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_image: publicURL })
    .eq('id', logUser);

  if (updateError) {
    console.error('Error updating profile image:', updateError);
  }
});

// Save changes to profile
document.querySelector('.btn-save').addEventListener('click', async () => {
  const updatedData = {
    name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    gender: document.getElementById('gender').value,
  };

  const { error } = await supabase
    .from('users')
    .update(updatedData)
    .eq('id', logUser);

  if (error) {
    console.error('Error updating profile:', error);
  } else {
    alert('Profile updated successfully!');
  }
});

// Load user profile on page load
window.onload = loadUserProfile;



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
}

// Toggle notifications display on icon click
document.getElementById('notificationIcon').addEventListener('click', () => {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});
