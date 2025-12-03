import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "RetroCollect - Vintage Gaming Store";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://hidden-snak-gam-chall.vercel.app";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient overlay - cyan/magenta to match logo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255, 0, 255, 0.08) 0%, transparent 40%)",
          }}
        />

        {/* Logo */}
        <img
          src={`${siteUrl}/retro_logo.webp`}
          width={500}
          height={300}
          style={{
            objectFit: "contain",
          }}
          alt="RetroCollect Logo"
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              color: "#00ffff",
              textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Vintage Gaming Store
          </div>
        </div>

        {/* Corner decorations */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            display: "flex",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#00ffff",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#ff00ff",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(255, 0, 255, 0.8)",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#00ffff",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            fontSize: "16px",
            color: "#ff00ff",
            textShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
          }}
        >
          Nuit de l&apos;Info 2025
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
