#Project Overview

##Long term strategic vision: Build a career around cars. If it's feasible, have a physical car dealership that specialises in low insurance group cars for young drivers. The rationale is 1) Parents find it frustrating to find an insurable first car for their kids; 2) Nobody else is doing this 3) It's a clear demographic that can be targeted with social media.

##Medium term goals: Build a car broker service for young drivers and their parents. Capture their needs and pair them up with a dealership that has the right car for them.

##Future pivot point: Scale the broker service, monetise it and automate it AND / OR open a physical dealership and stock it with cars. Use similar marketing approaches to target the young driver demographic.

##Short term goal: Build and launch the car matching service. Find leads using Facebook and Instagram ads, send them to the landing page and form, capture their details and fulfil them manually. Do this for free for up to 2 months before charging buyers and/or dealers for the service. Test monetisation.

##Car Buyer Side Hypothesis: If we help 17-19 year old newly licensed drivers and their parents find desirable, affordable, insurable first cars with carbi, then they will choose it over autotrader, car supermarkets and local dealers because our solution is curating the right cars and connecting families with trusted dealers.

##Car Dealer Side Hypothesis: If we help dealers frustrated with AutoTrader reach qualified young driver buyers, they'll partner with us instead of paying for more AutoTrader slots, because we deliver pre-qualified leads at a fraction of the cost with better conversion rates.



#Tech Stack:

Front-end: HTML, CSS, JavaScript (vanilla).
Back-end: Node.js + Expess. 
Database: Supabase
Deployment: Vercel

#Marketing:

Paid ads on Facebook and Instagram linking to the landing page.
#Marketing progress: 
Week 1: £13 per day targetting 35-55 years old parents in a 30 mile radius of Edinburgh. I got barely any leads.
Week 2: Expanded to nationwide and got a couple of leads per day, most were women.
Week 3: Switched to women only and got up to 8 leads per day, which was too much to handle. Reduced to £3 per day to keep it ticking over. 
Week 4: Tested a different fulfilment approach, pass customer details to the dealer rather than dealer details to the customer. This worked better from a perspective of the dealers seeing value in this.
I've tested Facebook and Instagram ads successfully - I can get people to fill in my form at about £3.50 per lead.


#Key Pages:

/index.html: Landing page with hero section, features, and 2 CTA buttons linking to form.
/get-matched.html: A progressive disclosure form that captures the young driver's key requirements. Includes some logic eg if they select 'colour' as an important features there's a future question that asks what colours they like.

##Landing page structure:
Hero: H1 "Making first cars happen", subtitle "Answer a few questions and we’ll match you with a car that fits your criteria from a trusted dealer. Fast and easy.", CTA to form.
Sections: How it works (3 stages), trust logo, CTA to form, FAQs then basic footer.

##Form Handling

##HTML Form Structure (in get-matched.html):
 Meta Pixel Code and Google Analytics & Ads.
 Header is white with the Carbi logo on the left hand side (an SVG with a winking animation). We have a BETA logo on the right.
 The progressive disclosure form has up to 10 steps. Progress is saved to local storage then submitted to supabase at the end.
 There's a basic black footer.

JS Submission Logic is in submit-match.js using a REST API


##Styling Guidelines
CSS Framework: None (vanilla); responsive with media queries.
Theme: Modern, clean—primary colours: primary blue #0EA5E9, dark blue #1E40AF, dark text #0F172A, gray text #64748B#007BFF (blue), fonts: System sans-serif.



##Database Schema:
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.analytics_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  event_type text NOT NULL,
  page_path text,
  session_id text,
  user_agent text,
  referrer text,
  metadata jsonb,
  CONSTRAINT analytics_events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.match_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  important_features ARRAY,
  dealbreakers ARRAY,
  budget_min integer CHECK (budget_min >= 1000 AND budget_min <= 20000),
  budget_max integer CHECK (budget_max >= 1000 AND budget_max <= 20000),
  brand_preference text CHECK (brand_preference = ANY (ARRAY['dont_mind'::text, 'specific'::text])),
  selected_brands ARRAY,
  favourite_brand text,
  preferred_colours ARRAY,
  max_mileage integer,
  search_radius integer CHECK (search_radius >= 10 AND search_radius <= 400),
  postcode text NOT NULL,
  additional_notes text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  contact_preferences ARRAY NOT NULL,
  status text DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'first_email_sent'::text, 'car_found'::text, 'dealer_contacted'::text, 'customer_matched'::text, 'followed_up'::text, 'test_data'::text])),
  admin_notes text,
  custom_colour text,
  location_coords jsonb,
  main_driver_type text CHECK (main_driver_type = ANY (ARRAY['young_driver'::text, 'older_driver'::text, 'not_sure'::text])),
  transmission_type text CHECK (transmission_type IS NULL OR (transmission_type = ANY (ARRAY['manual'::text, 'automatic'::text, 'dont_mind'::text]))),
  engine_size_min numeric,
  engine_size_max numeric,
  number_of_doors ARRAY,
  source text DEFAULT 'production'::text,
  payment_status text DEFAULT 'pending'::text CHECK (payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'refunded'::text, 'failed'::text])),
  payment_intent_id text,
  stripe_session_id text,
  payment_amount integer DEFAULT 4900,
  payment_currency text DEFAULT 'gbp'::text,
  paid_at timestamp with time zone,
  refunded_at timestamp with time zone,
  refund_reason text,
  CONSTRAINT match_requests_pkey PRIMARY KEY (id)
);

#Status, Checkpoints & Decisions

##Current Status: 
9th December: I've decided to pivot. Rather than have ads going to a form and asking customers to pay me to find their car as a 'one and done', I want to make it more of a tiered email based offering. The issue being timing. If I simply serve ads to get people to fill in my form and pay for finding a car, the chance of finding people who want to buy a car right away is small. Instead I'm going to have ads go to my form and offer a tiered service based around emails - the free one gives them useful content and maybe a car per week, the mid tier offers them more regular updates and the top tier offers real time updates as soon as a car in their criteria comes available. I build up a database of cars by scraping dealer websites. Longer term, charge dealers for this. This new setup is more complex so I'm going to implement a more robust tech setup with Claude Code and Cursor or something equivalent. On the ads side of things I'm going to switch to use the advantage+ and create loads of creative varients using Nanobanana and Veo3. This approach can become scalable for any vehicle niche. 

Milestone 1 (Done): Interview young drivers, their parents and car dealers. Outcome: Validated that it's complicated for young drivers to find, buy and insure their first car. Dealers don't have an issue selling to this demographic - their issues are finding good stock and paying autotrader many thousands per month. There are 2 main car buying categories 1) The young driver will be insured as the main driver - this restricts cars to insurance group 10 and under and 2) The young driver will be a named driver on a family car that's shared with other family members - this restricts cars to around insurance group 16 and under.
Milestone 2 (Done): Publish a blog article with lead magnets. The article reviews low insurance group cars and explains insurance for young drivers. It links to 3 lead magnets - a budget calculator spreadsheet, car viewing checklist and insurance quote comparison spreadsheet. Kit is setup to capture email addresses from the lead magnets.
Milestone 3 (Done) Build a landing page, requirements capture form and database with email notifications. 
Milestone 4 (Done): Publish to Carbi.co
Milestone 5 (Done): Update google analytics to include the landing page to the end of the form
Milestone 6 (Done): Run a facebook marketing campaign for 10 days to validate that this demographic can be targeted. I reached 12k accounts, 28k impressions 381 landing page views at a cost per click of £0.25. 
Milestone 7 (Done): Share with friends and family to test for a few days
Milestone 8 (Done): Address improvements from the feedback
Milestone 9: (Done): Build a simple admin view to see submissions and update status as I find a look for a match, reach out the dealer, connect the dealer and customer.
Milestone 10: (Done): Launch a Beta Facbeook campaign and test for real with real customers.
Milestone 11: (Paused) Run a live pilot with manual fulfilment
Milestone 12: (Done) Gather feedback from participants
Milestone 13: (Paused) Build monetisation via Stripe for car finders.
Milestone 14: (Not started) Design a robust tech setup.
Milestone 15: (Not started) Implement a robust tech setup.

Learnings so far from the Facebook ads:
1. Edinburgh and surrounding region isn't enough. Nationwide yields up to 8 leads per day targeting women only.
2. There are 2 main types of car dealers: sketchy sounding for the lower end where you speak to the actual dealer and larger dealers that have call centres and sales teams. Some smaller dealers are very customer oriented and keen to work with me.
3. This appeals more to women. It makes sense - generally guys know about cars and can navigate autotrader.
4. I can get leads to the free service at about £3.50 per click.

Next steps: Get a new more robust vibe coding tech setup.

Other tasks to do: Come up with a socials and content strategy. Could be blogs and emails, YouTube, Instagram, TikTok, Facebook etc.
