# Carbi API Documentation

## Endpoints

### POST /api/submit-match

Accepts car matching form submissions from get-matched.html and stores them in Supabase.

#### Request

**Method:** POST
**Content-Type:** application/json

**Body:**
```json
{
  "important_features": ["Safety", "Cost", "Insurance Cost"],
  "dealbreakers": ["Safety", "Cost"],
  "budget_min": 6000,
  "budget_max": 8000,
  "brand_preference": "specific",
  "selected_brands": ["Toyota", "Honda"],
  "favourite_brand": "Toyota",
  "preferred_colours": ["Black", "White"],
  "custom_colour": "",
  "max_mileage": 50000,
  "search_radius": 30,
  "postcode": "SW1A 1AA",
  "location_coords": {
    "lat": 51.5074,
    "lon": -0.1278
  },
  "additional_notes": "Need space for sports equipment",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "07123456789",
  "contact_preferences": ["Email", "Text"]
}
```

#### Response

**Success (200):**
```json
{
  "success": true,
  "id": "uuid-here",
  "message": "Your match request has been submitted successfully!"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Missing required fields: first_name, phone"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Failed to save match request. Please try again."
}
```

## Environment Variables

Required environment variables for Vercel deployment:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key (not anon key!)

## Database Schema

The function expects a `match_requests` table in Supabase with the following columns:

```sql
CREATE TABLE match_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Personal details
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  contact_preferences TEXT[] NOT NULL,

  -- Car preferences
  important_features TEXT[] NOT NULL,
  dealbreakers TEXT[],

  -- Budget
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,

  -- Brand preferences
  brand_preference TEXT,
  selected_brands TEXT[],
  favourite_brand TEXT,

  -- Color preferences
  preferred_colours TEXT[],
  custom_colour TEXT,

  -- Mileage
  max_mileage INTEGER,

  -- Location
  postcode TEXT NOT NULL,
  search_radius INTEGER NOT NULL,
  location_coords JSONB,

  -- Additional info
  additional_notes TEXT,

  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables in Vercel dashboard

3. Deploy:
   ```bash
   vercel --prod
   ```

## Testing Locally

```bash
# Install Vercel CLI
npm install -g vercel

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_KEY

# Run development server
vercel dev
```

Then test the endpoint at: http://localhost:3000/api/submit-match
