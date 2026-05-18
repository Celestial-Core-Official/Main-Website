-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  lang TEXT,
  href TEXT,
  image TEXT,
  accent TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('maintenance_mode', '{"enabled": false, "message": ""}', 'Enable/disable maintenance mode for the site'),
  ('hero_description', '{"text": ""}', 'Hero section description text'),
  ('about_intro', '{"text": ""}', 'About page introduction text'),
  ('footer_tagline', '{"text": ""}', 'Footer tagline text')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create SELECT policies for public read-only access on projects
CREATE POLICY "projects_public_select" ON projects
  FOR SELECT
  USING (true);

-- Create SELECT policies for public read-only access on site_settings
CREATE POLICY "site_settings_public_select" ON site_settings
  FOR SELECT
  USING (true);
