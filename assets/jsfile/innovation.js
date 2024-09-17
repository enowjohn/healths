document.addEventListener("DOMContentLoaded", function() {
    // Add functionality for any buttons if needed
});


// Initialize Supabase
const supabase = supabase.createClient('https://nmzdscjrporqbptdhmrn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temRzY2pycG9ycWJwdGRobXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjQ0MTIsImV4cCI6MjA0MDk0MDQxMn0.4mqfVqM_GGTpa84pWCOJzZYgapyyaNj6k-jISVZDI5k');

// Example function to fetch video data from Supabase (if needed)
async function fetchVideoData() {
    let { data: videos, error } = await supabase
        .from('videos')
        .select('*');

    if (error) {
        console.error('Error fetching videos:', error);
    } else {
        console.log('Videos:', videos);
    }
}

fetchVideoData();
