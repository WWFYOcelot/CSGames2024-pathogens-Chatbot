const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

// Store user prompt history
let contextHistory = [];

appendMessage('bot', 'Hi, I am a chatbot here to help you with your medical questions. What seems to be the problem?');

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  var text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';
  data = {
    "inputs": `${text}`,
    "parameters": {}
  }

  // Get bot response
  response = query(data).then((response) => {
    console.log(response);
    // Add response to chat
    appendMessage('bot', response[0].generated_text);

    // Store context history if response with context before Answer:
    parsed_response = response[0].generated_text;
    let context = parsed_response.substr(0, (parsed_response.indexOf("Answer:")))
    context = context.substr(0, (context.lastIndexOf(".") + 1))
    contextHistory.push(context);
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
