document.addEventListener("DOMContentLoaded", function() {
    // Learn More Button
    document.getElementById("learnMoreBtn").addEventListener("click", function() {
        // Check if the additional content is already displayed
        const moreInfoSection = document.getElementById("moreInfo");
        if (!moreInfoSection) {
            // Create a new section with additional information
            const moreInfo = document.createElement("section");
            moreInfo.id = "moreInfo";  // Set an ID to reference later
            moreInfo.innerHTML = `
                <h3>Extended Strategy Details</h3>
                <p>Our strategy focuses on building robust health infrastructure, leveraging data-driven insights, and ensuring community engagement at all levels.</p>
                <p>We prioritize preventive care, early diagnosis, and personalized treatment plans, ensuring each patient receives care tailored to their unique needs.</p>
                <p>Through strategic partnerships and collaborations, we aim to expand our reach and impact, bringing quality healthcare services to underserved areas.</p>
                <p>Innovation is at the heart of our strategy, utilizing the latest technology and medical advancements to improve patient outcomes and streamline healthcare delivery.</p>
            `;
            // Append the new section to the main content
            document.querySelector("main").appendChild(moreInfo);

            // Change the button text after content is revealed
            this.textContent = "Show Less";
        } else {
            // If content is already displayed, remove it
            moreInfoSection.remove();

            // Revert button text to the original state
            this.textContent = "Learn More";
        }
    });


    // Strategy Buttons
    const strategyButtons = document.querySelectorAll('.strategy-btn');
    strategyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            window.location.href = target;
        });
    });

    // Supabase initialization
    const supabaseUrl = 'https://etkaobkqgufsctafazrq.supabase.co';  // Replace with your Supabase URL
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2FvYmtxZ3Vmc2N0YWZhenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjE1NDQsImV4cCI6MjAzOTM5NzU0NH0.2N_ugjsXFx4KDiIglTOwsQwabtCs_PJdX8FGUnZOZ5M';  // Replace with your Supabase public anon key
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Example: Fetch strategy data from Supabase
    async function fetchStrategyData() {
        const { data, error } = await supabase
            .from('strategies')
            .select('*');
        if (error) console.error(error);
        else console.log(data);
    }

    fetchStrategyData();
});
