import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContentSection {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
}

export const useContent = (sectionKey: string) => {
  const [data, setData] = useState<ContentSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: content, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('section_key', sectionKey)
          .maybeSingle();

        if (error) {
          console.error('Error fetching content:', error);
        } else {
          setData(content);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [sectionKey]);

  return { data, loading };
};