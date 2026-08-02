import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/siteConfig";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkDevice = () => setIsDesktop(window.innerWidth >= 768);
    checkDevice();

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [isDesktop]);

  useEffect(() => {
    if (isOpen && isDesktop) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isDesktop]);

  const getWhatsAppUrl = (customMessage?: string) => {
    const baseUrl = `${siteConfig.links.whatsappUrl}${siteConfig.phone}`;
    const baseText = `${siteConfig.whatsappText} Gostaria de falar com algum atendente.`;

    const finalText = customMessage
      ? `${baseText}\n\nMensagem: ${customMessage}`
      : baseText;

    return `${baseUrl}?text=${encodeURIComponent(finalText)}`;
  };

  const handleFabClick = () => {
    if (isDesktop) {
      setIsOpen((prev) => !prev);
    } else {
      window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();

    if (text) {
      window.open(getWhatsAppUrl(text), "_blank", "noopener,noreferrer");
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-4 font-sans">
      <div
        className={`
          w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col 
          origin-bottom-right transition-all duration-300 ease-out
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="bg-[#25D366] text-white p-4 flex justify-between items-center shadow-sm z-10">
          <span className="font-semibold text-sm">Atendimento</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-green-100 transition-colors cursor-pointer"
            aria-label="Fechar janela"
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 bg-gray-50 h-36 overflow-y-auto">
          <div className="bg-white border border-gray-100 p-3 rounded-xl rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[90%] leading-relaxed">
            Olá! Sou o assistente virtual da Comptel Informática. Como posso te
            ajudar?
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-shadow placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-[#25D366] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>

      <button
        onClick={handleFabClick}
        className="w-14 h-14 bg-[#25D366] hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-105 cursor-pointer transition-transform duration-300 relative group"
        aria-label="Abrir atendimento pelo WhatsApp"
        type="button"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
