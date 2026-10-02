import React from "react";

const imgBackgroundPixelArtLandscape1 =
  "https://www.figma.com/api/mcp/asset/86cae691-0fd7-49b3-8ee5-92ea4e59155a.png";
const imgBrandMesDasCriancasLogo =
  "https://www.figma.com/api/mcp/asset/64d3ec45-df8f-498f-a3e2-7f4fec87ca94.png";
const imgBackgroundPixelArtLandscape =
  "https://www.figma.com/api/mcp/asset/e94dce50-4bde-4415-93ca-fe69f6962624.svg";

export default function ModeloMesDasCriancas({ data, isSingle }) {
  const fp = (figmaPx) => {
    const scale = isSingle ? 794 / 298 : 794 / 298 / 2;
    return `${Math.round(figmaPx * scale * 10) / 10}px`;
  };

  const titulo1 = data.titulo1 || "Kit Teclado Gamer + Mouse Gamer";
  const titulo2 = data.titulo2 || "Teclado mecânico RGB\nMouse com 14000 dpi";
  const precoStr = data.preco || "9.999,00";
  const [precoInteiroRaw = "9.999", precoCentavosRaw = "00"] =
    String(precoStr).split(",");
  const precoInteiro = String(precoInteiroRaw).replace(/\D/g, "") || "9999";
  const precoAntigoStr = data.precoAntigo || "538,00";
  const [precoAntigoInteiroRaw = "538", precoAntigoCentavosRaw = "00"] =
    String(precoAntigoStr).split(",");
  const precoAntigoInteiro = String(precoAntigoInteiroRaw).replace(/\D/g, "") || "538";

  const mostrarPrecoAntigo = Boolean(data.precoAntigo && data.precoAntigo.trim());

  const labelTitleLines = titulo1.split("\n");
  const subtitleLines = titulo2.split("\n");

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: "#5cd8f0",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: fp(298), height: fp(421), background: "#5cd8f0" }}
      />

      <div
        className="absolute left-[25px] top-[86px] rounded-[16px] bg-white"
        style={{ width: fp(245), height: fp(263) }}
      />

      <div
        className="absolute left-[71px] top-[37px] rounded-tl-[16px] rounded-tr-[16px] bg-white"
        style={{ width: fp(154), height: fp(60) }}
      />

      <div
        className="absolute left-[2px] top-0 overflow-hidden"
        style={{
          width: fp(296),
          height: fp(421),
          maskImage: `url("${imgBackgroundPixelArtLandscape}")`,
          maskPosition: "-2px 0px",
          maskSize: `${fp(298)} ${fp(421)}`,
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url("${imgBackgroundPixelArtLandscape}")`,
          WebkitMaskPosition: "-2px 0px",
          WebkitMaskSize: `${fp(298)} ${fp(421)}`,
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            src={imgBackgroundPixelArtLandscape1}
            className="absolute max-w-none"
            style={{
              width: fp(487),
              height: fp(270),
              left: fp(-56),
              top: fp(207),
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <div
        className="absolute z-20 left-0 top-0"
        style={{ width: fp(298), height: fp(421) }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
          style={{
            width: fp(137),
            height: fp(53),
            top: fp(44),
            maskImage: `url("${imgBackgroundPixelArtLandscape}")`,
            maskPosition: "-79px -44px",
            maskSize: `${fp(298)} ${fp(421)}`,
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url("${imgBackgroundPixelArtLandscape}")`,
            WebkitMaskPosition: "-79px -44px",
            WebkitMaskSize: `${fp(298)} ${fp(421)}`,
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img
            alt="Mês das Crianças"
            src={imgBrandMesDasCriancasLogo}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: "scale(1.85)",
              transformOrigin: "center",
            }}
          />
        </div>

        <div
          className="absolute left-0 top-0 text-center text-[#303030]"
          style={{
            width: fp(218),
            height: fp(92),
            left: fp(39),
            top: fp(107),
          }}
        >
          {labelTitleLines.map((line, index) => (
            <p
              key={`title-${index}`}
              className="font-['Roboto:Bold'] font-bold m-0"
              style={{
                fontSize: fp(24),
                lineHeight: fp(28),
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              {line}
            </p>
          ))}

          <div
            className="font-['Roboto:Medium'] font-medium"
            style={{
              marginTop: fp(6),
              fontSize: fp(14),
              lineHeight: fp(18),
            }}
          >
            {subtitleLines.map((line, index) => (
              <p key={`subtitle-${index}`} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          className="absolute left-0 top-0 text-[#303030]"
          style={{
            width: fp(218),
            height: fp(56),
            left: fp(39),
            top: fp(215),
          }}
        >
          <p
            className="font-['Roboto:SemiBold'] font-semibold text-center m-0"
            style={{
              fontSize: fp(12),
              lineHeight: fp(16),
              marginLeft: fp(86),
            }}
          >
            À VISTA
          </p>

          <div
            className="absolute left-0 top-0 flex items-baseline"
            style={{ left: fp(19), top: fp(22), width: fp(180) }}
          >
            <span
              className="font-['Roboto:Medium'] font-medium"
              style={{ fontSize: fp(14), marginRight: fp(3) }}
            >
              R$
            </span>

            <div className="flex items-end leading-none">
              <span
                className="font-['Roboto:Bold'] font-bold tracking-[-0.08em]"
                style={{ fontSize: fp(48), lineHeight: 1 }}
              >
                {precoInteiro},
              </span>
              <span
                className="font-['Roboto:Bold'] font-bold tracking-[-0.08em]"
                style={{
                  fontSize: fp(30.96),
                  lineHeight: 1,
                  marginLeft: fp(2),
                  transform: "translateY(-2px)",
                }}
              >
                {precoCentavosRaw}
              </span>
            </div>
          </div>
        </div>

        {mostrarPrecoAntigo && (
          <div
            className="absolute left-0 top-0"
            style={{ width: fp(106), height: fp(45), left: fp(56), top: fp(287) }}
          >
            <div className="absolute inset-0">
              <p
                className="absolute font-['Roboto:SemiBold'] font-semibold text-center m-0 text-[#303030]"
                style={{
                  fontSize: fp(12),
                  lineHeight: fp(16),
                  left: fp(44),
                  top: 0,
                }}
              >
                DE:
              </p>

              <div
                className="absolute left-0 top-0 flex items-baseline"
                style={{ left: 0, top: fp(22), width: fp(106) }}
              >
                <span
                  className="font-['Roboto:Medium'] font-medium text-[#303030]"
                  style={{ fontSize: fp(12), marginRight: fp(4) }}
                >
                  R$
                </span>

                <div className="relative flex items-end leading-none">
                  <span
                    className="font-['Roboto:Bold'] font-bold text-[#303030] tracking-[-0.08em]"
                    style={{ fontSize: fp(22), lineHeight: 1 }}
                  >
                    {precoAntigoInteiro},
                  </span>
                  <span
                    className="font-['Roboto:Bold'] font-bold text-[#303030] tracking-[-0.08em]"
                    style={{
                      fontSize: fp(14),
                      lineHeight: 1,
                      marginLeft: fp(2),
                      transform: "translateY(-2px)",
                    }}
                  >
                    {precoAntigoCentavosRaw}
                  </span>
                  <div
                    className="absolute left-0 right-0 bg-[#e60000]"
                    style={{
                      height: fp(3),
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute left-0 bottom-0 w-full" style={{ height: fp(90) }}>
        <div
          className="absolute left-0 bottom-0"
          style={{
            width: fp(298),
            height: fp(90),
            background: "linear-gradient(#3fb876 0%, #2ba15d 100%)",
          }}
        />

        <div
          className="absolute left-0 bottom-0"
          style={{
            width: fp(298),
            height: fp(28),
            background: "#7ecb6d",
            clipPath: "polygon(0 100%, 0 45%, 12% 52%, 18% 40%, 28% 55%, 39% 45%, 52% 60%, 60% 40%, 68% 56%, 80% 44%, 92% 56%, 100% 46%, 100% 100%)",
          }}
        />

        <div
          className="absolute left-0 bottom-0"
          style={{
            width: fp(298),
            height: fp(32),
            background: "#64b45e",
            clipPath: "polygon(0 100%, 0 70%, 14% 60%, 24% 70%, 36% 56%, 50% 68%, 64% 55%, 79% 65%, 100% 58%, 100% 100%)",
          }}
        />

        <div
          className="absolute left-0 bottom-0"
          style={{
            width: fp(298),
            height: fp(18),
            background: "#63aa55",
            clipPath: "polygon(0 100%, 0 55%, 20% 37%, 26% 50%, 44% 35%, 62% 53%, 76% 39%, 83% 50%, 100% 42%, 100% 100%)",
          }}
        />
      </div>
    </div>
  );
}
