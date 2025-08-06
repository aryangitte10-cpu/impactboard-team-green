import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AdminUserSetup = () => {
  const [adminSetupAttempted, setAdminSetupAttempted] = useState(false);

  useEffect(() => {
    const createAdminUser = async () => {
      // Check if we've already attempted admin setup in this session
      const setupAttempted = sessionStorage.getItem('admin-setup-attempted');
      if (setupAttempted || adminSetupAttempted) {
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('create-admin');
        if (error) {
          // Admin user already exists, this is expected
          console.log('Admin user setup: User already exists');
        } else {
          console.log('Admin setup result:', data);
        }
      } catch (err) {
        console.log('Admin setup attempted:', err);
      } finally {
        // Mark that we've attempted setup in this session
        sessionStorage.setItem('admin-setup-attempted', 'true');
        setAdminSetupAttempted(true);
      }
    };

    createAdminUser();
  }, [adminSetupAttempted]);

  return null;
};

export default AdminUserSetup;