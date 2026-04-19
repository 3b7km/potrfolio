import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Send, CheckCircle, ArrowUpRight } from "lucide-react";

export default function ExperienceContact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("sending");

    try {
      // Web3Forms — free form-to-email service (https://web3forms.com)
      // Messages will be sent directly to: youssefabdelhakam99@gmail.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f9ed969f-b4af-49d9-a2e8-3590111d70fc",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: "Portfolio Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback: open mailto if API fails
        window.location.href = `mailto:youssefabdelhakam99@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
        setFormState("idle");
      }
    } catch {
      // Fallback: open mailto if network fails
      window.location.href = `mailto:youssefabdelhakam99@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
      setFormState("idle");
    }

    // Reset after 4 seconds
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section id="contact" className="relative w-full py-32 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left: Giant CTA + Social Links */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 className="text-sm font-sans tracking-widest text-muted uppercase mb-8">
                (Contact)
              </h2>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-[10vw] font-syne font-bold uppercase tracking-tighter leading-[0.8] text-foreground mix-blend-difference"
              >
                Say <br/> <span className="text-muted">Hi!</span>
              </motion.h2>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4 mt-4">
              <a
                href="mailto:youssefabdelhakam99@gmail.com"
                className="group inline-flex items-center gap-3 text-sm font-sans text-muted hover:text-foreground transition-colors"
              >
                <Mail size={16} />
                <span>youssefabdelhakam99@gmail.com</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/youssef-abdelhakm-gamal-3b7km/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-sans text-muted hover:text-foreground transition-colors"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right: Inline Contact Form */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Name */}
              <div className="relative group">
                <label className="block text-xs font-sans uppercase tracking-widest text-muted mb-3">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-white/10 focus:border-foreground pb-3 text-lg font-syne text-foreground outline-none transition-colors placeholder:text-white/15"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="block text-xs font-sans uppercase tracking-widest text-muted mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border-b border-white/10 focus:border-foreground pb-3 text-lg font-syne text-foreground outline-none transition-colors placeholder:text-white/15"
                />
              </div>

              {/* Message */}
              <div className="relative group">
                <label className="block text-xs font-sans uppercase tracking-widest text-muted mb-3">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b border-white/10 focus:border-foreground pb-3 text-lg font-syne text-foreground outline-none transition-colors placeholder:text-white/15 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formState !== "idle"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-start inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-syne font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {formState === "idle" && (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                    />
                    Sending...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle size={14} />
                    Sent Successfully
                  </>
                )}
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
