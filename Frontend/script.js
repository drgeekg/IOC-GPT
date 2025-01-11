// DOM Elements
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");

// Send User Message
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        displayMessage("User", userMessage);
        displayThinkingMessage(); // Display "Thinking..." message
        fetchLangFlowResponse(userMessage);
        userInput.value = ""; // Clear the input field
    }
});

// Display Messages
function displayMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "User" ? "user-message" : "bot-message";

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeSpan = document.createElement("span");
    timeSpan.className = "timestamp";
    timeSpan.innerText = ` (${timestamp})`;

    const messageContent = document.createElement("span");
    messageContent.className = "message-content";
    messageContent.innerText = message;

    const senderSpan = document.createElement("span");
    senderSpan.className = "sender";
    senderSpan.innerText = `${sender}: `;

    msgDiv.appendChild(senderSpan);
    msgDiv.appendChild(messageContent);
    msgDiv.appendChild(timeSpan);

    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}

// Display "Thinking..." Message
function displayThinkingMessage() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = "thinkingMessage";
    thinkingDiv.className = "bot-message";
    thinkingDiv.innerText = "Assistant: Thinking...";
    chatbox.appendChild(thinkingDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Fetch Response from LangFlow API
function fetchLangFlowResponse(userMessage) {
    fetch("http://127.0.0.1:7860/api/v1/run/48c6afbf-4646-4715-8298-d4cb8d8e75d3?stream=false", {
        method: "POST",
        headers: {
            "Authorization": "Bearer <TOKEN>", // Replace <TOKEN> with your actual token
            "Content-Type": "application/json",
            "x-api-key": "<your api key>" // Replace <your api key> with your actual API key
        },
        body: JSON.stringify({
            input_value: userMessage,
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
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Full API Response:", data); // Debugging: Log the full response
            removeThinkingMessage();
            const botResponse = extractBotResponse(data); // Extract the bot's response
            if (botResponse) {
                displayMessage("Assistant", botResponse);
            } else {
                displayMessage("Assistant", "No meaningful response from Assistant.");
            }
        })
        .catch((error) => {
            console.error("Error fetching response:", error);
            removeThinkingMessage();
            displayMessage("Assistant", "Sorry, something went wrong.");
        });
}

function extractBotResponse(data) {
    try {
        console.log("Parsing Response:", data); // Debugging: Log the data being parsed

        // Check if the output array exists and has the expected structure
        if (data && data.outputs && Array.isArray(data.outputs) && data.outputs.length > 0) {
            const nestedOutputs = data.outputs[0].outputs;
            
            // Check for the nested output's structure
            if (nestedOutputs && Array.isArray(nestedOutputs) && nestedOutputs.length > 0) {
                const textData = nestedOutputs[0]?.results?.text?.data?.text;
                
                // If the expected text exists, return it
                if (textData) {
                    return textData;
                } else {
                    console.error("No 'text' data found in the response.");
                    return "No response text found.";
                }
            } else {
                console.error("Invalid 'outputs' structure or empty.");
                return "No nested outputs found.";
            }
        } else {
            console.error("Invalid 'outputs' array or empty.");
            return "No valid output found.";
        }
    } catch (error) {
        console.error("Error extracting bot response:", error);
        return "An error occurred while parsing the response.";
    }
}



// Remove "Thinking..." Message
function removeThinkingMessage() {
    const thinkingDiv = document.getElementById("thinkingMessage");
    if (thinkingDiv) {
        chatbox.removeChild(thinkingDiv);
    }
}
