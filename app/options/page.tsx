import Image from "next/image";
import RevealSection from "@/components/RevealSection";
import { optionCategories } from "@/lib/catalog";

export default function OptionsPage() {
  return (
    <main className="subpage">
      <RevealSection className="subpage-hero">
        <p className="fine-label">Options / gallery</p>
        <h1>The full brand lane, staged honestly for v1.</h1>
        <p>
          Media walls are the strongest launch category. The rest of the brand
          has a place to breathe now, then fill in as tables, centerpieces,
          outdoor fire features, and accessories grow.
        </p>
      </RevealSection>
      <RevealSection className="section-shell">
        <div className="option-grid option-grid--large">
          {optionCategories.map((option) => (
            <article
              key={option.title}
              className={`option-tile ${option.status === "soon" ? "option-tile--soon" : "option-tile--active"}`}
            >
              <div className="option-tile__media">
                <Image src={option.image} alt={option.title} fill sizes="33vw" />
              </div>
              <p className="fine-label">{option.availability}</p>
              <h2>{option.title}</h2>
              <p>{option.summary}</p>
              {option.status === "active" ? (
                <a href="#estimate" className="text-link">
                  Request direction
                </a>
              ) : (
                <span className="text-link text-link--disabled" aria-disabled="true">
                  Feature soon available
                </span>
              )}
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
