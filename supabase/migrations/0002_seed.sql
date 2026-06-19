-- Seed data for the Aitroneecs storefront.
-- Safe to re-run: upserts on primary key / unique slug.

-- Categories ---------------------------------------------------
insert into categories (id, slug, name, tagline, description, image_url, sort_order) values
  ('c-audio','audio','Audio','Sound, perfected','Reference-grade headphones, earbuds and speakers tuned for clarity, depth and silence.','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',1),
  ('c-wearables','wearables','Wearables','Worn intelligence','Smartwatches and trackers crafted from premium materials with AI-assisted health insight.','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',2),
  ('c-smart-home','smart-home','Smart Home','A home that thinks','Ambient devices that quietly orchestrate light, sound and security around your life.','https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',3),
  ('c-power','power','Power & Charging','Endless energy','Fast, elegant power banks and chargers engineered to keep everything you own alive.','https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=80',4),
  ('c-accessories','accessories','Accessories','The finishing details','The cables, stands and cases that complete the experience — designed, not afterthoughts.','https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=80',5)
on conflict (id) do update set
  name = excluded.name, tagline = excluded.tagline, description = excluded.description,
  image_url = excluded.image_url, sort_order = excluded.sort_order;

-- Products -----------------------------------------------------
insert into products (id, slug, name, tagline, description, price, compare_at_price, category_id, featured, stock, rating, reviews, badge, highlights, specs, options) values
  ('p-aura-headphones','aura-over-ear-headphones','Aura Over-Ear Headphones','Adaptive noise cancellation, 40-hour battery','Machined aluminium and lambskin meet a custom 40mm driver. Aura reads your environment 200 times a second and dissolves the world around you.',24990,29990,'c-audio',true,24,4.8,412,'Bestseller',
    '["Adaptive hybrid noise cancellation","40-hour battery, 5-min quick charge","Lossless 24-bit wireless audio","Memory-foam lambskin cushions"]',
    '[{"label":"Driver","value":"40mm custom dynamic"},{"label":"Battery","value":"40 hours (ANC on)"},{"label":"Connectivity","value":"Bluetooth 5.4, USB-C, 3.5mm"},{"label":"Weight","value":"268 g"}]',
    '[{"name":"Finish","values":["Graphite","Porcelain","Midnight"]}]'),
  ('p-pulse-earbuds','pulse-pro-earbuds','Pulse Pro Earbuds','Tiny. Powerful. Disappearing.','Six microphones, spatial audio and a case that charges in fifteen minutes. Pulse Pro vanishes in the ear and reappears only as sound.',12990,null,'c-audio',true,60,4.7,980,null,
    '["Spatial audio with head tracking","6-mic adaptive call clarity","30-hour total battery with case","IPX5 sweat & water resistant"]',
    '[{"label":"Driver","value":"11mm dynamic"},{"label":"Battery","value":"8h buds / 30h case"},{"label":"Connectivity","value":"Bluetooth 5.4"},{"label":"Water rating","value":"IPX5"}]',
    '[{"name":"Finish","values":["Graphite","Porcelain"]}]'),
  ('p-resonance-speaker','resonance-360-speaker','Resonance 360 Speaker','Room-filling sound from a single sculpture','A 360° array hidden inside hand-finished oak and aluminium. Resonance maps your room and tunes itself.',18990,null,'c-audio',false,18,4.6,221,null,
    '["True 360° directional sound","Automatic room calibration","Multi-room sync up to 8 units","Hand-finished oak enclosure"]',
    '[{"label":"Output","value":"120W peak"},{"label":"Drivers","value":"3 tweeters, 1 woofer"},{"label":"Connectivity","value":"Wi-Fi, Bluetooth, AirPlay"},{"label":"Material","value":"Oak + anodised aluminium"}]',
    null),
  ('p-vertex-watch','vertex-smartwatch','Vertex Smartwatch','Titanium. Sapphire. Always-on intelligence.','A grade-5 titanium case under sapphire glass. Vertex tracks 120 workouts and lasts a week between charges.',32990,36990,'c-wearables',true,30,4.9,654,'New',
    '["Grade-5 titanium, sapphire crystal","7-day battery life","ECG, SpO₂ and recovery tracking","Built-in dual-band GPS"]',
    '[{"label":"Case","value":"Grade-5 titanium, 44mm"},{"label":"Display","value":"AMOLED always-on"},{"label":"Battery","value":"Up to 7 days"},{"label":"Water rating","value":"10 ATM"}]',
    '[{"name":"Band","values":["Sport","Milanese","Leather"]}]'),
  ('p-trace-band','trace-fitness-band','Trace Fitness Band','Featherweight health, all day and night','At 19 grams, Trace disappears on the wrist while reading your heart, sleep and stress.',6990,null,'c-wearables',false,80,4.5,1203,null,
    '["14-day battery life","Continuous heart-rate & sleep","Stress & breathing coaching","5 ATM water resistance"]',
    '[{"label":"Display","value":"1.1\" AMOLED"},{"label":"Battery","value":"Up to 14 days"},{"label":"Weight","value":"19 g"},{"label":"Water rating","value":"5 ATM"}]',
    null),
  ('p-halo-hub','halo-smart-hub','Halo Smart Hub','The quiet brain of your home','Halo unifies every device in your home behind one calm interface and an on-device AI.',14990,null,'c-smart-home',true,40,4.6,318,null,
    '["On-device private AI assistant","Matter, Zigbee & Thread built-in","Far-field 6-mic array","Works with 50,000+ devices"]',
    '[{"label":"Radios","value":"Wi-Fi 6E, Thread, Zigbee"},{"label":"Processor","value":"Neural edge SoC"},{"label":"Audio","value":"Full-range speaker"},{"label":"Privacy","value":"Local-first processing"}]',
    null),
  ('p-lumen-light','lumen-ambient-light','Lumen Ambient Light','16 million colours, one perfect mood','A frosted glass column that paints your room in light. Lumen wakes you with sunrise.',8990,null,'c-smart-home',false,55,4.4,176,null,
    '["16M colours, tunable white","Circadian sunrise & sunset","Music-reactive lighting","Hand-blown frosted glass"]',
    '[{"label":"Brightness","value":"1100 lumens"},{"label":"Colour","value":"RGBWW, 1800–6500K"},{"label":"Control","value":"App, voice, touch"},{"label":"Material","value":"Frosted glass + aluminium"}]',
    null),
  ('p-volt-powerbank','volt-100w-power-bank','Volt 100W Power Bank','Charge a laptop. Twice.','A 24,000mAh reserve in a slab of anodised aluminium. Volt pushes 100W over USB-C.',9990,11990,'c-power',true,70,4.7,540,'Bestseller',
    '["24,000mAh, 100W USB-C output","Charges a laptop in under an hour","3 devices simultaneously","Aircraft-grade aluminium body"]',
    '[{"label":"Capacity","value":"24,000 mAh"},{"label":"Output","value":"100W USB-C PD"},{"label":"Ports","value":"2× USB-C, 1× USB-A"},{"label":"Weight","value":"430 g"}]',
    null),
  ('p-flux-charger','flux-3-in-1-charger','Flux 3-in-1 Charger','One pad. Your whole desk.','A leather-topped magnetic pad that charges your phone, watch and earbuds at full speed.',7490,null,'c-power',false,90,4.5,289,null,
    '["15W magnetic fast charging","Charges phone, watch & buds","Full-grain leather surface","Folds flat for travel"]',
    '[{"label":"Output","value":"15W + 5W + 5W"},{"label":"Standard","value":"Qi2 magnetic"},{"label":"Material","value":"Leather + aluminium"},{"label":"Cable","value":"USB-C, 1.5m braided"}]',
    null),
  ('p-cord-cable','cord-braided-usb-c-cable','Cord Braided USB-C Cable','240W, and it will outlive your devices','Aramid-fibre core, braided nylon jacket and milled aluminium ends rated for 35,000 bends.',1490,null,'c-accessories',false,200,4.8,1876,null,
    '["240W power & 40Gbps data","35,000-bend tested","Aramid-fibre reinforced core","Milled aluminium connectors"]',
    '[{"label":"Power","value":"240W USB-C PD"},{"label":"Data","value":"USB4, 40 Gbps"},{"label":"Length","value":"2 m"},{"label":"Jacket","value":"Braided nylon"}]',
    '[{"name":"Length","values":["1 m","2 m"]}]'),
  ('p-stand-dock','stand-aluminium-laptop-dock','Stand Aluminium Laptop Dock','Lift your screen, lift your posture','A single billet of aluminium that raises any laptop to eye level and stays exactly where you put it.',4990,null,'c-accessories',false,65,4.6,410,null,
    '["Single-billet aluminium","Adjustable height & angle","Silicone-lined, scratch-free","Holds up to 18\" laptops"]',
    '[{"label":"Material","value":"CNC aluminium"},{"label":"Height","value":"Adjustable 11–20 cm"},{"label":"Capacity","value":"Up to 5 kg"},{"label":"Finish","value":"Anodised"}]',
    null),
  ('p-shield-case','shield-phone-case','Shield Phone Case','Invisible protection, magnetic everything','Aramid fibre thin as card, strong as armour. Shield adds magnetic mounting and 3-metre drop protection.',2490,null,'c-accessories',false,150,4.5,733,null,
    '["Real aramid-fibre weave","3-metre drop protection","Built-in magnetic array","Just 1.5mm thin"]',
    '[{"label":"Material","value":"Aramid fibre"},{"label":"Protection","value":"3 m drop tested"},{"label":"Magnets","value":"Qi2 / MagSafe compatible"},{"label":"Thickness","value":"1.5 mm"}]',
    null)
on conflict (id) do update set
  name = excluded.name, price = excluded.price, compare_at_price = excluded.compare_at_price,
  featured = excluded.featured, stock = excluded.stock, highlights = excluded.highlights,
  specs = excluded.specs, options = excluded.options;

-- Product images ----------------------------------------------
delete from product_images;
insert into product_images (product_id, url, alt, sort_order) values
  ('p-aura-headphones','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80','Aura headphones front',0),
  ('p-aura-headphones','https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=80','Aura headphones detail',1),
  ('p-aura-headphones','https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=80','Aura headphones on stand',2),
  ('p-pulse-earbuds','https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1400&q=80','Pulse Pro earbuds case',0),
  ('p-pulse-earbuds','https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=80','Pulse Pro earbuds detail',1),
  ('p-resonance-speaker','https://images.unsplash.com/photo-1558537348-c0f8e733989d?auto=format&fit=crop&w=1400&q=80','Resonance speaker',0),
  ('p-resonance-speaker','https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1400&q=80','Resonance speaker detail',1),
  ('p-vertex-watch','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80','Vertex smartwatch',0),
  ('p-vertex-watch','https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1400&q=80','Vertex smartwatch on wrist',1),
  ('p-trace-band','https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=1400&q=80','Trace fitness band',0),
  ('p-trace-band','https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1400&q=80','Trace band detail',1),
  ('p-halo-hub','https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80','Halo smart hub',0),
  ('p-halo-hub','https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=80','Halo hub in room',1),
  ('p-lumen-light','https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1400&q=80','Lumen ambient light',0),
  ('p-lumen-light','https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1400&q=80','Lumen light glowing',1),
  ('p-volt-powerbank','https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1400&q=80','Volt power bank',0),
  ('p-volt-powerbank','https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1400&q=80','Volt power bank detail',1),
  ('p-flux-charger','https://images.unsplash.com/photo-1591290619762-f9c1c2c2f0a4?auto=format&fit=crop&w=1400&q=80','Flux charger',0),
  ('p-flux-charger','https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=1400&q=80','Flux charger detail',1),
  ('p-cord-cable','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80','Cord braided cable',0),
  ('p-cord-cable','https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1400&q=80','Cord cable detail',1),
  ('p-stand-dock','https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1400&q=80','Aluminium laptop stand',0),
  ('p-stand-dock','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80','Laptop on stand',1),
  ('p-shield-case','https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1400&q=80','Shield phone case',0),
  ('p-shield-case','https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=1400&q=80','Shield case detail',1);
