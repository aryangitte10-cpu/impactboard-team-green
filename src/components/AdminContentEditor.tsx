import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ContentSection {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
}

interface AdminContentEditorProps {
  sectionKey: string;
  children: React.ReactNode;
  className?: string;
}

const AdminContentEditor = ({ sectionKey, children, className }: AdminContentEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState<ContentSection | null>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  // Debug logging
  console.log('AdminContentEditor - Profile:', profile);
  console.log('AdminContentEditor - Is Admin:', profile?.is_admin);

  // Don't show editor if not admin
  if (!profile?.is_admin) {
    return <div className={className}>{children}</div>;
  }

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .maybeSingle();

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      if (data) {
        setContentData(data);
        setTitle(data.title || '');
        setContent(data.content || '');
        setImageUrl(data.image_url || '');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchContent();
    }
  }, [isOpen, sectionKey]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('content_sections')
        .upsert({
          section_key: sectionKey,
          title: title || null,
          content: content || null,
          image_url: imageUrl || null,
        }, {
          onConflict: 'section_key'
        });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Content updated successfully!",
        });
        setIsOpen(false);
        // Refresh the page to show updated content
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Content: {sectionKey}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL (optional)</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContentEditor;