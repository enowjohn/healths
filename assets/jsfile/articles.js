// Initialize Supabase
const SUPABASE_URL = 'https://cdeyucqutzufoowuualr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZXl1Y3F1dHp1Zm9vd3V1YWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MTY4OTMsImV4cCI6MjAzOTk5Mjg5M30.NpNrlM4UZMAlfIdb949K6wNjQSbnWc9wUyC6Aecv2NU';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to load articles from Supabase
async function loadArticles() {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
        console.error('Error fetching articles:', error);
        return;
    }
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';
    data.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content}</p>
        `;
        articleList.appendChild(articleElement);
    });
}

// Function to handle form submission
document.getElementById('article-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const { data, error } = await supabase.from('articles').insert([{ title, content }]);
    if (error) {
        alert('Error submitting article: ' + error.message);
        return;
    }
    alert('Article submitted successfully!');
    document.getElementById('article-form').reset();
    loadArticles();
});

// Load articles on page load
loadArticles();
