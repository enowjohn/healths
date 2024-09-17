// Initialize Supabase
const supabaseUrl = 'https://etkaobkqgufsctafazrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2FvYmtxZ3Vmc2N0YWZhenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjE1NDQsImV4cCI6MjAzOTM5NzU0NH0.2N_ugjsXFx4KDiIglTOwsQwabtCs_PJdX8FGUnZOZ5M';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch services from Supabase
document.addEventListener('DOMContentLoaded', async function() {
    const { data: services, error } = await supabase.from('services').select('*');

    if (error) {
        console.error('Error fetching services:', error);
    } else {
        displayServices(services);
    }
});

// Function to display services on the page
function displayServices(services) {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <h3>${service.name}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(serviceCard);
    });
}
