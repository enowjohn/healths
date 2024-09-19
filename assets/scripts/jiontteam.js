/** @format */

const supabaseUrl = "https://vlrfphqpurzzdwunfest.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmZwaHFwdXJ6emR3dW5mZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzI2MDIsImV4cCI6MjA0MTgwODYwMn0.MbRsqjWNF334kOLcc-BW8u36LKgwGHZ305pnYo2JRcg";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";
const supabase = createClient(supabaseUrl, supabaseKey);
import { showSucessAlert } from "../scripts/custom_alert.js";
import { failedsAlert } from "../scripts/custom_alert.js";

const form = document.querySelector(".form");

// Store users' info in local storage for easy access
function storeAccounts(users) {
  let saveUsers = JSON.parse(localStorage.getItem("id")) || [];
  if (!saveUsers.includes(users)) {
    saveUsers.push(users);
    localStorage.setItem("id", JSON.stringify(saveUsers));
  }
}

// Submit the form
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const fName = form.elements["fName"].value;
  const email = form.elements["email"].value;
  const phoneNumber = form.elements["phone"].value;
  const phone = Number(phoneNumber);
  const userRole = form.elements["userRole"].value;
  const gender = form.elements["gender"].value;
  const password = form.elements["password"].value;
  const cfpassword = form.elements["cfpassword"].value;
  const newDate = new Date().toISOString().split("T")[0];

  if (cfpassword !== password) {
    failedsAlert("Passwords do not match!");
    return;
  }
  

  const newUser = {
    email: email,
    type: userRole,
    name: fName,
    phone: phone,
    password: password,
    gender: gender,
    accountCreated: newDate,
  };

  // Sign up the user
  const { data: newResponse, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    failedsAlert(`${signUpError.message}`);
    return;
  }

  // Insert user into the database
  if (newResponse && newResponse.user) {
    const userId = newResponse.user.id;

    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ ...newUser, userID: userId }])
        .select();

      if (error) {
        failedsAlert("Error inserting user data.");
        return;
      }

      // Save user ID in localStorage and redirect to dashboard
      localStorage.setItem("activeId", data[0].id);
      showSucessAlert("Registration successful! Redirecting...");
      setTimeout(function () {
        window.location.href = "../login.html"; // Redirect to dashboard immediately
      }, 1500);

    } catch (error) {
      failedsAlert("Error creating a new user.");
    }
  }

  storeAccounts(); // Store accounts in localStorage

});

