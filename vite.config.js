import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuration to change the host and port
  server: {
    // Change the port to 8000
    port: 8000, 
    // Set the host to 'localhost'
    host: 'localhost', 
    
    // ADDED: This is the fix!
    // This tells Vite to accept requests from your domain.
    allowedHosts: [
      'm4spider.com',
      'www.m4spider.com'
    ]
  }
});
