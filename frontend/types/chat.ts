export type Message = {
    role: string;
    content: string;
    id: string;
  };
  
  export type ChatResponse = {
    content: string;
    error?: string;
  };
  
  export type BusinessContext = {
    businessName: string;
    industry: string;
    size: string;
  };