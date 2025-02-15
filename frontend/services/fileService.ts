export const fileService = {
    async uploadFile(file: File) {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Upload failed');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error in file service:', error);
        throw error;
      }
    }
  };