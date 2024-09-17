import { createClient } from '../@supabase/supabase-js';

// Initialize the supabase object
const supabaseUrl = 'https://etkaobkqgufsctafazrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2FvYmtxZ3Vmc2N0YWZhenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjE1NDQsImV4cCI6MjAzOTM5NzU0NH0.2N_ugjsXFx4KDiIglTOwsQwabtCs_PJdX8FGUnZOZ5M';
const supabase = createClient(supabaseUrl, supabaseKey);

// Use the global supabase object
window.supabase = supabase;

// Async function to initialize auth
async function initAuth() {
  try {
    // Check if supabase is initialized
    if (!supabase || !supabase.auth) {
      throw new Error('Supabase is not initialized');
    }

    // Get the current user
    const { data: { user }, error } = await supabase.auth.getSession();

    if (error || !user) {
      window.location.href = '/.html';
    }

    // Logout button click handler
    document.getElementById('logout').addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.href = '/login.html';
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the initAuth function
initAuth();




// // Import the Supabase client

// // Initialize the Supabase client
// const supabaseUrl = '(link unavailable)';
// const supabaseKey = 'your-supabase-key';
// const supabase = createClient(supabaseUrl, supabaseKey);