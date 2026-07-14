"use client";

import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [leadForm, setLeadForm] = useState({
    active: false,
    step: 0,
    name: "",
    email: "",
    phone: "",
    projectInterest: ""
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "AI",
        text: "Hello! Welcome to Decor Lab. I am your AI Design Consultant. How can I assist you today?",
        options: [
          { text: "Explore Verticals", icon: "architecture", value: "explore_verticals" },
          { text: "Frequently Asked Questions", icon: "help_outline", value: "faq" },
          { text: "Start a Project", icon: "design_services", value: "lead_start" },
          { text: "Request Call Back", icon: "phone_callback", value: "callback_start" }
        ]
      }
    ]);

    const timer = setTimeout(() => setShowNotification(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const addMessage = (message: any) => setMessages((prev) => [...prev, message]);

  const simulateAITyping = (text: string, options: any = null, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ id: String(Date.now()), sender: "AI", text, options });
    }, delay);
  };

  const handleOptionClick = (option: any) => {
    addMessage({ id: String(Date.now()), sender: "user", text: option.text });

    if (option.value === "lead_start" || option.value === "callback_start") {
      setLeadForm({
        active: true, step: 1, name: "", email: "", phone: "",
        projectInterest: option.value === "callback_start" ? "Call Back Requested" : "New Project Inquiry"
      });
      simulateAITyping("I'd be happy to organize a consultation for you. First, may I know your **Name**?", []);
      return;
    }

    switch (option.value) {
      case "explore_verticals":
        simulateAITyping("What type of design service are you looking for?", [
          { text: "Parametric Architecture", icon: "domain", value: "proj_arch" },
          { text: "Luxury Residential Interiors", icon: "weekend", value: "proj_res" },
          { text: "Commercial & Retail Spaces", icon: "storefront", value: "proj_com" },
          { text: "Custom Furniture Design", icon: "chair", value: "proj_furn" }
        ]);
        break;
      case "proj_arch":
        simulateAITyping("Our architectural vertical, led by Ar. Rajdip Sinha, focuses on fluid, parametric design and organic structures.", [
          { text: "Inquire about Architecture", icon: "send", value: "lead_start" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "proj_res":
        simulateAITyping("We craft bespoke luxury residential interiors with over 32 years of legacy across India.", [
          { text: "Inquire about Residential", icon: "send", value: "lead_start" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "proj_com":
        simulateAITyping("From corporate headquarters to high-end retail, we optimize spaces for aesthetics and functionality.", [
          { text: "Inquire about Commercial", icon: "send", value: "lead_start" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "proj_furn":
        simulateAITyping("We provide end-to-end custom furniture curation and manufacturing to perfectly fit your spatial needs.", [
          { text: "Inquire about Furniture", icon: "send", value: "lead_start" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "faq":
        simulateAITyping("Choose a FAQ category to learn more:", [
          { text: "Project Timelines", icon: "schedule", value: "faq_time" },
          { text: "Our Presence in India", icon: "location_on", value: "faq_location" },
          { text: "Design Process", icon: "architecture", value: "faq_process" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "faq_time":
        simulateAITyping("Project timelines vary based on scale. A typical residential interior project takes **3 to 6 months**, while architectural builds can range from **12 to 24 months**.", [
          { text: "More FAQs", icon: "help_outline", value: "faq" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "faq_location":
        simulateAITyping("Decor Lab is headquartered in Kolkata, but we have successfully delivered over **500+ projects across 15 cities** in India.", [
          { text: "More FAQs", icon: "help_outline", value: "faq" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "faq_process":
        simulateAITyping("Our process begins with an in-depth consultation, followed by conceptual layouts, 3D modeling, material curation, and finally, turnkey execution.", [
          { text: "More FAQs", icon: "help_outline", value: "faq" },
          { text: "Main Menu", icon: "home", value: "main_menu" }
        ]);
        break;
      case "main_menu":
        simulateAITyping("How else can I assist you with your design project today?", [
          { text: "Explore Verticals", icon: "architecture", value: "explore_verticals" },
          { text: "Frequently Asked Questions", icon: "help_outline", value: "faq" },
          { text: "Start a Project", icon: "design_services", value: "lead_start" },
          { text: "Request Call Back", icon: "phone_callback", value: "callback_start" }
        ]);
        break;
      default:
        break;
    }
  };

  const handleLeadInputSubmit = (text: string) => {
    if (!text.trim()) return;
    addMessage({ id: String(Date.now()), sender: "user", text });

    if (leadForm.step === 1) {
      setLeadForm(prev => ({ ...prev, step: 2, name: text }));
      simulateAITyping(`Nice to meet you, ${text}! What is your **Email Address**?`, []);
    } else if (leadForm.step === 2) {
      setLeadForm(prev => ({ ...prev, step: 3, email: text }));
      simulateAITyping("Thank you. Finally, what is your **Phone Number**?", []);
    } else if (leadForm.step === 3) {
      const finalForm = { ...leadForm, phone: text, timestamp: new Date().toISOString() };
      // Here you can save the lead or call an API
      setLeadForm({ active: false, step: 0, name: "", email: "", phone: "", projectInterest: "" });
      simulateAITyping(
        `Got it! Thank you, ${finalForm.name}. Your details have been submitted. Our design team will reach out to you at **${finalForm.email}** shortly.`,
        [{ text: "Main Menu", icon: "home", value: "main_menu" }]
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Notification bubble ── */}
      {showNotification && !isOpen && (
        <div
          className="absolute bottom-20 right-0 flex items-center gap-2.5 bg-white text-[#142216] text-[11px] font-semibold px-4 py-2.5 rounded-2xl shadow-2xl whitespace-nowrap border border-black/5"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          <span className="flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#C9A84C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]"></span>
          </span>
          Planning a design project? Let's chat!
          <button
            onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
            className="ml-1 text-black/30 hover:text-black/60 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* ── FAB & Contact Options ── */}
      <div className="relative group flex flex-col items-end">
        {/* Floating Contact Options */}
        {!isOpen && (
          <div className={`absolute bottom-full pb-3 right-0 flex flex-col-reverse items-end gap-3 transition-all duration-300 origin-bottom z-[-1] ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 translate-y-4 scale-90 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto'
          }`}>
            
            {/* Email Button */}
            <a 
              href="mailto:contact@decorlab.in" 
              className="group/btn relative w-12 h-12 bg-[#2D2D2D] hover:bg-[#1a1a1a] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer mr-1"
              aria-label="Email Us"
            >
              <span className="material-symbols-outlined text-white text-[20px] font-bold">mail</span>
              <span className="absolute right-14 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                Email
              </span>
            </a>

            {/* Call Button */}
            <a 
              href="tel:+919999999999" 
              className="group/btn relative w-12 h-12 bg-[#C9A84C] hover:bg-[#E5C76B] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer mr-1"
              aria-label="Call Now"
            >
              <span className="material-symbols-outlined text-white text-[20px] font-bold">call</span>
              <span className="absolute right-14 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                Call
              </span>
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              rel="noreferrer" 
              className="group/btn relative w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer mr-1"
              aria-label="WhatsApp Now"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span className="absolute right-14 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                WhatsApp
              </span>
            </a>

            {/* AI Chat Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(true); setIsMenuOpen(false); }}
              className="group/btn relative w-12 h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer mr-1"
              aria-label="AI Chat"
            >
              <span className="material-symbols-outlined text-[#0b0b0a] text-[24px] font-bold">robot_2</span>
              <span className="absolute right-14 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                AI Chat
              </span>
            </button>
          </div>
        )}

        <button
          onClick={() => { 
            if (isOpen) {
              setIsOpen(false);
            } else {
              setIsMenuOpen(!isMenuOpen);
              setShowNotification(false);
            }
          }}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-10 ${isMenuOpen ? 'rotate-45' : ''}`}
          style={{ background: "linear-gradient(135deg, #1f1f1f 0%, #0b0b0a 100%)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <span
            className={`material-symbols-outlined text-white text-2xl transition-all duration-300 ${isOpen || isMenuOpen ? "opacity-0 absolute" : "opacity-100"}`}
          >
            support_agent
          </span>
          <span
            className={`material-symbols-outlined text-white text-3xl transition-all duration-300 ${isOpen || isMenuOpen ? "opacity-100" : "opacity-0 absolute"}`}
          >
            add
          </span>
          {/* Gold dot */}
          <span className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#C9A84C] border-2 border-[#1f1f1f] transition-opacity duration-300 ${isOpen || isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
        </button>
      </div>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 flex flex-col overflow-hidden"
          style={{
            width: "min(360px, calc(100vw - 24px))",
            height: "min(520px, calc(100vh - 140px))",
            borderRadius: "20px",
            background: "#0b0b0a",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)"
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-[#C9A84C] select-none"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}
                >
                  AI
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
                  style={{ borderColor: "#0b0b0a" }}
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-none mb-1">Decor AI</div>
                <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Virtual Consultant
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
            {messages.map((msg) => {
              const isAI = msg.sender === "AI";
              return (
                <div key={msg.id} className={`flex flex-col ${isAI ? "items-start" : "items-end"}`}>
                  {/* Bubble */}
                  <div
                    className="max-w-[88%] text-xs leading-relaxed px-4 py-3"
                    style={{
                      borderRadius: isAI ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      background: isAI ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #2b2b2b, #1f1f1f)",
                      color: isAI ? "rgba(255,255,255,0.88)" : "#fff",
                      border: isAI ? "1px solid rgba(255,255,255,0.06)" : "none"
                    }}
                  >
                    {msg.text.split("**").map((chunk: string, idx: number) =>
                      idx % 2 === 1
                        ? <strong key={idx} style={{ color: "#C9A84C", fontWeight: 700 }}>{chunk}</strong>
                        : chunk
                    )}
                  </div>

                  {/* Option chips */}
                  {isAI && msg.options && msg.options.length > 0 && (
                    <div className="flex flex-col gap-2 mt-3 w-full max-w-[95%]">
                      {msg.options.map((opt: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-left text-[11px] font-semibold cursor-pointer transition-all active:scale-[0.98] rounded-xl"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            color: "rgba(255,255,255,0.8)"
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.color = "#C9A84C"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                        >
                          {opt.icon && (
                            <span className="material-symbols-outlined text-sm shrink-0" style={{ color: "#C9A84C" }}>
                              {opt.icon}
                            </span>
                          )}
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing dots */}
            {isTyping && (
              <div className="flex items-start">
                <div
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[0, 150, 300].map(d => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#C9A84C", animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* ── Lead Input ── */}
          {leadForm.active && (
            <div className="shrink-0 px-4 pb-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  const input = e.target.elements.leadInput;
                  if (input.value.trim()) {
                    handleLeadInputSubmit(input.value);
                    input.value = "";
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <input
                  name="leadInput"
                  type={leadForm.step === 2 ? "email" : "text"}
                  placeholder={
                    leadForm.step === 1 ? "Your name..." :
                    leadForm.step === 2 ? "Your email..." :
                    "Phone number..."
                  }
                  required
                  autoFocus
                  autoComplete="off"
                  className="flex-1 bg-transparent text-xs text-white outline-none placeholder-white/25"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:opacity-80 shrink-0"
                  style={{ background: "#C9A84C" }}
                >
                  <span className="material-symbols-outlined text-sm text-[#0b0b0a]">send</span>
                </button>
              </form>
            </div>
          )}

          {/* ── Footer ── */}
          {!leadForm.active && (
            <div
              className="shrink-0 py-3 text-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                Powered by Decor Lab
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
