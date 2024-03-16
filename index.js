const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

// Store user prompt history
let responses = [];

appendMessage('bot', 'Hi, I am a chatbot here to help you with your medical questions. What seems to be the problem?');

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  var text = chatInput.value;
  if (!text) return;
  
  
  appendMessage('user', text);
  chatInput.value = '';

  if(responses.length == 0){
    
    appendMessage('bot', 'What are your symptoms?');
  }

  if(responses.length < 1){
    responses.push(text);
  } else{
    response1 = responses[0];
    data = {
      "inputs": `${response1 + " Here are my symptoms: " + text + " What do these symptoms indicate?"}`,
      "parameters": {}
    }
     // Get bot response
    response = query(data).then((response) => {
      console.log(response);
      // Add response to chat
      appendMessage('bot', response[0].generated_text);
      responses = [];
    });


  }
 

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

