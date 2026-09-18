-- ==========================================================
-- AYRA HAMPERS — PRODUCTION DATABASE MIGRATIONS & SCHEMA
-- ==========================================================

-- 1. HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT,
    image_url TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Explore Collection',
    cta_link TEXT DEFAULT '/products',
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INSTAGRAM REELS TABLE
CREATE TABLE IF NOT EXISTS public.instagram_reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    reel_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    likes_count INTEGER DEFAULT 1420,
    comments_count INTEGER DEFAULT 86,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin' NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on newly created tables
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read active hero_slides" ON public.hero_slides
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read active instagram_reels" ON public.instagram_reels
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read site_settings" ON public.site_settings
    FOR SELECT USING (true);

-- Admin Full Access Policies (authenticated admin)
CREATE POLICY "Allow admin full access hero_slides" ON public.hero_slides
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin full access instagram_reels" ON public.instagram_reels
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin full access site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin read admin_users" ON public.admin_users
    FOR SELECT TO authenticated USING (true);
