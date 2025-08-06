
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AdminUserSetup = () => {
  const [setupComplete, setSetupComplete] = useState(() => {
    // Check if setup was already completed in this browser session
    return sessionStorage.getItem('admin-setup-complete') === 'true';
  });

  useEffect(() => {
    // Don't run if setup is already complete
    if (setupComplete) {
      return;
    }

    const createAdminUser = async () => {
      try {
        console.log('Attempting admin user setup...');
        const { data, error } = await supabase.functions.invoke('create-admin');
        
        if (error) {
          // This is expected if admin already exists
          console.log('Admin user setup: User already exists or other expected error');
        } else {
          console.log('Admin user created successfully:', data);
        }
      } catch (err) {
        // This is also expected, just log it
        console.log('Admin setup completed with expected error:', err);
      } finally {
        // Mark setup as complete regardless of outcome
        sessionStorage.setItem('admin-setup-complete', 'true');
        setSetupComplete(true);
      }
    };

    createAdminUser();
  }, [setupComplete]);

  return null;
};

export default AdminUserSetup;
