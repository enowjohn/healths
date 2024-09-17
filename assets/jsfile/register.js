

// Initialize Supabase

// const SUPABASE_ANONO_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZXl1Y3F1dHp1Zm9vd3V1YWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MTY4OTMsImV4cCI6MjAzOTk5Mjg5M30.NpNrlM4UZMAlfIdb949K6wNjQSbnWc9wUyC6Aecv2NU";

// const supabase = supabase.createClient('https://your-project-ref.supabase.co', SUPABASE_ANONO_KEY);

// document.getElementById('register-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const { user, error } = await supabase.auth.signUp({ email, password });

//     if (error) {
//         alert('Registration error: ' + error.message);
//     } else {
//         alert('Registration successful! Please check your email to confirm.');
//         window.location.href = 'login.html';
//     }
// });
