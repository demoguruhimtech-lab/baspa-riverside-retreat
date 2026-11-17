import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Eye,
  Flower2,
  ForkKnife,
  Heart,
  Images,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  ParkingCircle,
  Phone,
  Sparkles,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import cafeDessert from "@/assets/cafe-dessert.png";
import economyRoom from "@/assets/economy-room.png";
import mountainBalcony from "@/assets/mountain-balcony.png";
import resortEntrance from "@/assets/resort-entrance.png";
import resortExterior from "@/assets/resort-exterior.png";
import resortFront from "@/assets/resort-front.png";
import resortMountainView from "@/assets/resort-mountain-view.webp";
import standardRoom from "@/assets/standard-room.png";
import winterValley from "@/assets/winter-valley.png";
import woodenRoom from "@/assets/wooden-room.png";
import { bookingEnquirySchema, roomCategories } from "@/lib/booking-schema";
import { submitBookingEnquiry } from "@/lib/booking.functions";

const roomCards = [
  {
    name: "Economy Double Room",
    description: "An easy, comfortable place to settle in after a day in the valley.",
    image: economyRoom,
    alt: "Guest room with a double bed, warm curtains, and a small sitting area",
    note: "Comfortable essentials",
  },
  {
    name: "Standard Room with Lake View",
    description: "A relaxed room for waking up to the scenery of Sangla.",
    image: standardRoom,
    alt: "Light-filled resort room with neatly prepared beds and warm neutral walls",
    note: "Scenic surroundings",
  },
  {
    name: "Deluxe Double Room",
    description: "A welcoming interior with thoughtful touches for a restful stay.",
    image: woodenRoom,
    alt: "Cozy bedroom with a wooden chevron-panelled ceiling and prepared bed",
    note: "Woodland warmth",
  },
  {
    name: "Elite Double Room",
    description: "A more elevated room choice, with the same easy mountain welcome.",
    image: resortFront,
    alt: "The Lake View Resort exterior among the mountains of Sangla",
    note: "A premium stay",
  },
];

const slides = [
  {
    eyebrow: "The Lake View Resort · Sangla",
    title: "Wake Up to the Beauty of the Baspa River.",
    description:
      "Discover a peaceful mountain escape surrounded by breathtaking Himalayan landscapes and beautiful riverside views.",
    image: resortMountainView,
    alt: "The resort framed by green trees beneath the high Himalayan peaks",
    cta: "Explore Our Resort",
    target: "about",
  },
  {
    eyebrow: "Room to breathe",
    title: "Where the Mountains Meet the River.",
    description:
      "Enjoy beautiful mountain scenery, peaceful surroundings and memorable moments in Sangla Valley.",
    image: winterValley,
    alt: "Snow-covered Himalayan peaks rising above a green-roofed pavilion",
    cta: "Discover More",
    target: "experiences",
  },
  {
    eyebrow: "Settle in, slow down",
    title: "Relax in Comfort. Experience the Mountains.",
    description:
      "Stay in cozy, thoughtfully presented rooms with beautiful surroundings and warm hospitality.",
    image: woodenRoom,
    alt: "A cozy wooden-panelled room prepared for a restful mountain stay",
    cta: "Explore Our Rooms",
    target: "rooms",
  },
  {
    eyebrow: "A table with a view",
    title: "Good Food. Beautiful Views. Memorable Moments.",
    description:
      "Enjoy delicious food and relaxing moments at our on-site cafe and restaurant.",
    image: cafeDessert,
    alt: "A freshly served sweet crepe drizzled with chocolate",
    cta: "Discover Dining",
    target: "restaurant",
  },
];

const navItems = [
  ["About", "about"],
  ["Rooms", "rooms"],
  ["Dining", "restaurant"],
  ["Amenities", "amenities"],
  ["Experiences", "experiences"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
] as const;

const attractionCards = [
  { name: "Sangla Village", description: "Discover the mountain village at the heart of the valley.", image: mountainBalcony, alt: "A view across the green Sangla Valley from the resort" },
  { name: "Kamru Fort", description: "Explore a landmark woven into the story of the region.", image: resortMountainView, alt: "Himalayan peaks and wooded hills around Sangla" },
  { name: "Bering Nag Temple", description: "A place of local tradition and quiet reflection.", image: resortEntrance, alt: "Traditional timber details at the resort entrance" },
  { name: "Baspa Valley", description: "Take in the dramatic landscapes that define the valley.", image: winterValley, alt: "Mountain valley and snow-covered Himalayan scenery" },
  { name: "Chitkul", description: "See the high-mountain village and its striking surroundings.", image: resortExterior, alt: "Mountain landscape behind the resort in Sangla" },
  { name: "Rakchham", description: "Admire the quieter beauty of the mountain country.", image: resortFront, alt: "The Lake View Resort set against the mountain landscape" },
];

const galleryItems = [
  { image: resortFront, alt: "Stone exterior of The Lake View Resort in Kuppa" },
  { image: economyRoom, alt: "Comfortable guest room with floral bedcover and seating" },
  { image: resortExterior, alt: "Resort exterior beneath a green hillside and blue sky" },
  { image: woodenRoom, alt: "Wood-panelled room interior at The Lake View Resort" },
  { image: mountainBalcony, alt: "View over the green mountain valley from the resort" },
  { image: cafeDessert, alt: "Dessert served at the resort cafe" },
  { image: resortEntrance, alt: "Welcoming entrance to The Lake View Resort and Cafe" },
  { image: winterValley, alt: "Snowy Himalayan peaks and green pavilion" },
  { image: resortMountainView, alt: "Resort roof and surrounding snow-capped mountains" },
  { image: standardRoom, alt: "Prepared beds in a resort guest room" },
];

const whyChoose = [
  { icon: Mountain, title: "Beautiful Location", text: "Natural beauty all around Kuppa and Sangla Valley." },
  { icon: Eye, title: "Baspa River Views", text: "A scenic river landscape and mountain backdrop." },
  { icon: Heart, title: "Comfortable Rooms", text: "Cozy wooden-panelled accommodation for your stay." },
  { icon: Utensils, title: "On-Site Dining", text: "A welcoming cafe and restaurant at the resort." },
  { icon: Leaf, title: "Peaceful Surroundings", text: "A gentler pace away from busy city life." },
  { icon: Sparkles, title: "Warm Hospitality", text: "Friendly, cooperative service throughout your visit." },
];

const amenities = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: ParkingCircle, label: "Free Parking" },
  { icon: ForkKnife, label: "On-Site Restaurant" },
  { icon: Coffee, label: "On-Site Cafe" },
  { icon: Flower2, label: "Garden Seating Area" },
  { icon: Mountain, label: "Mountain Views" },
  { icon: Eye, label: "River Views" },
];

export const Route = createFileRoute("/")({
  component: ResortHome,
  head: () => ({
    meta: [
      { title: "The Lake View Resort Sangla | Baspa Valley Stay" },
      {
        name: "description",
        content:
          "Stay at The Lake View Resort in Kuppa, Sangla, Himachal Pradesh. Enjoy cozy rooms, mountain and Baspa River views, cafe and restaurant dining, and warm hospitality.",
      },
      { property: "og:title", content: "The Lake View Resort Sangla" },
      {
        property: "og:description",
        content: "A peaceful mountain stay in Kuppa, Sangla Valley, with scenic surroundings and on-site dining.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: "The Lake View Resort",
          description: "A mountain resort in Kuppa, Sangla Valley, Himachal Pradesh.",
          telephone: "+91 83530 00055",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Near Petrol Pump, Kuppa, Sangla",
            addressLocality: "Sangla",
            addressRegion: "Himachal Pradesh",
            postalCode: "172106",
            addressCountry: "IN",
          },
          hasMap: "https://maps.app.goo.gl/qyJ9PzjyhQfRq4sY6",
          starRating: { "@type": "Rating", ratingValue: "3" },
          amenityFeature: amenities.map(({ label }) => ({
            "@type": "LocationFeatureSpecification",
            name: label,
            value: true,
          })),
        }),
      },
    ],
  }),
});

function ResortHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof galleryItems)[number] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submitEnquiry = useServerFn(submitBookingEnquiry);
  const slide = slides[activeSlide];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  const moveSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = bookingEnquirySchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your enquiry details.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitEnquiry({ data: parsed.data });
      if (!result.success) {
        toast.error("We couldn't save your enquiry. Please call or WhatsApp us instead.");
        return;
      }
      form.reset();
      toast.success("Your enquiry has been received. We look forward to speaking with you.");
    } catch {
      toast.error("We couldn't send your enquiry. Please call or WhatsApp us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className={`resort-header ${scrolled ? "resort-header--scrolled" : ""}`}>
        <div className="resort-nav-wrap">
          <a className="resort-brand" href="#home" aria-label="The Lake View Resort home">
            <span className="resort-brand-mark"><Mountain aria-hidden="true" /></span>
            <span className="resort-brand-copy"><strong>The Lake View</strong><small>RESORT · SANGLA</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <Button asChild className="nav-book"><a href="#contact">Book Your Stay <ArrowUpRight aria-hidden="true" /></a></Button>
          <Button
            variant="outline"
            size="icon"
            className="mobile-menu-button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >{mobileMenuOpen ? <X /> : <Menu />}</Button>
        </div>
        {mobileMenuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, id]) => <a key={id} onClick={() => setMobileMenuOpen(false)} href={`#${id}`}>{label}<ArrowUpRight aria-hidden="true" /></a>)}
          <a className="mobile-nav-book" href="#contact" onClick={() => setMobileMenuOpen(false)}>Book Your Stay <ArrowUpRight aria-hidden="true" /></a>
        </nav>}
      </header>

      <section id="home" className="resort-hero" aria-label="Welcome to The Lake View Resort">
        <div className="hero-image-wrap" key={slide.image}>
          <img className="hero-image" src={slide.image} alt={slide.alt} fetchPriority="high" />
        </div>
        <div className="hero-shade" />
        <div className="hero-content" key={slide.title}>
          <p className="hero-eyebrow"><span />{slide.eyebrow}<span /></p>
          <h1>{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>
          <Button asChild size="lg" className="button-cream"><a href={`#${slide.target}`}>{slide.cta}<ArrowUpRight aria-hidden="true" /></a></Button>
        </div>
        <div className="hero-bottom">
          <a className="scroll-cue" href="#about"><ArrowDown aria-hidden="true" /><span>Scroll to discover</span></a>
          <div className="hero-controls">
            <span className="hero-count"><strong>0{activeSlide + 1}</strong><span> / 0{slides.length}</span></span>
            <div className="hero-dots" aria-label="Choose a featured image">
              {slides.map((item, index) => <button key={item.title} aria-label={`Show slide ${index + 1}: ${item.eyebrow}`} aria-pressed={activeSlide === index} className={activeSlide === index ? "active" : ""} onClick={() => setActiveSlide(index)} />)}
            </div>
            <Button variant="outline" size="icon" className="hero-arrow" aria-label="Previous slide" onClick={() => moveSlide(-1)}><ChevronLeft /></Button>
            <Button variant="outline" size="icon" className="hero-arrow" aria-label="Next slide" onClick={() => moveSlide(1)}><ChevronRight /></Button>
          </div>
        </div>
        <div className="hero-location"><MapPin aria-hidden="true" /> KUPPA · SANGLA VALLEY · HIMACHAL PRADESH</div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-inner about-grid">
          <div className="about-photo reveal">
            <img src={resortFront} alt="The stone-and-wood exterior of The Lake View Resort in Kuppa" loading="lazy" />
            <div className="photo-caption"><Mountain aria-hidden="true" /><span><strong>A slower kind of stay</strong><small>IN THE HEART OF SANGLA VALLEY</small></span></div>
            <span className="photo-index">01 <span>—</span> 04</span>
          </div>
          <div className="about-copy reveal">
            <SectionEyebrow>Welcome to our mountain home</SectionEyebrow>
            <h2>Your Peaceful Riverside Escape in Sangla.</h2>
            <p className="lead-copy">The Lake View Resort is a mountain retreat located in Kuppa, Sangla, along the beautiful Baspa River.</p>
            <p>Surrounded by scenic mountain landscapes, the resort offers comfortable accommodation, cozy wooden interiors and a welcoming atmosphere for travellers exploring the beauty of Sangla Valley.</p>
            <div className="about-highlights">
              {["Baspa River and mountain views", "Cozy wooden-panelled rooms", "On-site cafe and restaurant", "Garden seating and warm hospitality"].map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}
            </div>
            <a className="text-link" href="#experiences">A little more about the valley <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="rooms" className="section rooms-section">
        <div className="section-inner">
          <div className="section-heading reveal">
            <div><SectionEyebrow>Rest well, wake somewhere wonderful</SectionEyebrow><h2>Stay Close to Nature.<br /><em>Relax in Comfort.</em></h2></div>
            <p>Find a room that feels right for your time in Sangla. Each one offers a comfortable place to unwind after a day among the mountains.</p>
          </div>
          <div className="room-grid">
            {roomCards.map((room, index) => <article className="room-card reveal" key={room.name} style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}>
              <a href="#booking" className="room-photo"><img src={room.image} alt={room.alt} loading="lazy" /><span className="room-number">0{index + 1}</span></a>
              <div className="room-card-copy"><span className="room-note"><Sparkles aria-hidden="true" />{room.note}</span><h3>{room.name}</h3><p>{room.description}</p><div className="room-card-bottom"><a href="#booking">View Details <ArrowUpRight aria-hidden="true" /></a><a href="#booking">Enquire <ArrowRight aria-hidden="true" /></a></div></div>
            </article>)}
          </div>
          <div className="rooms-footnote"><span><Leaf aria-hidden="true" />Room details and current availability are confirmed directly by the resort.</span><a href="#booking">Ask about your dates <ArrowRight aria-hidden="true" /></a></div>
        </div>
      </section>

      <section id="experiences" className="river-experience">
        <img src={mountainBalcony} alt="View across the green mountains and valley from the resort" loading="lazy" />
        <div className="river-shade" />
        <div className="river-copy reveal">
          <SectionEyebrow light>In the rhythm of the valley</SectionEyebrow>
          <h2>Let the Beauty of the Baspa River Surround You.</h2>
          <p>Enjoy the peaceful atmosphere of Sangla Valley, with beautiful river scenery and mountain landscapes creating a memorable backdrop for your stay.</p>
          <a className="river-link" href="#gallery">See the surrounding landscapes <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="river-tag"><span>31°26′N</span><i /> <span>SANGLA, HIMACHAL PRADESH</span></div>
      </section>

      <section id="restaurant" className="section dining-section">
        <div className="section-inner dining-grid">
          <div className="dining-copy reveal">
            <SectionEyebrow>Come as you are, stay a little</SectionEyebrow>
            <h2>Delicious Food with a Beautiful Mountain Backdrop.</h2>
            <p className="lead-copy">Enjoy a welcoming dining experience at The Lake View Resort's on-site cafe and restaurant while taking in the natural beauty of Sangla.</p>
            <p>A relaxed place to gather over homely food, share a meal, or pause for a warm drink in the mountain air.</p>
            <div className="dining-tags"><span><Coffee aria-hidden="true" /> On-site cafe</span><span><Utensils aria-hidden="true" /> On-site restaurant</span></div>
            <Button asChild className="button-forest"><a href="#contact">Explore Dining <ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
          <div className="dining-photos reveal">
            <img className="dining-food" src={cafeDessert} alt="A sweet crepe served at the resort cafe" loading="lazy" />
            <img className="dining-view" src={resortEntrance} alt="The inviting entrance to The Lake View Resort and Cafe" loading="lazy" />
            <div className="dining-stamp"><span>Made for</span><strong>slow<br />moments</strong><Leaf aria-hidden="true" /></div>
          </div>
        </div>
      </section>

      <section id="amenities" className="amenities-section">
        <div className="section-inner amenities-inner">
          <div className="amenities-title reveal"><SectionEyebrow light>Considered comforts</SectionEyebrow><h2>Everything for a<br /><em>Relaxing Mountain Stay.</em></h2></div>
          <div className="amenity-list">{amenities.map(({ icon: Icon, label }, index) => <div className="amenity-item reveal" key={label} style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}><Icon aria-hidden="true" /><span>{label}</span><ArrowUpRight aria-hidden="true" className="amenity-arrow" /></div>)}</div>
        </div>
      </section>

      <section className="section why-section">
        <div className="section-inner">
          <div className="center-heading reveal"><SectionEyebrow>Little things, lasting memories</SectionEyebrow><h2>Why Make It <em>The Lake View?</em></h2><p>A valley stay with beautiful scenery, comfortable rooms and the warmth of a thoughtful welcome.</p></div>
          <div className="why-grid">{whyChoose.map(({ icon: Icon, title, text }, index) => <article className="why-item reveal" key={title} style={{ "--reveal-delay": `${index * 75}ms` } as React.CSSProperties}><span className="why-icon"><Icon aria-hidden="true" /></span><span className="why-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section explore-section">
        <div className="section-inner">
          <div className="section-heading reveal"><div><SectionEyebrow>A valley worth wandering</SectionEyebrow><h2>Discover the Beauty<br /><em>of Sangla Valley.</em></h2></div><p>From village lanes to mountain horizons, discover some of the places that give this valley its unmistakable character.</p></div>
          <div className="attraction-grid">{attractionCards.map((place, index) => <article className="attraction-card reveal" key={place.name} style={{ "--reveal-delay": `${index * 65}ms` } as React.CSSProperties}><img src={place.image} alt={place.alt} loading="lazy" /><div className="attraction-card-copy"><span>0{index + 1} <i>·</i> SANGLA VALLEY</span><h3>{place.name}</h3><p>{place.description}</p></div></article>)}</div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="section-inner">
          <div className="gallery-heading reveal"><div><SectionEyebrow>A glimpse of your stay</SectionEyebrow><h2>Scenes from <em>Sangla.</em></h2></div><p>A few glimpses of the rooms, resort and landscapes that make this corner of the valley special.</p></div>
          <div className="gallery-grid">{galleryItems.map((item, index) => <button className={`gallery-item gallery-item--${index + 1} reveal`} key={item.alt} type="button" aria-label={`View photo: ${item.alt}`} onClick={() => setSelectedPhoto(item)}><img src={item.image} alt={item.alt} loading="lazy" /><span><Images aria-hidden="true" /> View photo</span></button>)}</div>
        </div>
      </section>

      <section className="guest-note-section">
        <div className="section-inner guest-note-inner reveal"><span className="guest-note-icon"><Heart aria-hidden="true" /></span><div><SectionEyebrow>Thoughtful hospitality</SectionEyebrow><h2>A warm welcome, remembered.</h2><p>Scenic surroundings, comfortable rooms, homely food and cooperative staff are at the heart of a stay here. We don't display unverified reviews or ratings.</p></div><a href="#contact" aria-label="Contact the resort about your stay"><ArrowUpRight aria-hidden="true" /></a></div>
      </section>

      <section className="booking-band" id="booking">
        <div className="booking-photo"><img src={winterValley} alt="A serene snow-covered Himalayan landscape" loading="lazy" /></div><div className="booking-shade" />
        <div className="booking-copy reveal"><SectionEyebrow light>Your Sangla story starts here</SectionEyebrow><h2>Make Your Next Mountain Escape Memorable.</h2><p>Plan your visit to Sangla and enjoy a relaxing stay at The Lake View Resort.</p><Button asChild className="button-cream"><a href="#enquiry-form">Send an Enquiry <ArrowUpRight aria-hidden="true" /></a></Button></div>
      </section>

      <section id="enquiry-form" className="section enquiry-section">
        <div className="section-inner enquiry-grid">
          <div className="enquiry-intro reveal"><SectionEyebrow>Tell us about your stay</SectionEyebrow><h2>Let's plan a little time <em>in the mountains.</em></h2><p>Share your preferred dates and room choice. The resort can confirm current availability directly with you.</p><div className="enquiry-direct"><span>Prefer a quick conversation?</span><a href="tel:+918353000055"><Phone aria-hidden="true" /> +91 83530 00055</a><a href="https://wa.me/918353000055?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20stay%20at%20The%20Lake%20View%20Resort%20in%20Sangla." target="_blank" rel="noreferrer"><ArrowUpRight aria-hidden="true" /> WhatsApp the resort</a></div><p className="privacy-note"><Check aria-hidden="true" />Your enquiry is kept private and only used to respond to you.</p></div>
          <form className="enquiry-form reveal" onSubmit={handleBookingSubmit}>
            <div className="form-heading"><strong>Booking enquiry</strong><span>We'd love to hear from you</span></div>
            <div className="form-grid">
              <label className="form-field">Full Name<input name="fullName" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100} /></label>
              <label className="form-field">Phone Number<input name="phone" autoComplete="tel" placeholder="+91" required inputMode="tel" maxLength={20} /></label>
              <label className="form-field">Email Address <span className="optional-label">OPTIONAL</span><input name="email" autoComplete="email" type="email" placeholder="you@example.com" maxLength={255} /></label>
              <label className="form-field">Preferred Room Category<select name="roomCategory" defaultValue="" required><option value="" disabled>Select a room</option>{roomCategories.map((category) => <option key={category}>{category}</option>)}</select><ChevronDown aria-hidden="true" className="select-chevron" /></label>
              <label className="form-field">Check-in Date<input name="checkIn" type="date" required /></label>
              <label className="form-field">Check-out Date<input name="checkOut" type="date" required /></label>
              <label className="form-field">Number of Guests<input name="guests" type="number" min="1" max="20" defaultValue="2" required /></label>
              <label className="form-field">Number of Rooms<input name="rooms" type="number" min="1" max="10" defaultValue="1" required /></label>
              <label className="form-field form-field--wide">Additional Message <span className="optional-label">OPTIONAL</span><textarea name="message" rows={3} placeholder="Anything you'd like us to know?" maxLength={1500} /></label>
            </div>
            <div className="form-submit"><Button className="button-forest" type="submit" disabled={submitting}>{submitting ? "Sending your enquiry…" : "Send Booking Enquiry"}<ArrowUpRight aria-hidden="true" /></Button><span>No payment or booking confirmation is taken here.</span></div>
          </form>
        </div>
      </section>

      <section className="section rates-section">
        <div className="section-inner rates-inner">
          <div className="rates-copy reveal"><SectionEyebrow>Reference only</SectionEyebrow><h2>Planning your <em>mountain break?</em></h2><p>These supplied comparison rates are indicative only, not live resort rates. Contact us for current pricing for your dates.</p><Button asChild variant="outline" className="button-outline-forest"><a href="#enquiry-form">Enquire for Current Rates <ArrowRight aria-hidden="true" /></a></Button><small>Rates are indicative and may vary depending on travel dates, availability, taxes and booking conditions.</small></div>
          <div className="rates-table-wrap reveal"><div className="rates-table-heading"><span>COMPARISON LISTING</span><span>INDICATIVE RATE</span></div>{[
            ["Traveloka", "₹2,345"], ["6E Hotels", "₹2,363"], ["MakeMyTrip", "₹4,148"], ["Expedia", "₹2,625"], ["Hotels.com", "₹2,625"],
          ].map(([provider, price]) => <div className="rate-row" key={provider}><span>{provider}</span><strong>{price}</strong></div>)}</div>
        </div>
      </section>

      <section id="contact" className="section location-section">
        <div className="section-inner location-grid">
          <div className="location-copy reveal"><SectionEyebrow>Find your way to Kuppa</SectionEyebrow><h2>A little closer <em>to the mountains.</em></h2><p>Find The Lake View Resort near the petrol pump in Kuppa, Sangla. We look forward to welcoming you.</p><div className="address-block"><MapPin aria-hidden="true" /><div><strong>The Lake View Resort</strong><span>Near Petrol Pump, Kuppa, Sangla,<br />Himachal Pradesh 172106, India</span></div></div><div className="contact-phone"><Phone aria-hidden="true" /><a href="tel:+918353000055">+91 83530 00055</a></div><div className="contact-actions"><Button asChild className="button-forest"><a href="tel:+918353000055"><Phone aria-hidden="true" /> Call Now</a></Button><Button asChild variant="outline" className="button-outline-forest"><a href="https://wa.me/918353000055?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20stay%20at%20The%20Lake%20View%20Resort%20in%20Sangla." target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight aria-hidden="true" /></a></Button></div><a className="directions-link" href="https://maps.app.goo.gl/qyJ9PzjyhQfRq4sY6" target="_blank" rel="noreferrer">Get Directions <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="map-frame reveal"><iframe title="Map showing The Lake View Resort in Sangla" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4152.606798727276!2d78.2409956009318!3d31.43389672701586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3906152246e17c2f%3A0xdde7093235e413b5!2sThe%20Lake%20View%20Resort!5e0!3m2!1sen!2sin!4v1794889555836!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
        </div>
      </section>

      <footer className="resort-footer">
        <div className="section-inner footer-main">
          <div className="footer-brand"><a className="resort-brand" href="#home"><span className="resort-brand-mark"><Mountain aria-hidden="true" /></span><span className="resort-brand-copy"><strong>The Lake View</strong><small>RESORT · SANGLA</small></span></a><p>A quiet mountain retreat in Kuppa, surrounded by the beauty of Sangla Valley.</p><span className="footer-tagline">Experience the River.<br />Embrace the Mountains.<br />Stay in Sangla.</span></div>
          <div className="footer-links"><strong>Explore</strong>{navItems.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
          <div className="footer-links"><strong>Your stay</strong><a href="#rooms">Rooms</a><a href="#restaurant">Restaurant & Cafe</a><a href="#amenities">Amenities</a><a href="#gallery">Gallery</a><a href="#booking">Booking Enquiry</a></div>
          <div className="footer-contact"><strong>Come find us</strong><span>Near Petrol Pump, Kuppa,<br />Sangla, Himachal Pradesh 172106</span><a href="tel:+918353000055">+91 83530 00055</a><a href="https://maps.app.goo.gl/qyJ9PzjyhQfRq4sY6" target="_blank" rel="noreferrer">Get directions <ArrowUpRight aria-hidden="true" /></a><a href="https://wa.me/918353000055?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20stay%20at%20The%20Lake%20View%20Resort%20in%20Sangla." target="_blank" rel="noreferrer">WhatsApp enquiry <ArrowUpRight aria-hidden="true" /></a></div>
        </div>
        <div className="section-inner footer-bottom"><span>© {new Date().getFullYear()} The Lake View Resort, Sangla</span><span>Made for the mountains <Mountain aria-hidden="true" /></span><a href="#home">Back to top <ArrowUpRight aria-hidden="true" /></a></div>
      </footer>

      {selectedPhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.alt} onClick={() => setSelectedPhoto(null)}><Button variant="outline" size="icon" className="lightbox-close" aria-label="Close photo" onClick={() => setSelectedPhoto(null)}><X /></Button><img src={selectedPhoto.image} alt={selectedPhoto.alt} onClick={(event) => event.stopPropagation()} /><p>{selectedPhoto.alt}</p></div>}
    </main>
  );
}

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`section-eyebrow ${light ? "section-eyebrow--light" : ""}`}><span />{children}</p>;
}