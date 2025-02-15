// Types
type Message = {
    role: string;
    content: string;
    id: string;
  };
  
  // API URL from environment variables with fallback
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001';
  const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://127.0.0.1:5001';
  
  export const chatService = {
    async sendMessage(messages: Message[]) {
      try {
        // Get the last message (user's message)
        const lastMessage = messages[messages.length - 1];
        
        // First API call (existing one)
        const response = await fetch(`${API_URL}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: lastMessage.content 
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Get the response text
        const data = await response.text();
        
        // Check if it's the specific response and make the second API call
        if (data === "Thank you! I have all the information I need. Is there anything else I can help you with?") {
          try {
            const agentResponse = await fetch(`${AGENT_API_URL}/run-agent`, {
              method: 'POST',
            });
            
            if (!agentResponse.ok) {
              console.error('Agent API response was not ok');
            }
          } catch (agentError) {
            console.error('Error calling agent:', agentError);
            // You might want to handle this error differently
          }
        }
  
        return data;
      } catch (error) {
        console.error('Error in chat service:', error);
        throw error;
      }
    }
  };
  
  // Export types for use in other components
  export type { Message };