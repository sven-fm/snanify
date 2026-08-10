import { ImageResponse } from "next/og";

export const alt = "Snanify — the river comes to you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Latin-only on purpose: ImageResponse has no Devanagari face loaded, so both
   locales share this card rather than one of them rendering as tofu. */
export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #080C19 0%, #101a33 55%, #0c1526 100%)",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* aarti glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 320,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(227,172,70,0.30) 0%, rgba(227,172,70,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22.2" stroke="#F4ECDB" strokeWidth="1.3" opacity="0.32" />
            <circle cx="24" cy="18.4" r="6.5" fill="#E3AC46" />
            <g stroke="#F4ECDB" strokeWidth="2.1" strokeLinecap="round" fill="none">
              <path d="M12.8 29.6Q24 35.8 35.2 29.6" opacity="0.92" />
              <path d="M6.6 33.9Q24 42.4 41.4 33.9" opacity="0.6" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              color: "#F4ECDB",
              fontSize: 26,
              letterSpacing: 10,
              textTransform: "uppercase",
            }}
          >
            Snanify
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#F4ECDB", fontSize: 96, lineHeight: 1.02 }}>
            The river
          </div>
          <div style={{ display: "flex", color: "#E3AC46", fontSize: 96, lineHeight: 1.02 }}>
            comes to you.
          </div>
          <div
            style={{
              display: "flex",
              color: "#98A0BB",
              fontSize: 30,
              marginTop: 28,
              maxWidth: 820,
            }}
          >
            A complete digital snan at India&apos;s most sacred waters — streamed to wherever you
            stand.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            color: "#98A0BB",
            fontSize: 22,
            borderTop: "1px solid #212950",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>Ganga</div>
          <div style={{ display: "flex", color: "#3FA096" }}>·</div>
          <div style={{ display: "flex" }}>Triveni Sangam</div>
          <div style={{ display: "flex", color: "#3FA096" }}>·</div>
          <div style={{ display: "flex" }}>Yamuna</div>
          <div style={{ display: "flex", color: "#3FA096" }}>·</div>
          <div style={{ display: "flex" }}>Godavari</div>
          <div style={{ display: "flex", color: "#3FA096" }}>·</div>
          <div style={{ display: "flex" }}>Shipra</div>
          <div style={{ display: "flex", color: "#3FA096" }}>·</div>
          <div style={{ display: "flex" }}>Kaveri</div>
        </div>
      </div>
    ),
    size,
  );
}
