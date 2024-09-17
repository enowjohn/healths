document.addEventListener("DOMContentLoaded", async () => {
    const appointmentForm = document.getElementById("appointmentForm");
    const doctorSelect = document.getElementById("doctorSelect");
    const appointmentSuccess = document.getElementById("appointmentSuccess");
    const appointmentSubmit = document.getElementById("appointmentSubmit");

    const supabaseURL = "https://nmzdscjrporqbptdhmrn.supabase.co";
    const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temRzY2pycG9ycWJwdGRobXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjQ0MTIsImV4cCI6MjA0MDk0MDQxMn0.4mqfVqM_GGTpa84pWCOJzZYgapyyaNj6k-jISVZDI5k';
    
    // Correct initialization of Supabase client
    const supabase = window.supabase.createClient(supabaseURL, supabaseKEY);

    // Populate the doctor select dropdown with doctors from the database
    async function populateDoctorSelect() {
        const { data: doctors, error } = await supabase
            .from("users")
            .select("id, name")
            .eq("type", "doctor");

        if (error) {
            console.error("Error fetching doctors:", error);
            return;
        }

        doctors.forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor.id;
            option.textContent = `Dr. ${doctor.name}`;
            doctorSelect.appendChild(option);
        });
    }
    
    // Handle appointment form submission
    appointmentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(appointmentForm);
        const appointmentDetails = {
            patient_id: localStorage.getItem("user_id"), // Assuming patient ID is stored in localStorage
            doctor_id: doctorSelect.value,
            date: formData.get("date"),
            time: formData.get("time"),
        };

        const { data, error } = await supabase
            .from("appointments")
            .insert([appointmentDetails]);

        if (error) {
            console.error("Error booking appointment:", error.message); // Use error.message to see the exact error
            return;
        }


        appointmentForm.addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const formData = new FormData(appointmentForm);
            const appointmentDetails = {
                patient_id: localStorage.getItem("user_id"), // Assuming patient ID is stored in localStorage
                doctor_id: doctorSelect.value,
                date: formData.get("date"),
                time: formData.get("time"),
            };
        
            // Attempt to insert appointment details into the Supabase "appointments" table
            const { data, error } = await supabase
                .from("appointments")
                .insert([appointmentDetails]);
        
            // Log the data and error returned from Supabase
            console.log("Supabase Data:", data);
            console.log("Supabase Error:", error);
        
            if (error) {
                console.error("Error booking appointment:", error.message || error); // Log more details if error.message is missing
                return;
            }
        
            appointmentSuccess.style.display = "block";
            appointmentForm.reset(); // Clear the form after submission
        });
        

        appointmentSuccess.style.display = "block";
        appointmentForm.reset(); // Clear the form after submission
    });

    window.location.href = "doctor.html"

    // Initialize the form by populating the doctor dropdown
    populateDoctorSelect();
});
