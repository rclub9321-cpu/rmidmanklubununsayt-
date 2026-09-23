-- ============================================================
-- RM İDMAN KLUBU – Supabase SQL Setup
-- Bu faylı Supabase SQL Editor-da işlədin
-- ============================================================

-- 1. "orders" cədvəlini yarat
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  username TEXT,
  name TEXT,
  phone TEXT,
  package_type TEXT,
  message TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- orders cədvəlinə Row Level Security (RLS) aktiv et
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- orders cədvəlini herkes okuyabilsin (anon key ilə)
CREATE POLICY "orders_select_policy" ON orders
  FOR SELECT USING (true);

-- orders cədvəlinə yeni sifariş əlavə etmək üçün
CREATE POLICY "orders_insert_policy" ON orders
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- 2. "vip_users" cədvəlini yarat (admin panel üçün)
-- Admin paneli vasitəsilə yeni VIP istifadəçilər buraya yazılır
-- VIP login səhifəsi həm JSON, həm bu cədvəldən yoxlayır
-- ============================================================

CREATE TABLE IF NOT EXISTS vip_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  message TEXT DEFAULT 'Xoş gəldiniz!',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- vip_users cədvəlinə Row Level Security aktiv et
ALTER TABLE vip_users ENABLE ROW LEVEL SECURITY;

-- vip_users – hamı oxuya bilsin (VIP login üçün lazımdır)
CREATE POLICY "vip_users_select_policy" ON vip_users
  FOR SELECT USING (true);

-- vip_users – insert icazəsi (admin paneli anon key ilə əlavə edir)
CREATE POLICY "vip_users_insert_policy" ON vip_users
  FOR INSERT WITH CHECK (true);

-- vip_users – delete icazəsi (admin paneli anon key ilə silir)
CREATE POLICY "vip_users_delete_policy" ON vip_users
  FOR DELETE USING (true);

-- ============================================================
-- 3. Nümunə məlumatlar (istəyə görə)
-- ============================================================

-- Nümunə VIP istifadəçi
-- INSERT INTO vip_users (username, password, message)
-- VALUES ('test_user', 'test123', 'Test mesajı – Xoş gəldiniz!');

-- Nümunə sifariş
-- INSERT INTO orders (username, name, phone, package_type, message)
-- VALUES ('Məhəmməd', 'Məhəmməd Əliyev', '+994501234567', 'Başlanğıc Paketi', 'Zəhmət olmasa əlaqə saxlayın.');

-- ============================================================
-- SQL faylının sonu
-- ============================================================
