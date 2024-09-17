// Initialize Supabase client
const supabaseUrl = 'https://nmzdscjrporqbptdhmrn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temRzY2pycG9ycWJwdGRobXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjQ0MTIsImV4cCI6MjA0MDk0MDQxMn0.4mqfVqM_GGTpa84pWCOJzZYgapyyaNj6k-jISVZDI5k';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Handle form submission
document.getElementById('mission-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const { data, error } = await supabase.from('contacts').insert([
        { name, email, message }
    ]);

    if (error) {
        alert('Error submitting form: ' + error.message);
    } else {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('mission-form').reset();
    }
});

