-- ============================================================
-- RM İDMAN KLUBU – Supabase Cədvəl Qurulumu
-- Bu SQL-i Supabase Dashboard > SQL Editor-da icra edin
-- ============================================================

-- 1. VIP İstifadəçilər Cədvəli
CREATE TABLE IF NOT EXISTS vip_users (
  id          BIGSERIAL PRIMARY KEY,
  username    TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Admin Parametrləri Cədvəli
CREATE TABLE IF NOT EXISTS admin_settings (
  id          BIGSERIAL PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Standart qarşılama mesajı
INSERT INTO admin_settings (key, value)
VALUES ('welcome_message', 'Salam')
ON CONFLICT (key) DO NOTHING;

-- 4. Row Level Security aktivləşdirmə
ALTER TABLE vip_users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- 5. Admin_settings üçün icazələr (anonim oxuya bilər)
DROP POLICY IF EXISTS "anon_read_settings" ON admin_settings;
CREATE POLICY "anon_read_settings" ON admin_settings
  FOR SELECT TO anon USING (true);

-- 6. Service role üçün tam giriş (admin panel istifadə edir)
DROP POLICY IF EXISTS "service_all_settings" ON admin_settings;
CREATE POLICY "service_all_settings" ON admin_settings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_all_users" ON vip_users;
CREATE POLICY "service_all_users" ON vip_users
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. VIP istifadəçilər giriş üçün oxuya bilər
DROP POLICY IF EXISTS "anon_read_users" ON vip_users;
CREATE POLICY "anon_read_users" ON vip_users
  FOR SELECT TO anon USING (true);

-- Hazır! Supabase cədvəlləriniz quruldu.
