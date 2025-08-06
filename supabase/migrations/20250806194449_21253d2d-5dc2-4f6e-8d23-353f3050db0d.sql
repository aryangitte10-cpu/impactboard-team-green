-- Update the handle_new_user function to store additional user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, is_admin, full_name, mobile_number)
  VALUES (
    NEW.id, 
    NEW.email,
    -- Set admin flag for the specific admin email
    CASE WHEN NEW.email = 'admin@impactboard.com' THEN true ELSE false END,
    -- Extract metadata from raw_user_meta_data
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'mobile_number'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';