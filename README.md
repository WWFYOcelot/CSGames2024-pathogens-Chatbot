# CSGames2024-pathogens-Chatbot
This is a chat bot aimed at identifying health issues based on symptoms. 

Strategy: Have chat bot ask predefined questions to guide the user's response. 

Predefined questions:
What seems to be the problem? 
What are your symptoms?

Concatenate and format the 2 responses to be more digestible for the chat bot ai.

Format:
{Answer to what seems to be the problem}. Here are my symptoms: {Answer to what seems to be the problem?}. What do these symptoms indicate?

Model API used for querying responses: 
medalpaca-7b
https://huggingface.co/medalpaca/medalpaca-7b/blob/main/README.md 

Contributors: Raymond Zeng, Faraan Rashid.