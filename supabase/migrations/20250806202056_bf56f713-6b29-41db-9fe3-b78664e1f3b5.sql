-- Remove auth-related database objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP TABLE IF EXISTS public.profiles CASCADE;