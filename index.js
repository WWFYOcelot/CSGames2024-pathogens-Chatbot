const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

// Store user prompt history
let history = [];

appendMessage('bot', 'Hi, I am a chatbot here to help you with your medical questions. What seems to be the problem?');

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  var text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';

  // Strategy 1 (see below all codes for details)
  if(text.includes("?")){
    console.log(history.join(" "));
    text =  history.join(" ") + " " + text;
    console.log(text)
    history = [];
  } else {
    history.push(text);
  }

  data = {
    "inputs": `${text}`,
    "parameters": {}
  }

  // Get bot response
  response = query(data).then((response) => {
    console.log(response);
    // Add response to chat
    appendMessage('bot', response[0].generated_text);
  });
});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}



// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}


// Bot Section

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// Strategy 1: 
// Idea: concatenate user messages until a message with a question mark is sent. Then, send the concatenated messages to the bot and clear the concatenated messages.

// Bot still responds to each message but question mark messages are concatenated with previous non question mark questions.