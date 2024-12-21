// Variables to keep track of the user's name and current chat participants
let userName = localStorage.getItem('userName');
let usersInChat = userName ? [userName] : [];

// Check if the user has already entered their name
if (!userName) {
  document.getElementById('name-section').style.display = 'flex';
  document.getElementById('main-content').style.display = 'none';
} else {
  document.getElementById('name-section').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  updateUserList();
}

// Function to set the user's name and hide the name input section
function setName() {
  userName = document.getElementById('userName').value.trim();
  if (userName) {
    localStorage.setItem('userName', userName);
    document.getElementById('name-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    usersInChat.push(userName);
    updateUserList();
  }
}

// Function to update the user list display
function updateUserList() {
  const chatUsersDiv = document.getElementById('chat-users');
  chatUsersDiv.innerHTML = `Users in chat: ${usersInChat.join(', ')}`;
}

// Function to send a chat message
// Function to send a chat message
function sendMessage() {
        const message = document.getElementById('chatInput').value.trim();
        if (message) {
          const chatMessagesDiv = document.getElementById('chat-messages');
          const newMessage = document.createElement('div');

          // Create a span for the username with a class of 'username'
          const usernameSpan = document.createElement('span');
          usernameSpan.classList.add('username');
          usernameSpan.textContent = `${userName}: `; // Display the username

          // Create a span for the message content with a class of 'message'
          const messageSpan = document.createElement('span');
          messageSpan.classList.add('message');
          messageSpan.textContent = message; // Display the message content

          // Append both spans to the message div
          newMessage.appendChild(usernameSpan);
          newMessage.appendChild(messageSpan);

          // Add the new message to the chat window
          chatMessagesDiv.appendChild(newMessage);

          // Clear input field and auto-scroll to the bottom
          document.getElementById('chatInput').value = '';
          chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
      }


// Function to check if 'Enter' is pressed to send message
function checkEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function addEmote(emote) {
        // Create a new span element for the emote
        const emoteElement = document.createElement('span');
        emoteElement.textContent = emote;
        emoteElement.classList.add('emote');
        document.body.appendChild(emoteElement);

        // Set initial properties
        emoteElement.style.position = 'absolute';
        emoteElement.style.fontSize = '100px';
        emoteElement.style.transition = 'none'; // No transition initially
        emoteElement.style.opacity = '1';

        // Position emote randomly within the viewport
        const maxX = window.innerWidth - 100; // Prevent overflow on the right
        const maxY = window.innerHeight - 200; // Prevent overflow on the bottom
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        emoteElement.style.left = `${randomX}px`;
        emoteElement.style.top = `${randomY}px`;

        // Force a reflow to ensure the emote appears on the screen
        emoteElement.offsetHeight; // This is a trick to force a reflow.

        // Now apply the transitions for floating and fading
        emoteElement.style.transition = 'transform 1s, opacity 1s'; // Re-enable transition
        setTimeout(() => {
            emoteElement.style.transform = 'translateY(-100px)';
            emoteElement.style.opacity = '0';
        }, 10); // Delay slightly to apply transition correctly

        // Remove the emote from the DOM after it disappears
        setTimeout(() => {
            document.body.removeChild(emoteElement);
        }, 1000); // The time here matches the duration of the fade-out
    }
