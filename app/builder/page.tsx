import MediaWallBuilder from "@/components/MediaWallBuilder";
import RevealSection from "@/components/RevealSection";

export default function BuilderPage() {
  return (
    <main className="subpage builder-page">
      <RevealSection className="subpage-hero builder-hero">
        <p className="fine-label">Model estimator</p>
        <h1>Build a media wall estimate from simple choices.</h1>
        <p>
          Design your custom media wall. Select your preferred model,
          customize it with available upgrades, and receive an estimated
          project cost before requesting your exact quote.
        </p>
      </RevealSection>

      <RevealSection className="section-shell" delay={120}>
        <MediaWallBuilder />
      </RevealSection>
    </main>
  );
}
