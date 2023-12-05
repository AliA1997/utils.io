import { Client } from '@services/server-client';

function useServerClient() {
    const serverClient = new Client(process.env.NEXT_PUBLIC_SERVER_URL);  
  
    return {
        serverClient
    };
  };
  
  export default useServerClient;
  