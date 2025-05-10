document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const inputValue = document.getElementById('user-input').value.trim();
    if (!inputValue) return;

    // Display user message
    displayMessage(inputValue, 'user');

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send request to the API
    fetch("http://127.0.0.1:7860/api/v1/run/48c6afbf-4646-4715-8298-d4cb8d8e75d3?stream=false", {
        method: "POST",
        headers: {
            "Authorization": "Bearer <TOKEN>", // Insert your token here
            "Content-Type": "application/json",
            "x-api-key": "<your api key>" // Insert your API key here
        },
        body: JSON.stringify({
            input_value: inputValue,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
                "ChatInput-JmiTM": {},
                "ParseData-KMCQb": {},
                "Prompt-cDn7Q": {},
                "SplitText-BebXr": {},
                "File-OXP2g": {},
                "OllamaEmbeddings-PYEu8": {},
                "FAISS-dk4Ak": {},
                "OllamaModel-o8CTF": {},
                "OllamaEmbeddings-ul1Ru": {},
                "FAISS-Fa0UY": {},
                "ChatOutput-RPGbA": {}
            }
        }),
    })
    .then(res => res.json())
    .then(data => {
        const response = data.response || "No response from server.";
        displayMessage(response, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage("Sorry, something went wrong. Please try again.", 'bot');
    });
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
