"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  GalleryItem,
  ProductCategory,
  addOnLibrary,
  catalogItems,
  navItems,
} from "@/lib/catalog";

interface ExperienceProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: ExperienceProps) {
  const [estimateOpen, setEstimateOpen] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#estimate") {
        setEstimateOpen(true);
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label="Great Wall of Legends home">
          <span className="brand-mark">
            <Image
              src="/great-wall/brand/monogram.png"
              alt=""
              width={84}
              height={56}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              priority
            />
          </span>
          <span>
            <strong>Great Wall</strong>
            <small>of Legends</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.label}
                type="button"
                className="nav-link"
                onClick={() => setEstimateOpen(true)}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <button className="stone-button stone-button--small" onClick={() => setEstimateOpen(true)}>
          Start Estimate
        </button>
      </header>
      {children}
      <Footer onEstimate={() => setEstimateOpen(true)} />
      <EstimateModal
        isOpen={estimateOpen}
        onClose={() => setEstimateOpen(false)}
      />
    </>
  );
}

export function ProductGallery({
  items,
  showFilters = false,
}: {
  items: GalleryItem[];
  showFilters?: boolean;
}) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  );
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [estimateItem, setEstimateItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="gallery-system">
      {showFilters && (
        <div className="filter-rail" aria-label="Category filters">
          <button
            className={`filter-chip ${activeCategory === "all" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-chip ${activeCategory === category ? "is-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {formatCategory(category)}
            </button>
          ))}
        </div>
      )}
      <div className="product-grid">
        {filteredItems.map((item) => (
          <ProductCard key={item.slug} item={item} onSelect={setSelectedItem} />
        ))}
      </div>
      <ItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onEstimate={(item) => {
          setSelectedItem(null);
          setEstimateItem(item);
        }}
      />
      <EstimateModal
        isOpen={Boolean(estimateItem)}
        item={estimateItem}
        onClose={() => setEstimateItem(null)}
      />
    </div>
  );
}

export function ProductCard({
  item,
  onSelect,
}: {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}) {
  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__media"
        onClick={() => onSelect(item)}
        aria-label={`Open ${item.title} quick look`}
      >
        <Image src={item.image} alt={item.title} fill sizes="(min-width: 900px) 33vw, 100vw" />
        <span className="product-card__status">{item.label}</span>
      </button>
      <div className="product-card__body">
        <div>
          <p className="fine-label">{formatCategory(item.category)}</p>
          <h3>{item.title}</h3>
        </div>
        <p>{item.summary}</p>
        <div className="product-card__footer">
          <strong>{item.price}</strong>
          <button type="button" onClick={() => onSelect(item)}>
            Quick look
          </button>
        </div>
      </div>
    </article>
  );
}

export function ItemModal({
  item,
  isOpen,
  onClose,
  onEstimate,
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEstimate: (item: GalleryItem) => void;
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // This local render flag preserves the stone-panel exit animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      return;
    }
    const timeout = window.setTimeout(() => setShouldRender(false), 520);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  if (!shouldRender || !item || typeof document === "undefined") return null;

  return createPortal(
    <div className="modal-stage" role="dialog" aria-modal="true" aria-label={`${item.title} details`}>
      <button className={`modal-scrim ${isOpen ? "is-open" : "is-closing"}`} onClick={onClose} aria-label="Close details" />
      <div className="modal-book">
        <section className={`modal-slab modal-slab--image ${isOpen ? "stone-left-in" : "stone-left-out"}`}>
          <Image src={item.gallery?.[0] ?? item.image} alt={item.title} fill sizes="50vw" />
          <div className="modal-slab__caption">
            <span>{item.label}</span>
            <strong>{item.price}</strong>
          </div>
        </section>
        <section className={`modal-slab modal-slab--copy ${isOpen ? "stone-right-in" : "stone-right-out"}`}>
          <div className="modal-head">
            <div>
              <p className="fine-label">{formatCategory(item.category)}</p>
              <h2>{item.title}</h2>
            </div>
            <button className="close-button" onClick={onClose} aria-label="Close details">
              x
            </button>
          </div>
          <p className="modal-description">{item.description}</p>
          <div className="included-grid">
            <div>
              <h3>Included</h3>
              <ul>
                {item.included.slice(0, 5).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Add-ons</h3>
              <ul>
                {item.addOns.slice(0, 5).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-actions">
            <button className="stone-button" onClick={() => onEstimate(item)}>
              Start Estimate
            </button>
            <Link className="ghost-button" href={`/featured/${item.slug}`}>
              View Full Details
            </Link>
          </div>
        </section>
      </div>
    </div>,
    document.body,
  );
}

export function EstimateModal({
  isOpen,
  item,
  onClose,
}: {
  isOpen: boolean;
  item?: GalleryItem | null;
  onClose: () => void;
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  useEffect(() => {
    if (isOpen) {
      // This local render flag preserves the stone-panel exit animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      setStatus("idle");
      setSelectedAddOns((item ?? catalogItems[0]).addOns.slice(0, 2));
      return;
    }
    const timeout = window.setTimeout(() => setShouldRender(false), 520);
    return () => window.clearTimeout(timeout);
  }, [isOpen, item]);

  useEffect(() => {
    if (!shouldRender) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  if (!shouldRender || typeof document === "undefined") return null;

  const activeItem = item ?? catalogItems[0];
  const addOns = Array.from(new Set([...(activeItem.addOns ?? []), ...addOnLibrary])).slice(0, 8);

  const toggleAddOn = (addOn: string) => {
    setSelectedAddOns((current) =>
      current.includes(addOn)
        ? current.filter((entry) => entry !== addOn)
        : [...current, addOn],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("fallback");
      const formData = new FormData(form);
      const body = Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      window.location.href = `mailto:hello@greatwalloflegends.com?subject=${encodeURIComponent(
        `Great Wall estimate request: ${activeItem.title}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("sent");
    } catch {
      setStatus("fallback");
    }
  };

  return createPortal(
    <div className="modal-stage" role="dialog" aria-modal="true" aria-label="Estimate request">
      <button className={`modal-scrim ${isOpen ? "is-open" : "is-closing"}`} onClick={onClose} aria-label="Close estimate form" />
      <form className="modal-book estimate-book" onSubmit={handleSubmit}>
        <section className={`modal-slab estimate-summary ${isOpen ? "stone-left-in" : "stone-left-out"}`}>
          <div className="monogram-watermark">
            <Image src="/great-wall/brand/monogram.png" alt="" fill sizes="220px" />
          </div>
          <p className="fine-label">Project builder</p>
          <h2>{activeItem.title}</h2>
          <p>{activeItem.summary}</p>
          <input type="hidden" name="selected_model" value={activeItem.title} />
          <input type="hidden" name="selected_range" value={activeItem.price} />
          <input type="hidden" name="selected_addons" value={selectedAddOns.join(", ")} />
          <div className="estimate-total">
            <span>Planning range</span>
            <strong>{activeItem.price}</strong>
          </div>
          <div className="addon-list">
            {addOns.map((addOn) => (
              <label key={addOn} className="addon-check">
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addOn)}
                  onChange={() => toggleAddOn(addOn)}
                />
                <span>{addOn}</span>
              </label>
            ))}
          </div>
        </section>
        <section className={`modal-slab estimate-form ${isOpen ? "stone-right-in" : "stone-right-out"}`}>
          <div className="modal-head">
            <div>
              <p className="fine-label">Contact</p>
              <h2>Send the idea list.</h2>
            </div>
            <button type="button" className="close-button" onClick={onClose} aria-label="Close estimate form">
              x
            </button>
          </div>
          <div className="form-grid">
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Phone
              <input name="phone" placeholder="Best number" />
            </label>
            <label>
              City
              <input name="city" placeholder="Project city" />
            </label>
            <label>
              Timeline
              <select name="timeline" defaultValue="Planning now">
                <option>Planning now</option>
                <option>Within 30 days</option>
                <option>1-3 months</option>
                <option>Exploring ideas</option>
              </select>
            </label>
            <label>
              Preferred contact
              <select name="preferred_contact" defaultValue="Email">
                <option>Email</option>
                <option>Phone</option>
                <option>Text</option>
              </select>
            </label>
          </div>
          <label className="message-field">
            Notes
            <textarea
              name="message"
              rows={4}
              defaultValue={`I am interested in ${activeItem.title}. Selected add-ons: ${selectedAddOns.join(", ") || "none yet"}.`}
            />
          </label>
          <button className="stone-button" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Request Quote"}
          </button>
          {status === "sent" && <p className="form-note">Request sent. We will follow up with quote details.</p>}
          {status === "fallback" && <p className="form-note">EmailJS is not configured yet, so an email draft was opened.</p>}
        </section>
      </form>
    </div>,
    document.body,
  );
}

function Footer({ onEstimate }: { onEstimate: () => void }) {
  const scrollHome = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      <button type="button" className="footer-crest" onClick={scrollHome} aria-label="Scroll to top">
        <span className="footer-crest__arrow" aria-hidden="true" />
        <Image
          src="/great-wall/brand/monogram.png"
          alt=""
          width={108}
          height={72}
          style={{ width: "6.75rem", height: "auto" }}
        />
      </button>
      <div className="site-footer__content">
        <p>Great Wall of Legends is a Litty-family showroom brand for fire-led rooms, crafted walls, and gathering spaces that feel built to last.</p>
        <nav className="footer-links" aria-label="Footer links">
          <button type="button" className="footer-link" onClick={scrollHome}>
            <FooterIcon kind="home" />
            Home
          </button>
          <button type="button" className="footer-link">
            <FooterIcon kind="instagram" />
            Instagram
          </button>
          <button type="button" className="footer-link">
            <FooterIcon kind="facebook" />
            Facebook
          </button>
          <button type="button" className="footer-link">
            <FooterIcon kind="contact" />
            Contact
          </button>
        </nav>
      </div>
      <button className="stone-button" onClick={onEstimate}>
        Start Estimate
      </button>
    </footer>
  );
}

function FooterIcon({ kind }: { kind: "home" | "instagram" | "facebook" | "contact" }) {
  if (kind === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11.4 12 5l8 6.4" />
        <path d="M6.5 10.8V19h11v-8.2" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.6 19v-6h2.5l.4-2.7h-2.9V8.6c0-.8.3-1.4 1.5-1.4H16V4.8c-.4-.1-1-.2-1.9-.2-2 0-3.4 1.2-3.4 3.6v2.1H8.5V13h2.2v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 7.5h15v9h-15z" />
      <path d="m5.2 8.1 6.8 5.1 6.8-5.1" />
    </svg>
  );
}

export function formatCategory(category: ProductCategory) {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
