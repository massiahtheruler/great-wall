import { ProductGallery } from "@/components/GreatWallExperience";
import RevealSection from "@/components/RevealSection";
import { featuredItems } from "@/lib/catalog";

export default function FeaturedPage() {
  return (
    <main className="subpage">
      <RevealSection className="subpage-hero">
        <p className="fine-label">Featured models</p>
        <h1>Standard models with room for custom decisions.</h1>
        <p>
          These are the clean starting points: priced enough to guide the
          conversation, flexible enough to respect the room.
        </p>
      </RevealSection>
      <RevealSection className="section-shell">
        <ProductGallery items={featuredItems} showFilters />
      </RevealSection>
    </main>
  );
}
