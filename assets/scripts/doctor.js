     // Function to check if the user is logged in using Supabase
async function checkUserAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        alert('You must be logged in to view doctors.');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        displayDoctors(); // If logged in, show doctors
    }
}

     
     
     
     
     // Example doctor data (can be fetched from Supabase or another backend)
     const doctors = [
        {
            id: 1,
            name: "Dr. John Doe",
            specialty: "Cardiologist",
            image: "https://example.com/doctor1.jpg" // Replace with actual image URL
        },
        {
            id: 2,
            name: "Dr. Sarah Connor",
            specialty: "Neurologist",
            image: "https://example.com/doctor2.jpg"
        },
        {
            id: 3,
            name: "Dr. Anthony Smith",
            specialty: "Orthopedic Surgeon",
            image: "https://example.com/doctor3.jpg"
        },
        // Add as many doctor profiles as needed...
    ];

    // Function to display doctors dynamically
    function displayDoctors() {
        const doctorList = document.getElementById('doctor-list');

        doctors.forEach(doctor => {
            // Create doctor card
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctor-card');

            // Doctor image
            const doctorImage = document.createElement('img');
            doctorImage.src = doctor.image;
            doctorImage.alt = doctor.name;

            // Doctor name
            const doctorName = document.createElement('h3');
            doctorName.textContent = doctor.name;

            // Doctor specialty
            const doctorSpecialty = document.createElement('p');
            doctorSpecialty.textContent = doctor.specialty;

            // Book button
            const bookButton = document.createElement('button');
            bookButton.textContent = 'Book Appointment';
            bookButton.addEventListener('click', () => bookAppointment(doctor));

            // Append all elements to doctor card
            doctorCard.appendChild(doctorImage);
            doctorCard.appendChild(doctorName);
            doctorCard.appendChild(doctorSpecialty);
            doctorCard.appendChild(bookButton);

            // Append doctor card to the list
            doctorList.appendChild(doctorCard);
        });
    }

    // Function to book an appointment (this can be connected to a backend)
    function bookAppointment(doctor) {
        alert(`Appointment booked with ${doctor.name}, a ${doctor.specialty}.`);
        // You can save the appointment booking in the database (e.g., Supabase)
    }

    // Function to check if the user is logged in
    function checkUserAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if the user is logged in (example)

        if (!isLoggedIn) {
            alert('You must be logged in to view doctors.');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            displayDoctors(); // If logged in, show doctors
        }
    }

    // Check if the user is authenticated when the page loads
    window.onload = checkUserAuth;