import { siteConfig } from "../../siteConfig";

const chatWindow = document.getElementById("chat-window");
const chatFab = document.getElementById("chat-fab");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input") as HTMLInputElement;

// Substitua pelo seu número (DDI + DDD + Número)
const phoneNumber = "5527996132941";
const TEMPO_PARA_APARECER = 20000;

const toggleChat = () => {
  if (checkDeviceTypeByWidth() === "desktop") {
    chatWindow?.classList.toggle("show");
    if (chatWindow?.classList.contains("show")) {
      chatInput?.focus();
    }
  }
};

chatFab?.addEventListener("click", toggleChat);
closeChat?.addEventListener("click", () =>
  chatWindow?.classList.remove("show"),
);

const sendMessage = () => {
  const text = chatInput?.value.trim();
  if (!text) return;

  const url = `${siteConfig.links.whatsappUrl}${siteConfig.phone}?text=${siteConfig.whatsappText}Gostaria de falar com algum atendente\n${encodeURIComponent(text)}`;
  window.open(url, "_blank");

  chatInput.value = "";
  chatWindow?.classList.remove("show");
};

sendBtn?.addEventListener("click", sendMessage);
chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

setTimeout(() => {
  if (!chatWindow?.classList.contains("show")) {
    toggleChat();
  }
}, TEMPO_PARA_APARECER);

function checkDeviceTypeByWidth(): "mobile" | "tablet" | "desktop" {
  const width = window.innerWidth;

  if (width < 768) {
    return "mobile";
  } else if (width >= 768 && width <= 1024) {
    return "tablet";
  } else {
    return "desktop";
  }
}
