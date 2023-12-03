// scripts/profile.js

// Sample user data (replace this with actual user data)
/*const user = {
    username: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    userType: 'Rider',
};*/

// Function to display user details on the profile page
function displayUserDetails(user) {
    const userDetailsContainer = document.getElementById('userDetails');

    for (const key in user) {
        if (Object.hasOwnProperty.call(user, key)) {
            const detailDiv = document.createElement('div');
            detailDiv.innerHTML = `<strong>${key}:</strong> ${user[key]}`;
            userDetailsContainer.appendChild(detailDiv);
        }
    }
}

// Function to handle the "Edit Profile" button click
function handleEditProfile() {
    // Add logic for handling profile editing
    console.log('Edit Profile button clicked');
}

// Function to fetch user data from the server
async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:3000/getUserProfile'); // Replace with the actual API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        displayUserDetails(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Display user details when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();

    // Attach event listener to the "Edit Profile" button
    const editProfileBtn = document.getElementById('editProfileBtn');
    editProfileBtn.addEventListener('click', handleEditProfile);
});
