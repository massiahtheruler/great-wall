import Image from "next/image";
import { ProductGallery } from "@/components/GreatWallExperience";
import RevealSection from "@/components/RevealSection";
import { discoveryItems } from "@/lib/catalog";

export default function DiscoverPage() {
  return (
    <main className="subpage">
      <RevealSection className="subpage-hero subpage-hero--split">
        <div>
          <p className="fine-label">Discovery</p>
          <h1>Custom inspiration for rooms that need a measured hand.</h1>
          <p>
            Discovery is where the fixed model stops and the client’s real room
            starts. We use reference images, finishes, add-ons, and family use
            patterns to shape the quote.
          </p>
        </div>
        <div className="subpage-hero__image">
          <Image
            src="/great-wall/editorial/installer-boots.png"
            alt="Installer boots in a finished luxury room"
            fill
            sizes="(min-width: 900px) 42vw, 100vw"
          />
        </div>
      </RevealSection>
      <RevealSection className="section-shell">
        <ProductGallery items={discoveryItems} />
      </RevealSection>
    </main>
  );
}
