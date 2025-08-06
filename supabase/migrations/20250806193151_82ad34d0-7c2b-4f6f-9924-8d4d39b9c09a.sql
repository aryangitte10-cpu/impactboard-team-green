-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, is_admin)
  VALUES (
    NEW.id, 
    NEW.email,
    -- Set admin flag for the specific admin email
    CASE WHEN NEW.email = 'admin@impactboard.com' THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create content sections table for editable content
CREATE TABLE public.content_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for content sections
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Anyone can read content sections
CREATE POLICY "Anyone can read content sections"
ON public.content_sections
FOR SELECT
USING (true);

-- Only admins can modify content sections
CREATE POLICY "Admins can modify content sections"
ON public.content_sections
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Insert default content sections
INSERT INTO public.content_sections (section_key, title, content) VALUES
('hero_title', 'Impactboard By Givetastic', 'Transform your team''s potential into environmental change with our innovative platform that turns collaboration into conservation.'),
('hero_subtitle', 'Where Teams Thrive and Earth Prospers', 'Join thousands of teams making a difference through purposeful collaboration and sustainable practices.'),
('audience_title', 'Perfect For Every Team', 'Whether you''re a startup or enterprise, our platform adapts to your team''s unique needs.'),
('product_title', 'Powerful Features for Impact', 'Everything you need to build stronger teams while making a positive environmental difference.'),
('storytelling_title', 'Real Impact, Real Results', 'See how teams are transforming their collaboration while contributing to environmental sustainability.'),
('faq_title', 'Frequently Asked Questions', 'Find answers to common questions about our platform and how it works.'),
('contact_title', 'Ready to Make an Impact?', 'Join us in creating positive change for your team and the environment.');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_sections_updated_at
BEFORE UPDATE ON public.content_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();