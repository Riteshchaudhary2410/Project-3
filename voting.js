document.getElementById('submitVote').addEventListener('click', async function() {
    const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
    
    if (!selectedCandidate) {
        alert('Please select a candidate before submitting your vote.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ candidateId: selectedCandidate.value })
        });

        const data = await response.json();
        
        if (data.success) {
            // Remove existing message area content
            const messageArea = document.getElementById('messageArea');
            messageArea.innerHTML = '';

            // Create overlay
            const overlay = document.createElement('div');
            overlay.id = 'logoutOverlay';

            // Create popup container
            const popup = document.createElement('div');
            popup.id = 'logoutPopup';

            // Create thank you message
            const thankYouMessage = document.createElement('h2');
            thankYouMessage.innerText = 'Thank you for voting!';

            // Create logout button
            const logoutButton = document.createElement('button');
            logoutButton.innerText = 'Logout';
            logoutButton.onclick = function() {
                // Implement logout functionality here
                window.location.href = '/'; // Redirect to login page
            };

            // Append message and button to popup
            popup.appendChild(thankYouMessage);
            popup.appendChild(logoutButton);

            // Append popup to overlay
            overlay.appendChild(popup);

            // Append overlay to body
            document.body.appendChild(overlay);
        } else {
            alert('Vote submission failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting your vote. Please try again.');
    }
});
