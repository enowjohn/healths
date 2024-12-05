/** @format */

const loginform = document.getElementById("loginform");
const submitBtn = document.querySelector(".submitBtn");
const supabaseUrl = "https://vlrfphqpurzzdwunfest.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmZwaHFwdXJ6emR3dW5mZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzI2MDIsImV4cCI6MjA0MTgwODYwMn0.MbRsqjWNF334kOLcc-BW8u36LKgwGHZ305pnYo2JRcg";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";
const supabase = createClient(supabaseUrl, supabaseKey);
import { showSucessAlert } from "../scripts/custom_alert.js";
import { failedsAlert } from "../scripts/custom_alert.js";

// On form submit
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = loginform.email.value;
  const password = loginform.password.value;

  // Fetch user data from the "users" table
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (data && data.length !== 0) {
    // Verify password
    if (data[0].password === password) {
      // Save user ID in localStorage
      localStorage.setItem("activeId", JSON.stringify(data[0].id));
      showSucessAlert("Login successful! Redirecting...");
      setTimeout(function () {
        window.location.href = "./dashboard.html"; // Redirect to dashboard
      }, 1500);
    } else {
      failedsAlert("Wrong password");
    }
  } else {
    failedsAlert("User not found");
  }
});