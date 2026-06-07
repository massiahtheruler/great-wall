import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/GreatWallExperience";
import RevealSection from "@/components/RevealSection";
import { catalogItems, featuredItems, getItemBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.slug }));
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) notFound();

  const related = featuredItems.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <main className="detail-page">
      <RevealSection className="detail-hero">
        <div className="detail-hero__image">
          <Image src={item.image} alt={item.title} fill sizes="(min-width: 900px) 50vw, 100vw" priority />
        </div>
        <div className="detail-hero__copy">
          <p className="fine-label">{item.label}</p>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="detail-price">
            <span>Planning range</span>
            <strong>{item.price}</strong>
          </div>
          <div className="hero__actions">
            <a href="#estimate" className="stone-button">
              Start Estimate
            </a>
            <Link href="/featured" className="ghost-button">
              Back to Featured
            </Link>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="section-shell detail-columns">
        <section>
          <p className="fine-label">Included</p>
          <h2>Built like a real room feature.</h2>
          <ul className="detail-list">
            {item.included.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>
        <section>
          <p className="fine-label">Options</p>
          <h2>Shape the wall around how you live.</h2>
          <ul className="detail-list">
            {item.addOns.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>
      </RevealSection>

      {item.specs && (
        <RevealSection className="section-shell specs-band">
          <p className="fine-label">Pricing notes</p>
          <div>
            {item.specs.map((spec) => (
              <span key={spec}>{spec}</span>
            ))}
          </div>
        </RevealSection>
      )}

      <RevealSection className="section-shell">
        <div className="section-heading">
          <p className="fine-label">Related directions</p>
          <h2>Compare the next closest models.</h2>
        </div>
        <ProductGallery items={related} />
      </RevealSection>
    </main>
  );
}
