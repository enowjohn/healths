
// Initialize Supabase
const supabaseUrl = 'https://etkaobkqgufsctafazrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2FvYmtxZ3Vmc2N0YWZhenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjE1NDQsImV4cCI6MjAzOTM5NzU0NH0.2N_ugjsXFx4KDiIglTOwsQwabtCs_PJdX8FGUnZOZ5M';
const supabaseSecret = 'your-supabase-secret';
const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

// Login function
async function login(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) {
    throw error;
  }
  return user;
}

// Logout function
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

// Register function
async function register(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw error;
  }
  return user;
}

// Get user data function
async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
}

// Protect routes with authentication
async function protectRoute(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const { user } = await supabase.auth.api.getUser(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}

// Export functions
module.exports = {
  login,
  logout,
  register,
  getUser,
  protectRoute,
};


// This code initializes Supabase, defines login, logout, register, and getUser functions, and creates a protectRoute middleware to authenticate requests.

// Please replace your-supabase-instance, your-supabase-key, and your-supabase-secret with your actual Supabase instance URL, key, and secret.

// You can use these functions in your routes to authenticate users and protect routes. For example:


// const express = require('express');
// const router = express.Router();
// // const { protectRoute, login, register } = require('./auth');

// router.post('/login', async (req, res) => {
//   try {
//     const user = await login(req.body.email, req.body.password);
//     res.send(user);
//   } catch (error) {
//     res.status(401).send({ error: 'Invalid email or password' });
//   }
// });

// router.post('/register', async (req, res) => {
//   try {
//     const user = await register(req.body.email, req.body.password);
//     res.send(user);
//   } catch (error) {
//     res.status(401).send({ error: 'Email already taken' });
//   }
// });

// router.get('/protected', protectRoute, async (req, res) => {
//   res.send(`Hello, ${req.user.email}!`);
// });
