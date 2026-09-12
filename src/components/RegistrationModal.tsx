"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  Ticket, 
  Sparkles, 
  QrCode, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  User,
  Mail,
  Building,
  GraduationCap
} from "lucide-react";
import confetti from "canvas-confetti";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [tier, setTier] = useState<"ieee_student" | "student" | "faculty" | "industry">("ieee_student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    ieeeNumber: "",
    track: "Crop Health & Multispectral NDVI",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `GRSS-AGRI-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00FF66", "#00E5FF", "#FFFFFF", "#10B981"],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-lg animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-space-900 border border-ndvi-neon/40 rounded-2xl shadow-2xl overflow-hidden corner-bracket">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ndvi-neon/20 bg-space-950/80">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-ndvi-neon shadow-neon-green" />
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              {submitted ? "MISSION ACCESS BADGE GENERATED" : "ACQUIRE EVENT DELEGATE PASS"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto font-sans">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Ticket Tier Selection */}
              <div>
                <label className="block text-xs font-mono text-ndvi-neon mb-2 uppercase tracking-wider">
                  Select Delegate Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { id: "ieee_student", name: "IEEE Student", price: "₹199", tag: "Popular" },
                    { id: "student", name: "Non-Member", price: "₹399", tag: "Student" },
                    { id: "faculty", name: "Faculty / Sci", price: "₹799", tag: "Academic" },
                    { id: "industry", name: "Industry / Pro", price: "₹1,499", tag: "Full Pass" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setTier(item.id as any)}
                      className={`relative flex flex-col p-3 rounded-xl border text-left transition-all ${
                        tier === item.id
                          ? "border-ndvi-neon bg-ndvi-neon/10 shadow-neon-green"
                          : "border-slate-800 bg-space-950/60 hover:border-slate-700"
                      }`}
                    >
                      {item.tag && (
                        <span className="text-[9px] font-mono font-bold text-radar-cyan uppercase mb-1">
                          {item.tag}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-white">{item.name}</span>
                      <span className="text-base font-bold font-mono text-ndvi-neon mt-1">
                        {item.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-ndvi-neon" /> Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Dr. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-ndvi-neon focus:ring-1 focus:ring-ndvi-neon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-ndvi-neon" /> Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="ananya@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-ndvi-neon focus:ring-1 focus:ring-ndvi-neon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-ndvi-neon" /> University / Organization *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. JSS STU / SJCE Mysuru"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-ndvi-neon focus:ring-1 focus:ring-ndvi-neon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-ndvi-neon" /> IEEE Member ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 98452109"
                    value={formData.ieeeNumber}
                    onChange={(e) => setFormData({ ...formData, ieeeNumber: e.target.value })}
                    className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-ndvi-neon focus:ring-1 focus:ring-ndvi-neon"
                  />
                </div>
              </div>

              {/* Primary Focus Track */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Primary Workshop Focus
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-space-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-ndvi-neon"
                >
                  <option>Multispectral NDVI & Crop Phenology Analysis</option>
                  <option>NISAR / Sentinel-1 Microwave Radar & Soil Moisture</option>
                  <option>AI & Deep Learning for Yield Estimation</option>
                  <option>UAV / Drone Hyperspectral Precision Agriculture</option>
                </select>
              </div>

              <div className="flex items-center gap-2 p-3 bg-ndvi-neon/5 border border-ndvi-neon/20 rounded-lg text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-ndvi-neon shrink-0" />
                <span>Includes IEEE GRSS certificate, dataset toolkit, and hands-on Google Earth Engine sandbox access.</span>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-ndvi-neon text-space-950 font-semibold font-mono text-sm shadow-neon-green hover:bg-ndvi-bright transition-all"
                >
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* Digital Satellite Ticket Badge */
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="relative p-6 bg-gradient-to-br from-space-950 via-space-900 to-space-950 border-2 border-ndvi-neon rounded-2xl shadow-neon-green overflow-hidden">
                {/* Background watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-ndvi-neon/10 to-transparent pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-ndvi-neon font-bold tracking-widest uppercase">
                      IEEE GRSS STUDENT BRANCH // DELEGATE PASS
                    </span>
                    <h4 className="text-xl font-display font-black text-white mt-0.5">
                      REMOTE SENSING IN AGRICULTURE &apos;26
                    </h4>
                  </div>
                  <div className="px-3 py-1 bg-ndvi-neon/20 border border-ndvi-neon rounded font-mono text-xs font-bold text-ndvi-neon">
                    {ticketId}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5 text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-slate-400">DELEGATE NAME</div>
                    <div className="font-bold text-white text-sm">{formData.name || "Alex Varma"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">CATEGORY</div>
                    <div className="font-bold text-ndvi-neon uppercase">{tier.replace("_", " ")}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">LOCATION</div>
                    <div className="font-bold text-slate-200">MYSURU, INDIA</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">ACCESS LEVEL</div>
                    <div className="font-bold text-radar-cyan">ALL-TRACKS + LAB</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-ndvi-neon" />
                    <div>
                      <div className="text-white font-bold">VERIFIED SATELLITE PASS</div>
                      <div className="text-[9px] text-slate-400">SCAN AT MAIN ENTRANCE DESK</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-300">DATES: NOV 14-15, 2026</div>
                    <div className="text-[9px] text-ndvi-neon">CAUVERY AGRI FIELD STUDY</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-ndvi-bright">
                  <CheckCircle2 className="w-4 h-4 text-ndvi-neon" />
                  <span>Confirmation email dispatched to {formData.email || "your inbox"}!</span>
                </div>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-ndvi-neon text-space-950 font-mono font-bold text-xs hover:bg-ndvi-bright shadow-neon-green transition-all"
                >
                  Back to Orbital Scan
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
