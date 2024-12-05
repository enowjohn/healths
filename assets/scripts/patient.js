const manageAppointments = document.querySelectorAll('.btn');
const viewProfile = document.querySelectorAll('.btns');

manageAppointments.forEach((manageAppointment) => {
    manageAppointment.addEventListener('click', () => {
        window.location.href = 'appointments.html';
    });
})
viewProfile.forEach((viewProfile) => {
    viewProfile.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
    
})


const fetchPatients = async () => {
    const { data: patients, error } = await supabase
        .from('patients')
        .select('*');

    if (error) {
        console.error(error);
        return;
    }

    const tableBody = document.querySelector('tbody');
    patients.forEach(patient => {
        const row = `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.email}</td>
                <td>${patient.phone}</td>
                <td>${patient.gender}</td>
                <td><button class="btn">View Profile</button></td>
                <td><button class="btn">Manage Appointments</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

fetchPatients();
