import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AdminUserSetup = () => {
  useEffect(() => {
    const createAdminUser = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-admin');
        if (error) {
          console.log('Admin user may already exist:', error);
        } else {
          console.log('Admin setup result:', data);
        }
      } catch (err) {
        console.log('Admin setup attempted:', err);
      }
    };

    createAdminUser();
  }, []);

  return null;
};

export default AdminUserSetup;