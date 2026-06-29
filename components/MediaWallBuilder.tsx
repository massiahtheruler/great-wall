"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import {
  BuilderModel,
  BuilderModelId,
  BuilderOptionId,
  buildBuilderEstimateLines,
  builderModels,
  builderOptions,
  calculateBuilderTotal,
  formatEstimatePrice,
  getBuilderProofProject,
} from "@/lib/mediaWallBuilder";

const defaultOptionIds: BuilderOptionId[] = ["soundbar"];
const trustPoints = [
  "Free consultation",
  "Professional installation",
  "Custom built for your home",
  "Serving New Jersey",
];

export default function MediaWallBuilder() {
  const [selectedModelId, setSelectedModelId] = useState<BuilderModelId>("bp1");
  const [selectedOptionIds, setSelectedOptionIds] =
    useState<BuilderOptionId[]>(defaultOptionIds);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "fallback"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const selectedModel =
    builderModels.find((model) => model.id === selectedModelId) ??
    builderModels[0];

  const selectedOptions = builderOptions.filter((option) =>
    selectedOptionIds.includes(option.id),
  );

  const total = calculateBuilderTotal(selectedModel, selectedOptionIds);
  const estimateLines = buildBuilderEstimateLines(
    selectedModel,
    selectedOptionIds,
  );
  const proofProject = getBuilderProofProject(selectedOptionIds);
  const priceBreakdown = estimateLines
    .map((line) => `${line.label}: ${formatEstimatePrice(line.amount)}`)
    .join("\n");

  const toggleOption = (optionId: BuilderOptionId) => {
    setSelectedOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
  };

  const focusQuoteForm = () => {
    if (!formRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const headerOffset = window.matchMedia("(max-width: 640px)").matches
      ? 170
      : 116;
    const formTop =
      formRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(formTop - headerOffset, 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });

    window.setTimeout(
      () => {
        formRef.current
          ?.querySelector<HTMLInputElement>("input[name='name']")
          ?.focus({ preventScroll: true });
      },
      reducedMotion ? 0 : 360,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus("fallback");
      const formData = new FormData(form);
      const body = Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      window.location.href = `mailto:hello@greatwalloflegends.com?subject=${encodeURIComponent(
        `Great Wall exact quote request: ${selectedModel.name}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("fallback");
    }
  };

  return (
    <section
      className="builder-system"
      aria-label="Media wall estimate builder"
    >
      <div className="builder-preview-panel">
        <div className="builder-preview-panel__heading">
          <div>
            <p className="fine-label">Live blueprint</p>
            <h2>{selectedModel.name}</h2>
          </div>
          <strong>{formatEstimatePrice(total)}</strong>
        </div>

        <BlueprintPreview
          model={selectedModel}
          selectedOptionIds={selectedOptionIds}
        />

        <p className="builder-disclaimer">
          Starter estimate only. Final quote still depends on room measurements,
          electrical needs, material choices, and install conditions.
        </p>

        <button
          type="button"
          className="stone-button builder-preview-cta"
          onClick={focusQuoteForm}
        >
          Request My Quote
        </button>
      </div>

      <div className="builder-controls">
        <section
          className="builder-control-group"
          aria-labelledby="model-picker-heading"
        >
          <div className="builder-control-group__heading">
            <p className="fine-label">Step 1</p>
            <h3 id="model-picker-heading">Choose a base model</h3>
          </div>

          <div className="builder-model-list">
            {builderModels.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`builder-model-card ${
                  selectedModel.id === model.id ? "is-selected" : ""
                }`}
                onClick={() => setSelectedModelId(model.id)}
                aria-pressed={selectedModel.id === model.id}
              >
                <span>{model.name}</span>
                <strong>{formatEstimatePrice(model.basePrice)}</strong>
                <small>{model.widthInches}&quot; wide starting point</small>
              </button>
            ))}
          </div>
        </section>

        <section
          className="builder-control-group"
          aria-labelledby="option-picker-heading"
        >
          <div className="builder-control-group__heading">
            <p className="fine-label">Step 2</p>
            <h3 id="option-picker-heading">Add features</h3>
          </div>

          <div className="builder-option-list">
            {builderOptions.map((option) => {
              const checked = selectedOptionIds.includes(option.id);

              return (
                <label key={option.id} className="builder-option-row">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.id)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </span>
                  <em>+{formatEstimatePrice(option.price)}</em>
                </label>
              );
            })}
          </div>
        </section>

        <section
          className="builder-total-card builder-total-card--action"
          aria-label="Estimate summary"
        >
          <div className="builder-total-card__intro">
            <span>Estimated Starting Price</span>
            <strong>{formatEstimatePrice(total)}</strong>
          </div>
          <p>
            This estimate is for planning purposes. Final pricing depends on
            measurements and installation.
          </p>
          <div className="builder-price-lines" aria-label="Price breakdown">
            {estimateLines.map((line) => (
              <div
                key={`${line.kind}-${line.label}`}
                className={`builder-price-line builder-price-line--${line.kind}`}
              >
                <span>{line.label}</span>
                <strong>
                  {line.kind === "upgrade" ? "+" : ""}
                  {formatEstimatePrice(line.amount)}
                </strong>
              </div>
            ))}
          </div>
          <div className="builder-total-card__final">
            <span>Estimated total</span>
            <strong>{formatEstimatePrice(total)}</strong>
          </div>
          <button
            type="button"
            className="stone-button"
            onClick={focusQuoteForm}
          >
            Get My Exact Quote
          </button>
          <p className="builder-urgency">
            Schedule your consultation today. Most projects are measured within
            a few days.
          </p>
        </section>

        <section
          className="builder-trust-panel"
          aria-label="Why homeowners choose Great Wall"
        >
          {trustPoints.map((point) => (
            <span key={point}>✓ {point}</span>
          ))}
        </section>

        <section
          className="builder-installations"
          aria-labelledby="recent-installations-heading"
        >
          <div className="builder-control-group__heading">
            <p className="fine-label">{proofProject.eyebrow}</p>
            <h3 id="recent-installations-heading">Recent install match</h3>
          </div>
          <figure className="builder-installation-card">
            <Image
              src={proofProject.image}
              alt={proofProject.alt}
              width={760}
              height={520}
              sizes="(max-width: 980px) 100vw, 42vw"
            />
            <figcaption>
              <strong>{proofProject.title}</strong>
              <span>{proofProject.description}</span>
            </figcaption>
          </figure>
        </section>

        <form
          ref={formRef}
          className="builder-quote-form"
          onSubmit={handleSubmit}
        >
          <div className="builder-control-group__heading">
            <p className="fine-label">Ready for an exact quote?</p>
          </div>
          <input
            type="hidden"
            name="selected_model"
            value={selectedModel.name}
          />
          <input
            type="hidden"
            name="selected_options"
            value={
              selectedOptions.map((option) => option.label).join(", ") || "None"
            }
          />
          <input
            type="hidden"
            name="estimate_total"
            value={formatEstimatePrice(total)}
          />
          <textarea
            name="price_breakdown"
            value={priceBreakdown}
            readOnly
            hidden
          />

          <div className="builder-form-grid">
            <label>
              Name *
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
            <label>
              Phone *
              <input
                name="phone"
                required
                autoComplete="tel"
                placeholder="Best number"
              />
            </label>
            <label>
              Email *
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Project Address
              <input
                name="project_address"
                autoComplete="street-address"
                placeholder="Optional"
              />
            </label>
            <label>
              Room Width
              <input
                name="room_width"
                inputMode="decimal"
                placeholder="Optional"
              />
            </label>
          </div>

          <label className="builder-consultation-check">
            <input
              type="checkbox"
              name="in_home_consultation"
              value="Yes"
            />
            <span>I&apos;m interested in an in-home consultation.</span>
          </label>

          <button
            className="stone-button"
            type="submit"
            disabled={formStatus === "sending"}
          >
            {formStatus === "sending" ? "Sending..." : "Request My Quote"}
          </button>

          {formStatus === "sent" && (
            <p className="form-note">
              Thanks. We&apos;ll reach out within one business day to discuss
              your project and provide your full quote.
            </p>
          )}
          {formStatus === "fallback" && (
            <p className="form-note">
              Email delivery is not configured yet, so an email draft opened
              with this project summary.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function BlueprintPreview({
  model,
  selectedOptionIds,
}: {
  model: BuilderModel;
  selectedOptionIds: BuilderOptionId[];
}) {
  const hasOption = (optionId: BuilderOptionId) =>
    selectedOptionIds.includes(optionId);

  const wallWidth = model.id === "bp1" ? 720 : model.id === "bp2" ? 780 : 860;
  const wallX = (1000 - wallWidth) / 2;

  return (
    <figure className="blueprint-frame">
      <svg
        viewBox="0 0 1000 680"
        role="img"
        aria-labelledby="blueprint-title blueprint-description"
      >
        <title id="blueprint-title">{`${model.name} blueprint preview`}</title>
        <desc id="blueprint-description">
          A simplified media wall diagram that updates as options are selected.
        </desc>

        <defs>
          <pattern
            id="blueprint-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(31, 61, 78, 0.12)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect className="blueprint-bg" width="1000" height="680" rx="18" />
        <rect className="blueprint-grid" width="1000" height="680" />

        <g className="blueprint-wall">
          <ExtrudedBox
            x={wallX}
            y={86}
            width={wallWidth}
            height={470}
            depth={22}
            rx={5}
          />
          <RecessedBox
            x={350}
            y={140}
            width={300}
            height={168}
            depth={16}
            rx={3}
          />
          <text x="500" y="130" textAnchor="middle">
            {model.tvLabel}
          </text>

          {hasOption("soundbar") && (
            <RecessedBox
              className="blueprint-accent"
              x={380}
              y={322}
              width={240}
              height={30}
              depth={10}
              rx={3}
            />
          )}

          {hasOption("mantel") && (
            <ExtrudedBox
              className="blueprint-wood"
              x={318}
              y={364}
              width={364}
              height={20}
              depth={10}
              rx={3}
            />
          )}

          <RecessedBox
            x={380}
            y={405}
            width={240}
            height={88}
            depth={14}
            rx={4}
          />
          <text x="500" y="523" textAnchor="middle">
            {model.fireplaceLabel}
          </text>

          {hasOption("sideShelves") && (
            <g className="blueprint-shelves">
              <RecessedBox
                x={wallX + 42}
                y={140}
                width={126}
                height={280}
                depth={12}
                rx={3}
              />
              <RecessedBox
                x={wallX + wallWidth - 168}
                y={140}
                width={126}
                height={280}
                depth={12}
                rx={3}
              />
              {[210, 280, 350].map((y) => (
                <g key={y}>
                  <line x1={wallX + 42} y1={y} x2={wallX + 168} y2={y} />
                  <line
                    x1={wallX + wallWidth - 168}
                    y1={y}
                    x2={wallX + wallWidth - 42}
                    y2={y}
                  />
                </g>
              ))}
            </g>
          )}

          {hasOption("lowerCabinets") && (
            <g className="blueprint-cabinets">
              <ExtrudedBox
                x={wallX + 48}
                y={508}
                width={wallWidth - 96}
                height={48}
                depth={10}
                rx={3}
              />
              <line x1="500" y1="508" x2="500" y2="556" />
            </g>
          )}

          {hasOption("ledLighting") && (
            <g className="blueprint-lighting">
              <line x1={wallX + 18} y1="104" x2={wallX + 18} y2="540" />
              <line
                x1={wallX + wallWidth - 18}
                y1="104"
                x2={wallX + wallWidth - 18}
                y2="540"
              />
            </g>
          )}

          {hasOption("premiumFinish") && (
            <rect
              className="blueprint-finish"
              x={wallX + 18}
              y="104"
              width={wallWidth - 36}
              height="434"
              rx="4"
            />
          )}
        </g>

        <g className="blueprint-dimensions">
          <line x1={wallX} y1="610" x2={wallX + wallWidth} y2="610" />
          <line x1={wallX} y1="595" x2={wallX} y2="625" />
          <line
            x1={wallX + wallWidth}
            y1="595"
            x2={wallX + wallWidth}
            y2="625"
          />
          <text x="500" y="646" textAnchor="middle">
            {model.widthInches}&quot; W
          </text>

          <line x1={wallX - 38} y1="86" x2={wallX - 38} y2="556" />
          <line x1={wallX - 53} y1="86" x2={wallX - 23} y2="86" />
          <line x1={wallX - 53} y1="556" x2={wallX - 23} y2="556" />
          <text
            x={wallX - 72}
            y="330"
            textAnchor="middle"
            transform={`rotate(-90 ${wallX - 72} 330)`}
          >
            {model.heightInches}&quot; H
          </text>
        </g>
      </svg>
      <figcaption>
        SVG pieces are conditionally rendered from the same state that powers
        the subtotal.
      </figcaption>
    </figure>
  );
}

function ExtrudedBox({
  x,
  y,
  width,
  height,
  depth = 14,
  rx = 3,
  className = "",
}: BlueprintBoxProps) {
  const right = x + width;
  const bottom = y + height;

  return (
    <g className={`blueprint-box blueprint-box--extruded ${className}`.trim()}>
      <path
        className="blueprint-box__side"
        d={`M ${right} ${y} L ${right + depth} ${y + depth} L ${right + depth} ${bottom + depth} L ${right} ${bottom} Z`}
      />
      <path
        className="blueprint-box__bottom"
        d={`M ${x} ${bottom} L ${x + depth} ${bottom + depth} L ${right + depth} ${bottom + depth} L ${right} ${bottom} Z`}
      />
      <rect
        className="blueprint-box__back"
        x={x + depth}
        y={y + depth}
        width={width}
        height={height}
        rx={rx}
      />
      <rect
        className="blueprint-box__front"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
      />
      <DepthConnectors
        x={x}
        y={y}
        width={width}
        height={height}
        depth={depth}
      />
    </g>
  );
}

function RecessedBox({
  x,
  y,
  width,
  height,
  depth = 14,
  rx = 3,
  className = "",
}: BlueprintBoxProps) {
  return (
    <g className={`blueprint-box blueprint-box--recessed ${className}`.trim()}>
      <rect
        className="blueprint-box__back"
        x={x + depth}
        y={y + depth}
        width={width}
        height={height}
        rx={rx}
      />
      <DepthConnectors
        x={x}
        y={y}
        width={width}
        height={height}
        depth={depth}
      />
      <path
        className="blueprint-box__inside-top"
        d={`M ${x} ${y} L ${x + depth} ${y + depth} L ${x + width + depth} ${y + depth} L ${x + width} ${y} Z`}
      />
      <path
        className="blueprint-box__inside-left"
        d={`M ${x} ${y} L ${x + depth} ${y + depth} L ${x + depth} ${y + height + depth} L ${x} ${y + height} Z`}
      />
      <rect
        className="blueprint-box__front"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
      />
    </g>
  );
}

function DepthConnectors({
  x,
  y,
  width,
  height,
  depth,
}: BlueprintConnectorProps) {
  const right = x + width;
  const bottom = y + height;

  return (
    <g className="blueprint-box__connectors">
      <line x1={x} y1={y} x2={x + depth} y2={y + depth} />
      <line x1={right} y1={y} x2={right + depth} y2={y + depth} />
      <line x1={x} y1={bottom} x2={x + depth} y2={bottom + depth} />
      <line x1={right} y1={bottom} x2={right + depth} y2={bottom + depth} />
    </g>
  );
}

type BlueprintBoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  depth?: number;
  rx?: number;
  className?: string;
};

type BlueprintConnectorProps = Pick<
  BlueprintBoxProps,
  "x" | "y" | "width" | "height"
> & {
  depth: number;
};
