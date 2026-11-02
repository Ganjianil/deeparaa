"use client";

import { useState } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! 👋 Welcome to Deepara Solutions. Are you looking for a website, mobile app, digital marketing, or another service?",
    },
  ]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = message.trim();
    if (!text || isLoading) return;

    setMessage("");
    setMessages((previous) => [...previous, { role: "user", text }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, I couldn't connect right now. Please try again or contact our team on WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function contactWhatsApp() {
    window.open(
      `https://wa.me/919985888237?text=${encodeURIComponent(
        "Hi Deepara Solutions, I would like to know more about your services.",
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="chat-assistant fixed bottom-5 right-4 z-[9999] sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="mb-4 flex h-[min(480px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-violet-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Deepara AI Assistant</h3>
                <p className="text-xs text-white/80">
                  {isLoading ? "Thinking..." : "How can I help you?"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl p-3 text-sm shadow-sm ${
                  item.role === "user"
                    ? "ml-auto rounded-tr-sm bg-blue-600 text-white"
                    : "rounded-tl-sm bg-white text-slate-700"
                }`}
              >
                {item.text}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-slate-500 shadow-sm">
                Deepara is typing...
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3 pt-2">
            <p className="text-xs text-slate-500">Want to speak to our team?</p>
            <button
              type="button"
              onClick={contactWhatsApp}
              className="text-xs font-semibold text-green-600 hover:text-green-700"
            >
              WhatsApp us
            </button>
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 bg-white p-3"
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              aria-label="Your message"
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100"
            />

            <button
              type="submit"
              aria-label="Send message to AI"
              disabled={isLoading || !message.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <div className="mb-3 hidden justify-end sm:flex">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg border border-[#d6e5ed] bg-white px-4 py-3 text-sm font-semibold text-[#173f5a] shadow-lg transition hover:shadow-xl"
          >
            Hi, I&apos;m Deepara 👋{" "}
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0878b5] text-white shadow-xl ring-4 ring-white/70 transition hover:scale-105 sm:h-14 sm:w-14"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
