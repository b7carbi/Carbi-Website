
-- Dealers Table
CREATE TABLE IF NOT EXISTS dealers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    website TEXT NOT NULL,
    name TEXT,
    location TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Target Models (Scope Configuration)
CREATE TABLE IF NOT EXISTS target_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name TEXT, -- Optional descriptive name
    forbidden_keywords TEXT[], -- Array of strings e.g. ['damaged', 'cat s']
    max_price INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insurance Rules (Enrichment)
CREATE TABLE IF NOT EXISTS insurance_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    must_contain TEXT[] NOT NULL, -- Array of keywords e.g. ['Golf', 'GTI']
    insurance_group TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cars Table
CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
    vrm TEXT NOT NULL, -- Vehicle Registration Mark
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    mileage INTEGER,
    year INTEGER,
    image_url TEXT,
    transmission TEXT,
    fuel TEXT,
    doors INTEGER,
    insurance_group TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'sold'
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(dealer_id, vrm) -- Ensure unique VRM per dealer
);

-- Review Queue for items not matching insurance rules
CREATE TABLE IF NOT EXISTS review_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID REFERENCES dealers(id) ON DELETE SET NULL,
    vrm TEXT,
    title TEXT,
    price INTEGER,
    mileage INTEGER,
    year INTEGER,
    image_url TEXT,
    transmission TEXT,
    fuel TEXT,
    doors INTEGER,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cars_vrm ON cars(vrm);
CREATE INDEX IF NOT EXISTS idx_cars_dealer_id ON cars(dealer_id);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
