// Step 1: Ensure that the Supabase client is initialized
const supabaseUrl = 'https://nmzdscjrporqbptdhmrn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temRzY2pycG9ycWJwdGRobXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjQ0MTIsImV4cCI6MjA0MDk0MDQxMn0.4mqfVqM_GGTpa84pWCOJzZYgapyyaNj6k-jISVZDI5k';  
const supabase = createClient(supabaseUrl, supabaseKey);  // Initialize the Supabase client

// Step 2: Define the function to load messages
const loadMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading messages:', error.message);
  } else {
    const container = document.getElementById('message-container');
    container.innerHTML = '';
    data.forEach((msg) => {
      const messageEl = document.createElement('div');
      messageEl.textContent = `${msg.email}: ${msg.content}`;
      container.appendChild(messageEl);
    });
  }
};

// Step 3: Handle form submission to send a message
document.getElementById('message-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('message').value;

  const { data, error } = await supabase.from('messages').insert([
    { email: 'johnwashinton88@gmail.com', content }, // Replace with the actual user's email
  ]);

  if (error) {
    alert('Error sending message: ' + error.message);
  } else {
    document.getElementById('message').value = '';  // Clear the input field
    loadMessages();  // Reload messages after inserting a new one
  }
});

// Step 4: Load messages when the page loads
loadMessages();

// Step 5: Set up a real-time listener to update messages
supabase
  .from('messages')
  .on('INSERT', payload => {
    loadMessages();  // Reload messages when a new message is inserted
  })
  .subscribe();
