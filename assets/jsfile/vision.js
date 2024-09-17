// Initialize Supabase client
const supabaseUrl = 'https://etkaobkqgufsctafazrq.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2FvYmtxZ3Vmc2N0YWZhenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjE1NDQsImV4cCI6MjAzOTM5NzU0NH0.2N_ugjsXFx4KDiIglTOwsQwabtCs_PJdX8FGUnZOZ5M';  // Replace with your Supabase key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to load articles from Supabase
async function loadArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  const articlesContainer = document.getElementById('articles-container');
  articlesContainer.innerHTML = articles.map(article => `
    <article>
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <a href="${article.url}">Read more</a>
    </article>
  `).join('');
}

// Load articles on page load
window.addEventListener('load', loadArticles);
