// Initialize Supabase
const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseKey = 'your-public-anon-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch blog posts from Supabase
document.addEventListener('DOMContentLoaded', async function() {
    const { data: posts, error } = await supabase.from('blogs').select('*');

    if (error) {
        console.error('Error fetching blog posts:', error);
    } else {
        displayBlogPosts(posts);
    }
});

// Function to display blog posts on the page
function displayBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';

    posts.forEach(post => {
        const blogPost = document.createElement('div');
        blogPost.className = 'blog-post';
        blogPost.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 150)}...</p>
            <a href="blog-details.html?id=${post.id}">Read More</a>
        `;
        blogContainer.appendChild(blogPost);
    });
}
