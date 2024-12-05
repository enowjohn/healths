/** @format */

const supabaseUrl = "https://vlrfphqpurzzdwunfest.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmZwaHFwdXJ6emR3dW5mZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzI2MDIsImV4cCI6MjA0MTgwODYwMn0.MbRsqjWNF334kOLcc-BW8u36LKgwGHZ305pnYo2JRcg";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";
const supabase = createClient(supabaseUrl, supabaseKey);

const logUser = JSON.parse(localStorage.getItem("activeId"));
const sideBar = document.querySelector(".siderbar-left");

// Redirect to login if user is not logged in
async function validateUsers() {
  if (!logUser) {
    window.location.href = "/login.html";
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", logUser);

  if (!data || data.length === 0) {
    window.location.href = "/login.html";
    return;
  }

  generateSideBar(data[0].id, data[0].type);
}

// Generate sidebar based on user type
function generateSideBar(id, type) {
  const url = type === "doctor" 
    ? `/pages/doctor_dashboard.html?id=${id}`
    : `/pages/patient_dashboard.html?id=${id}`;

  sideBar.innerHTML = `
    <div class="sidebar-left__nav-top">
      <ul class="sidebar-left_nav-items">
        <a href="${url}">
          <li class="sidebar-left-item active">
            <span><i class="fas fa-tachometer-alt"></i></span> Dashboard
          </li>
        </a>
        ${showPLansToUsers(type)}
        ${showPatientAndDoctors(type)}
        ${showChatRoomToUser(type)}
        <li class="sidebar-left-item logout">
          <span><i class="fas fa-sign-out-alt"></i></span> Logout
        </li>
      </ul>
    </div>
  `;

  const logout = document.querySelector(".logout");
  logout.addEventListener("click", logUserout);
}

function logUserout() {
  localStorage.removeItem("activeId");
  window.location.href = "/login.html";
}

validateUsers();

// Render different options for plans, chatrooms, etc.
function showPLansToUsers(type) {
  return type === "patient"
    ? `<a href="/manageplan.html"><li class="sidebar-left-item"><span><i class="fas fa-calendar-check"></i></span> Plans</li></a>`
    : `<a href="/plans.html"><li class="sidebar-left-item"><span><i class="fas fa-calendar-check"></i></span> Plans</li></a>`;
}

function showPatientAndDoctors(type) {
  return type === "patient"
    ? `<a href="/patientchatroom.html"><li class="sidebar-left-item"><span><i class="fas fa-user-md"></i></span> My Doctors</li></a>`
    : `<a href="/mypatients.html"><li class="sidebar-left-item"><span><i class="fas fa-users"></i></span> Patients</li></a>`;
}

function showChatRoomToUser(type) {
  return `<a href="/pages/${type === "doctor" ? "doctorchatroom" : "patientchatroom"}.html"><li class="sidebar-left-item"><span><i class="fas fa-comments"></i></span> Chat</li></a>`;
}
