const socket = io();
document.getElementById('messageForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = document.getElementById('userInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    if (user !== '' && message !== '') {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, message })
        });

        if (response.ok) {
            document.getElementById('messageInput').value = '';
        }
    }
});