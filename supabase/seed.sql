-- Tinas Stad realistic Swedish seed data.
-- Safe to run multiple times: all seed-owned rows use deterministic UUIDs.
-- Paste into Supabase SQL Editor or run with Supabase CLI.

begin;

-- Customers
with raw(seed_key, name, email, phone, address, notes, created_days_ago) as (
  values
    ('customer:anna-lindqvist', 'Anna Lindqvist', 'anna.lindqvist@telia.se', '+46 70 412 88 21', 'Slogvägen 14, Åtvidaberg', 'Varannan vecka. Katt i hemmet, använd parfymfritt.', 160),
    ('customer:erik-sundstrom', 'Erik Sundström', 'erik.sundstrom@gmail.com', '+46 73 221 09 44', 'Bruksvägen 3B, Åtvidaberg', 'Flyttstädning genomförd, kan återkomma för fönsterputs.', 35),
    ('customer:johanna-pettersson', 'Johanna Pettersson', 'johanna.pettersson@hotmail.com', '+46 70 998 14 02', 'Storgatan 47, Solna', 'Vill ha fast torsdagstid och samma personal.', 90),
    ('customer:familjen-holm', 'Familjen Holm', 'familjen.holm@outlook.com', '+46 70 333 44 55', 'Lindvägen 22, Sundbyberg', 'Två barn, extra fokus på kök och hall.', 210),
    ('customer:karin-holm', 'Karin Holm', 'karin.holm@telia.se', '+46 70 882 33 04', 'Skogsvägen 18, Åtvidaberg', 'Pensionär. Föredrar förmiddagar. Nyckel i tubsystem.', 420),
    ('customer:maria-eklund', 'Maria Eklund', 'maria.eklund@bredband.net', '+46 70 223 14 56', 'Parkvägen 11, Åtvidaberg', 'Allergisk mot starka dofter, endast parfymfria medel.', 130),
    ('customer:oskar-wallin', 'Wallin Redovisning AB', 'oskar.wallin@wallinredovisning.se', '+46 73 451 78 09', 'Stationsgatan 17, Åtvidaberg', 'Kontorsstädning kvällstid. Larmkod skickas via SMS.', 75),
    ('customer:sofia-bergman', 'Sofia Bergman', 'sofia.bergman@yahoo.se', '+46 70 554 22 19', 'Kyrkogatan 5, Åtvidaberg', 'Fönsterputs vår och höst. Altandörr ingår.', 300),
    ('customer:lina-hagstrom', 'Lina Hagström', 'lina.hagstrom@gmail.com', '+46 76 558 11 23', 'Sjöviken 8, Stockholm', 'Hund i hemmet. Lugn, men ska inte släppas ut.', 250),
    ('customer:atvidabergs-bygg', 'Åtvidabergs Bygg AB', 'info@atvidabergsbygg.se', '+46 13 778 41 00', 'Industrigatan 9, Åtvidaberg', 'Bygg- och kontorsstädning efter projekt. Faktureras månadsvis.', 500)
),
data as (
  select
    (substr(md5(seed_key), 1, 8) || '-' || substr(md5(seed_key), 9, 4) || '-' || substr(md5(seed_key), 13, 4) || '-' || substr(md5(seed_key), 17, 4) || '-' || substr(md5(seed_key), 21, 12))::uuid as id,
    name,
    email,
    phone,
    address,
    notes,
    now() - make_interval(days => created_days_ago) as created_at,
    now() as updated_at
  from raw
)
insert into public.customers (id, name, email, phone, address, notes, created_at, updated_at)
select id, name, email, phone, address, notes, created_at, updated_at
from data
on conflict (id) do update set
  name = excluded.name,
  email = excluded.email,
  phone = excluded.phone,
  address = excluded.address,
  notes = excluded.notes,
  updated_at = excluded.updated_at,
  deleted_at = null;

-- Leads
with raw(seed_key, name, email, phone, address, service, property_size, message, status, received_days_ago, received_time) as (
  values
    ('lead:anna-lindqvist', 'Anna Lindqvist', 'anna.lindqvist@telia.se', '+46 70 412 88 21', 'Slogvägen 14, Åtvidaberg', 'Hemstädning', '78 kvm', 'Vi är två vuxna och en katt och söker hemstädning varannan vecka. Kan ni komma på visning först?', 'new', 0, time '08:12'),
    ('lead:erik-sundstrom', 'Erik Sundström', 'erik.sundstrom@gmail.com', '+46 73 221 09 44', 'Bruksvägen 3B, Åtvidaberg', 'Flyttstädning', '112 kvm', 'Flyttar nästa fredag och behöver godkänd flyttstädning inklusive fönster och balkong.', 'new', 0, time '10:41'),
    ('lead:johanna-pettersson', 'Johanna Pettersson', 'johanna.pettersson@hotmail.com', '+46 70 998 14 02', 'Storgatan 47, Solna', 'Veckostädning', '92 kvm', 'Önskar fast tid varje torsdag förmiddag. Två badrum och öppen planlösning.', 'contacted', 1, time '14:05'),
    ('lead:mikael-andersson', 'Mikael Andersson', 'mikael.andersson@outlook.com', '+46 76 332 17 88', 'Tallvägen 9, Sundbyberg', 'Storstädning', '145 kvm', 'Hela huset behöver storstädning innan släktbesök. Extra fokus på kök och badrum.', 'quote_sent', 2, time '09:22'),
    ('lead:sofia-bergman', 'Sofia Bergman', 'sofia.bergman@yahoo.se', '+46 70 554 22 19', 'Kyrkogatan 5, Åtvidaberg', 'Fönsterputs', 'Villa, 14 fönster', 'Putsning ute och inne, gärna inom två veckor. Altandörr och glasräcke ingår.', 'won', 3, time '11:30'),
    ('lead:lars-nyberg', 'Lars Nyberg', 'lars.nyberg@nybergkontor.se', '+46 73 110 87 65', 'Industrigatan 22, Åtvidaberg', 'Kontorsstädning', 'Kontor 210 kvm', 'Vi söker städning två gånger i veckan efter stängning. Offert tack.', 'quote_sent', 4, time '13:12'),
    ('lead:karin-holm', 'Karin Holm', 'karin.holm@telia.se', '+46 70 882 33 04', 'Skogsvägen 18, Åtvidaberg', 'Månadsstädning', '65 kvm', 'Pensionär, behöver hjälp en gång i månaden med badrum, kök och golv.', 'won', 5, time '09:05'),
    ('lead:henrik-olsson', 'Henrik Olsson', 'h.olsson@gmail.com', '+46 76 441 90 12', 'Lindvägen 7, Stockholm', 'Flyttstädning', '58 kvm lägenhet', 'Behöver snabb flyttstädning och kvitto till hyresvärden.', 'lost', 6, time '17:22'),
    ('lead:maria-eklund', 'Maria Eklund', 'maria.eklund@bredband.net', '+46 70 223 14 56', 'Parkvägen 11, Åtvidaberg', 'Hemstädning', '85 kvm', 'Vill prova en gång först och sedan eventuellt boka varannan vecka.', 'won', 7, time '10:10'),
    ('lead:peter-lundgren', 'Peter Lundgren', 'peter.lundgren@telia.se', '+46 73 887 21 03', 'Bygatan 4, Solna', 'Veckostädning', '108 kvm', 'Familj med tre barn, behöver hjälp varje vecka med städ och tvätt av golv.', 'contacted', 8, time '08:45'),
    ('lead:emma-forsberg', 'Emma Forsberg', 'emma.forsberg@gmail.com', '+46 70 119 56 88', 'Östra Långgatan 22, Sundbyberg', 'Storstädning', '70 kvm', 'Inför inflyttning vill jag ha allt ordentligt rengjort, särskilt köksskåp.', 'won', 10, time '12:00'),
    ('lead:daniel-strand', 'Daniel Strand', 'daniel.strand@hotmail.se', '+46 76 334 90 11', 'Hagvägen 9, Åtvidaberg', 'Fönsterputs', 'Villa, 18 fönster', 'Höstputs av samtliga fönster, gärna en fredag i oktober.', 'lost', 12, time '15:00'),
    ('lead:ingrid-sjoberg', 'Ingrid Sjöberg', 'ingrid.sjoberg@telia.se', '+46 70 998 22 41', 'Norra vägen 5, Åtvidaberg', 'Månadsstädning', '72 kvm', 'Söker långsiktig hjälp. Har svårt med dammsugning och våttorkning.', 'won', 15, time '09:30'),
    ('lead:oskar-wallin', 'Oskar Wallin', 'oskar.wallin@wallinredovisning.se', '+46 73 451 78 09', 'Stationsgatan 17, Åtvidaberg', 'Kontorsstädning', 'Kontor 90 kvm', 'Liten redovisningsbyrå som behöver städning en kväll i veckan.', 'won', 18, time '14:22'),
    ('lead:malin-ek', 'Malin Ek', 'malin.ek@outlook.com', '+46 70 614 02 91', 'Sveavägen 122, Stockholm', 'Hemstädning', '64 kvm', 'Nyinflyttad och vill boka återkommande städning. Gärna tisdagar.', 'new', 0, time '16:18')
),
data as (
  select
    (substr(md5(seed_key), 1, 8) || '-' || substr(md5(seed_key), 9, 4) || '-' || substr(md5(seed_key), 13, 4) || '-' || substr(md5(seed_key), 17, 4) || '-' || substr(md5(seed_key), 21, 12))::uuid as id,
    name,
    email,
    phone,
    address,
    service,
    property_size,
    message,
    status,
    (current_date - received_days_ago + received_time)::timestamptz as received_at,
    now() as updated_at
  from raw
)
insert into public.leads (id, name, email, phone, address, service, property_size, message, status, received_at, created_at, updated_at)
select id, name, email, phone, address, service, property_size, message, status, received_at, received_at, updated_at
from data
on conflict (id) do update set
  name = excluded.name,
  email = excluded.email,
  phone = excluded.phone,
  address = excluded.address,
  service = excluded.service,
  property_size = excluded.property_size,
  message = excluded.message,
  status = excluded.status,
  received_at = excluded.received_at,
  updated_at = excluded.updated_at,
  deleted_at = null;

-- Staff
with raw(seed_key, name, email, phone, role, color) as (
  values
    ('staff:tina-karlsson', 'Tina Karlsson', 'tina@tinasstad.se', '+46 70 123 45 67', 'manager', '#1F4ED8'),
    ('staff:emma-andersson', 'Emma Andersson', 'emma@tinasstad.se', '+46 70 234 56 78', 'cleaner', '#0891B2'),
    ('staff:sara-nilsson', 'Sara Nilsson', 'sara@tinasstad.se', '+46 70 345 67 89', 'cleaner', '#9333EA'),
    ('staff:maria-johansson', 'Maria Johansson', 'maria@tinasstad.se', '+46 70 456 78 90', 'cleaner', '#059669'),
    ('staff:lina-eriksson', 'Lina Eriksson', 'lina@tinasstad.se', '+46 70 567 89 01', 'cleaner', '#D97706')
),
data as (
  select
    (substr(md5(seed_key), 1, 8) || '-' || substr(md5(seed_key), 9, 4) || '-' || substr(md5(seed_key), 13, 4) || '-' || substr(md5(seed_key), 17, 4) || '-' || substr(md5(seed_key), 21, 12))::uuid as id,
    name,
    email,
    phone,
    role,
    color
  from raw
)
insert into public.staff (id, name, email, phone, role, color, status, created_at, updated_at)
select id, name, email, phone, role, color, 'active', now(), now()
from data
on conflict (id) do update set
  name = excluded.name,
  email = excluded.email,
  phone = excluded.phone,
  role = excluded.role,
  color = excluded.color,
  status = excluded.status,
  updated_at = excluded.updated_at,
  deleted_at = null;

-- Checklist templates. Existing templates with the same service are reused to avoid duplicates.
with raw(seed_key, service, title) as (
  values
    ('template:hemstadning', 'Hemstädning', 'Hemstädning'),
    ('template:flyttstadning', 'Flyttstädning', 'Flyttstädning'),
    ('template:fonsterputs', 'Fönsterputs', 'Fönsterputs'),
    ('template:kontorsstadning', 'Kontorsstädning', 'Kontorsstädning'),
    ('template:storstadning', 'Storstädning', 'Storstädning')
),
data as (
  select
    (substr(md5(seed_key), 1, 8) || '-' || substr(md5(seed_key), 9, 4) || '-' || substr(md5(seed_key), 13, 4) || '-' || substr(md5(seed_key), 17, 4) || '-' || substr(md5(seed_key), 21, 12))::uuid as id,
    service,
    title
  from raw
)
insert into public.checklist_templates (id, service, title, created_at, updated_at)
select id, service, title, now(), now()
from data
where not exists (
  select 1 from public.checklist_templates existing
  where existing.service = data.service
)
on conflict (id) do update set
  service = excluded.service,
  title = excluded.title,
  updated_at = excluded.updated_at;

-- Checklist template items
with raw(service, sort_order, label) as (
  values
    ('Hemstädning', 1, 'Dammsuga alla rum'),
    ('Hemstädning', 2, 'Våttorka golv'),
    ('Hemstädning', 3, 'Torka av köksytor och spis'),
    ('Hemstädning', 4, 'Rengöra diskho och blandare'),
    ('Hemstädning', 5, 'Rengöra badrum och toalett'),
    ('Hemstädning', 6, 'Tömma papperskorgar'),
    ('Hemstädning', 7, 'Damma fria ytor'),
    ('Hemstädning', 8, 'Slutkontroll innan avfärd'),
    ('Flyttstädning', 1, 'Rengöra kyl och frys invändigt'),
    ('Flyttstädning', 2, 'Rengöra ugn, plåtar och galler'),
    ('Flyttstädning', 3, 'Rengöra köksfläkt och filter'),
    ('Flyttstädning', 4, 'Torka ur skåp och lådor'),
    ('Flyttstädning', 5, 'Putsa fönster in- och utvändigt'),
    ('Flyttstädning', 6, 'Skura badrum och toalett grundligt'),
    ('Flyttstädning', 7, 'Damma lister, dörrar och element'),
    ('Flyttstädning', 8, 'Dammsuga och våttorka alla golv'),
    ('Flyttstädning', 9, 'Slutkontroll mot flyttstädsgaranti'),
    ('Fönsterputs', 1, 'Putsa rutor utvändigt'),
    ('Fönsterputs', 2, 'Putsa rutor invändigt'),
    ('Fönsterputs', 3, 'Torka karmar och bågar'),
    ('Fönsterputs', 4, 'Putsa altandörrar och glaspartier'),
    ('Fönsterputs', 5, 'Torka fönsterbrädor'),
    ('Fönsterputs', 6, 'Slutkontroll mot motljus'),
    ('Kontorsstädning', 1, 'Tömma papperskorgar'),
    ('Kontorsstädning', 2, 'Torka skrivbord och bordsytor'),
    ('Kontorsstädning', 3, 'Dammsuga mattor och golv'),
    ('Kontorsstädning', 4, 'Våttorka hårda golv'),
    ('Kontorsstädning', 5, 'Rengöra pentry och kaffemaskin'),
    ('Kontorsstädning', 6, 'Rengöra toaletter'),
    ('Kontorsstädning', 7, 'Fylla på toapapper och tvål'),
    ('Kontorsstädning', 8, 'Slutkontroll av mötesrum'),
    ('Storstädning', 1, 'Dammtorka över skåp och hyllor'),
    ('Storstädning', 2, 'Damma tavlor, lampor och lister'),
    ('Storstädning', 3, 'Torka dörrar och handtag'),
    ('Storstädning', 4, 'Rengöra fönsterkarmar'),
    ('Storstädning', 5, 'Skura badrum grundligt'),
    ('Storstädning', 6, 'Polera kranar och beslag'),
    ('Storstädning', 7, 'Rengöra bakom lättflyttade möbler'),
    ('Storstädning', 8, 'Dammsuga och våttorka golv'),
    ('Storstädning', 9, 'Slutkontroll innan avfärd')
),
template_pick as (
  select distinct on (service) id, service
  from public.checklist_templates
  where service in ('Hemstädning', 'Flyttstädning', 'Fönsterputs', 'Kontorsstädning', 'Storstädning')
  order by service, created_at, id
),
data as (
  select
    (substr(md5('template-item:' || raw.service || ':' || raw.sort_order), 1, 8) || '-' || substr(md5('template-item:' || raw.service || ':' || raw.sort_order), 9, 4) || '-' || substr(md5('template-item:' || raw.service || ':' || raw.sort_order), 13, 4) || '-' || substr(md5('template-item:' || raw.service || ':' || raw.sort_order), 17, 4) || '-' || substr(md5('template-item:' || raw.service || ':' || raw.sort_order), 21, 12))::uuid as id,
    template_pick.id as template_id,
    raw.label,
    raw.sort_order
  from raw
  join template_pick on template_pick.service = raw.service
)
insert into public.checklist_template_items (id, template_id, label, sort_order)
select id, template_id, label, sort_order
from data
on conflict (id) do update set
  template_id = excluded.template_id,
  label = excluded.label,
  sort_order = excluded.sort_order;

-- Bookings across current week and next week.
with week_anchor as (
  select date_trunc('week', current_date)::date as week_start
),
raw(seed_key, customer_key, service, day_offset, start_time, duration_min, status, notes) as (
  values
    ('booking:001', 'customer:maria-eklund', 'Hemstädning', 0, time '08:00', 120, 'completed', 'Parfymfria medel. Extra noggrant i badrum.'),
    ('booking:002', 'customer:oskar-wallin', 'Kontorsstädning', 0, time '17:30', 90, 'completed', 'Kvällsstädning efter stängning. Larmkod via SMS.'),
    ('booking:003', 'customer:anna-lindqvist', 'Hemstädning', 1, time '08:30', 120, 'completed', 'Katt i hemmet. Dammsug soffa med munstycke.'),
    ('booking:004', 'customer:familjen-holm', 'Flyttstädning', 1, time '09:00', 300, 'in_progress', 'Besiktning på eftermiddagen. Balkong ska torkas av.'),
    ('booking:005', 'customer:sofia-bergman', 'Fönsterputs', 1, time '13:30', 150, 'scheduled', '14 fönster och altandörr. Stege finns på plats.'),
    ('booking:006', 'customer:johanna-pettersson', 'Veckostädning', 2, time '09:00', 120, 'scheduled', 'Fast torsdagstid. Fokus på kök och två badrum.'),
    ('booking:007', 'customer:lina-hagstrom', 'Storstädning', 2, time '12:30', 240, 'cancelled', 'Kund ombokar på grund av sjukdom.'),
    ('booking:008', 'customer:karin-holm', 'Månadsstädning', 3, time '10:00', 120, 'scheduled', 'Förmiddag. Nyckel i tubsystemet.'),
    ('booking:009', 'customer:atvidabergs-bygg', 'Kontorsstädning', 3, time '17:00', 180, 'scheduled', 'Efter projektmöte, extra mycket golvdamm.'),
    ('booking:010', 'customer:erik-sundstrom', 'Flyttstädning', 4, time '08:00', 300, 'scheduled', 'Flyttstäd inklusive fönster och balkong.'),
    ('booking:011', 'customer:anna-lindqvist', 'Hemstädning', 4, time '13:00', 120, 'scheduled', 'Återkommande städ. Byt soppåse i badrum.'),
    ('booking:012', 'customer:oskar-wallin', 'Kontorsstädning', 5, time '16:00', 90, 'scheduled', 'Kontor, pentry och toalett.'),
    ('booking:013', 'customer:familjen-holm', 'Hemstädning', 5, time '09:30', 150, 'scheduled', 'Familj med barn, hall och kök prioriteras.'),
    ('booking:014', 'customer:sofia-bergman', 'Fönsterputs', 6, time '10:00', 180, 'scheduled', 'Ute och inne. Glasräcke vid altan.'),
    ('booking:015', 'customer:karin-holm', 'Månadsstädning', 6, time '13:00', 120, 'scheduled', 'Kund vill ha samma personal som senast.'),
    ('booking:016', 'customer:johanna-pettersson', 'Veckostädning', 7, time '08:30', 120, 'scheduled', 'Återkommande veckostädning.'),
    ('booking:017', 'customer:maria-eklund', 'Hemstädning', 7, time '12:00', 150, 'scheduled', 'Parfymfritt och extra damning i sovrum.'),
    ('booking:018', 'customer:atvidabergs-bygg', 'Kontorsstädning', 8, time '17:30', 180, 'scheduled', 'Faktureras månadsvis.'),
    ('booking:019', 'customer:lina-hagstrom', 'Veckostädning', 8, time '09:00', 120, 'scheduled', 'Hund hemma, ring före ankomst.'),
    ('booking:020', 'customer:karin-holm', 'Hemstädning', 9, time '10:00', 120, 'scheduled', 'Dammsug noggrant runt fåtöljen.'),
    ('booking:021', 'customer:erik-sundstrom', 'Fönsterputs', 9, time '13:00', 150, 'scheduled', 'Lägenhet med inglasad balkong.'),
    ('booking:022', 'customer:familjen-holm', 'Storstädning', 10, time '08:00', 240, 'scheduled', 'Inför kalas. Extra fokus på kök och badrum.'),
    ('booking:023', 'customer:oskar-wallin', 'Kontorsstädning', 10, time '18:00', 90, 'scheduled', 'Sopa entré och fyll på tvål.'),
    ('booking:024', 'customer:anna-lindqvist', 'Hemstädning', 11, time '08:30', 120, 'scheduled', 'Återkommande städning varannan vecka.'),
    ('booking:025', 'customer:sofia-bergman', 'Storstädning', 12, time '09:00', 240, 'scheduled', 'Grundlig städning efter renovering i kök.')
),
data as (
  select
    (substr(md5(raw.seed_key), 1, 8) || '-' || substr(md5(raw.seed_key), 9, 4) || '-' || substr(md5(raw.seed_key), 13, 4) || '-' || substr(md5(raw.seed_key), 17, 4) || '-' || substr(md5(raw.seed_key), 21, 12))::uuid as id,
    customers.id as customer_id,
    customers.address,
    raw.service,
    (week_anchor.week_start + raw.day_offset + raw.start_time)::timestamptz as scheduled_at,
    raw.duration_min,
    raw.status,
    raw.notes
  from raw
  cross join week_anchor
  join public.customers customers
    on customers.id = (substr(md5(raw.customer_key), 1, 8) || '-' || substr(md5(raw.customer_key), 9, 4) || '-' || substr(md5(raw.customer_key), 13, 4) || '-' || substr(md5(raw.customer_key), 17, 4) || '-' || substr(md5(raw.customer_key), 21, 12))::uuid
)
insert into public.bookings (id, customer_id, address, service, scheduled_at, duration_min, status, notes, created_at, updated_at)
select id, customer_id, address, service, scheduled_at, duration_min, status, notes, now(), now()
from data
on conflict (id) do update set
  customer_id = excluded.customer_id,
  address = excluded.address,
  service = excluded.service,
  scheduled_at = excluded.scheduled_at,
  duration_min = excluded.duration_min,
  status = excluded.status,
  notes = excluded.notes,
  updated_at = excluded.updated_at,
  deleted_at = null;

-- Booking staff assignments, 1-2 staff per booking.
with raw(booking_key, staff_key) as (
  values
    ('booking:001', 'staff:emma-andersson'),
    ('booking:002', 'staff:tina-karlsson'), ('booking:002', 'staff:maria-johansson'),
    ('booking:003', 'staff:emma-andersson'),
    ('booking:004', 'staff:sara-nilsson'), ('booking:004', 'staff:maria-johansson'),
    ('booking:005', 'staff:tina-karlsson'),
    ('booking:006', 'staff:sara-nilsson'),
    ('booking:007', 'staff:maria-johansson'),
    ('booking:008', 'staff:lina-eriksson'),
    ('booking:009', 'staff:tina-karlsson'), ('booking:009', 'staff:emma-andersson'),
    ('booking:010', 'staff:sara-nilsson'), ('booking:010', 'staff:maria-johansson'),
    ('booking:011', 'staff:emma-andersson'),
    ('booking:012', 'staff:lina-eriksson'),
    ('booking:013', 'staff:maria-johansson'),
    ('booking:014', 'staff:tina-karlsson'),
    ('booking:015', 'staff:lina-eriksson'),
    ('booking:016', 'staff:sara-nilsson'),
    ('booking:017', 'staff:emma-andersson'),
    ('booking:018', 'staff:tina-karlsson'), ('booking:018', 'staff:maria-johansson'),
    ('booking:019', 'staff:lina-eriksson'),
    ('booking:020', 'staff:emma-andersson'),
    ('booking:021', 'staff:tina-karlsson'),
    ('booking:022', 'staff:sara-nilsson'), ('booking:022', 'staff:maria-johansson'),
    ('booking:023', 'staff:lina-eriksson'),
    ('booking:024', 'staff:emma-andersson'),
    ('booking:025', 'staff:maria-johansson'), ('booking:025', 'staff:lina-eriksson')
),
data as (
  select
    (substr(md5(booking_key), 1, 8) || '-' || substr(md5(booking_key), 9, 4) || '-' || substr(md5(booking_key), 13, 4) || '-' || substr(md5(booking_key), 17, 4) || '-' || substr(md5(booking_key), 21, 12))::uuid as booking_id,
    (substr(md5(staff_key), 1, 8) || '-' || substr(md5(staff_key), 9, 4) || '-' || substr(md5(staff_key), 13, 4) || '-' || substr(md5(staff_key), 17, 4) || '-' || substr(md5(staff_key), 21, 12))::uuid as staff_id
  from raw
)
insert into public.booking_staff (booking_id, staff_id)
select booking_id, staff_id
from data
on conflict (booking_id, staff_id) do nothing;

-- Time entries for completed and in-progress bookings.
with assigned as (
  select
    b.id as booking_id,
    bs.staff_id,
    b.scheduled_at,
    b.duration_min,
    b.status,
    row_number() over (partition by b.id order by bs.staff_id) as staff_order
  from public.bookings b
  join public.booking_staff bs on bs.booking_id = b.id
  where b.id in (
    select (substr(md5('booking:' || lpad(i::text, 3, '0')), 1, 8) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 9, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 13, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 17, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 21, 12))::uuid
    from generate_series(1, 25) as i
  )
  and b.status in ('completed', 'in_progress')
),
data as (
  select
    (substr(md5('time:' || booking_id::text || ':' || staff_id::text), 1, 8) || '-' || substr(md5('time:' || booking_id::text || ':' || staff_id::text), 9, 4) || '-' || substr(md5('time:' || booking_id::text || ':' || staff_id::text), 13, 4) || '-' || substr(md5('time:' || booking_id::text || ':' || staff_id::text), 17, 4) || '-' || substr(md5('time:' || booking_id::text || ':' || staff_id::text), 21, 12))::uuid as id,
    booking_id,
    staff_id,
    scheduled_at + ((2 + staff_order)::int * interval '1 minute') as started_at,
    case when duration_min >= 240 then 15 else 0 end as paused_duration_min,
    case when status = 'completed' then scheduled_at + ((duration_min - 8 + staff_order)::int * interval '1 minute') end as finished_at,
    case when status = 'completed' then duration_min - 10 + staff_order else null end as actual_duration_min,
    case
      when status = 'completed' then 'Klart enligt checklista. Mindre avvikelse mot planerad tid.'
      when status = 'in_progress' then 'Pågår. Extra fokus på kök och badrum.'
    end as comment
  from assigned
)
insert into public.time_entries (id, booking_id, staff_id, started_at, paused_duration_min, finished_at, actual_duration_min, comment, created_at)
select id, booking_id, staff_id, started_at, paused_duration_min, finished_at, actual_duration_min, comment, now()
from data
on conflict (id) do update set
  booking_id = excluded.booking_id,
  staff_id = excluded.staff_id,
  started_at = excluded.started_at,
  paused_duration_min = excluded.paused_duration_min,
  finished_at = excluded.finished_at,
  actual_duration_min = excluded.actual_duration_min,
  comment = excluded.comment;

-- Booking checklist items copied from matching service checklist.
with template_pick as (
  select distinct on (service) id, service
  from public.checklist_templates
  where service in ('Hemstädning', 'Flyttstädning', 'Fönsterputs', 'Kontorsstädning', 'Storstädning')
  order by service, created_at, id
),
booking_templates as (
  select
    b.id as booking_id,
    b.status,
    b.scheduled_at,
    coalesce(tp_exact.id, tp_hem.id, tp_stor.id) as template_id
  from public.bookings b
  left join template_pick tp_exact on tp_exact.service = b.service
  left join template_pick tp_hem on tp_hem.service = 'Hemstädning' and b.service in ('Veckostädning', 'Månadsstädning')
  left join template_pick tp_stor on tp_stor.service = 'Storstädning' and b.service = 'Storstädning'
  where b.id in (
    select (substr(md5('booking:' || lpad(i::text, 3, '0')), 1, 8) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 9, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 13, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 17, 4) || '-' || substr(md5('booking:' || lpad(i::text, 3, '0')), 21, 12))::uuid
    from generate_series(1, 25) as i
  )
),
first_staff as (
  select distinct on (booking_id) booking_id, staff_id
  from public.booking_staff
  order by booking_id, staff_id
),
data as (
  select
    (substr(md5('booking-check:' || bt.booking_id::text || ':' || cti.id::text), 1, 8) || '-' || substr(md5('booking-check:' || bt.booking_id::text || ':' || cti.id::text), 9, 4) || '-' || substr(md5('booking-check:' || bt.booking_id::text || ':' || cti.id::text), 13, 4) || '-' || substr(md5('booking-check:' || bt.booking_id::text || ':' || cti.id::text), 17, 4) || '-' || substr(md5('booking-check:' || bt.booking_id::text || ':' || cti.id::text), 21, 12))::uuid as id,
    bt.booking_id,
    cti.label,
    case
      when bt.status = 'completed' then true
      when bt.status = 'in_progress' and cti.sort_order <= 4 then true
      else false
    end as completed,
    case
      when bt.status = 'completed' then first_staff.staff_id
      when bt.status = 'in_progress' and cti.sort_order <= 4 then first_staff.staff_id
      else null
    end as completed_by,
    case
      when bt.status = 'completed' then bt.scheduled_at + ((cti.sort_order * 12)::int * interval '1 minute')
      when bt.status = 'in_progress' and cti.sort_order <= 4 then bt.scheduled_at + ((cti.sort_order * 18)::int * interval '1 minute')
      else null
    end as completed_at,
    cti.sort_order
  from booking_templates bt
  join public.checklist_template_items cti on cti.template_id = bt.template_id
  left join first_staff on first_staff.booking_id = bt.booking_id
)
insert into public.booking_checklist_items (id, booking_id, label, completed, completed_by, completed_at, sort_order)
select id, booking_id, label, completed, completed_by, completed_at, sort_order
from data
on conflict (id) do update set
  booking_id = excluded.booking_id,
  label = excluded.label,
  completed = excluded.completed,
  completed_by = excluded.completed_by,
  completed_at = excluded.completed_at,
  sort_order = excluded.sort_order;

commit;

-- Quick checks
select 'customers' as table_name, count(*) as row_count from public.customers
union all
select 'leads', count(*) from public.leads
union all
select 'staff', count(*) from public.staff
union all
select 'bookings', count(*) from public.bookings
union all
select 'booking_staff', count(*) from public.booking_staff
union all
select 'time_entries', count(*) from public.time_entries
union all
select 'checklist_templates', count(*) from public.checklist_templates
union all
select 'checklist_template_items', count(*) from public.checklist_template_items
union all
select 'booking_checklist_items', count(*) from public.booking_checklist_items
order by table_name;

select status, count(*) as bookings
from public.bookings
group by status
order by status;
