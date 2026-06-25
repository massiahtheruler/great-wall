import MediaWallBuilder from "@/components/MediaWallBuilder";
import RevealSection from "@/components/RevealSection";

export default function BuilderPage() {
  return (
    <main className="subpage builder-page">
      <RevealSection className="subpage-hero builder-hero">
        <p className="fine-label">Model estimator</p>
        <h1>Build a media wall estimate from simple choices.</h1>
        <p>
          This starter page shows the moving parts: a selected base model,
          optional features, a blueprint-style SVG preview, and a running
          subtotal that updates from the same state.
        </p>
      </RevealSection>

      <RevealSection className="section-shell" delay={120}>
        <MediaWallBuilder />
      </RevealSection>
    </main>
  );
}
