"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
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
    const id = `GRSS-NIE-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f0ead2", "#dde5b6", "#adc178", "#a98467"],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-earth-900 border border-copper/40 rounded-2xl shadow-earth-card overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-copper/20 bg-earth-950">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-olive" />
            <h3 className="font-serif font-bold text-vanilla text-lg tracking-wide">
              {submitted ? "Delegate Credential Generated" : "Symposium Registration"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-tea/60 hover:text-vanilla hover:bg-earth-800 transition-colors"
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
                <label className="block text-xs font-serif text-tea mb-2 uppercase tracking-wider">
                  Select Delegate Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { id: "ieee_student", name: "IEEE Student", price: "₹199", tag: "Recommended" },
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
                          ? "border-olive bg-olive/15 shadow-earth-subtle"
                          : "border-copper/20 bg-earth-950/60 hover:border-copper/40"
                      }`}
                    >
                      {item.tag && (
                        <span className="text-[9px] font-mono font-bold text-copper uppercase mb-1">
                          {item.tag}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-vanilla">{item.name}</span>
                      <span className="text-base font-bold font-serif text-tea mt-1">
                        {item.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-tea/80 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-olive" /> Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Dr. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-earth-950 border border-copper/30 rounded-lg px-3.5 py-2 text-sm text-vanilla focus:outline-none focus:border-olive"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-tea/80 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-olive" /> Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="ananya@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-earth-950 border border-copper/30 rounded-lg px-3.5 py-2 text-sm text-vanilla focus:outline-none focus:border-olive"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-tea/80 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-olive" /> University / Organization *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. The National Institute of Engineering (NIE)"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-earth-950 border border-copper/30 rounded-lg px-3.5 py-2 text-sm text-vanilla focus:outline-none focus:border-olive"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-tea/80 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-olive" /> IEEE Member ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 98452109"
                    value={formData.ieeeNumber}
                    onChange={(e) => setFormData({ ...formData, ieeeNumber: e.target.value })}
                    className="w-full bg-earth-950 border border-copper/30 rounded-lg px-3.5 py-2 text-sm text-vanilla focus:outline-none focus:border-olive"
                  />
                </div>
              </div>

              {/* Primary Focus Track */}
              <div>
                <label className="block text-xs font-sans text-tea/80 mb-1.5">
                  Primary Workshop Focus
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-earth-950 border border-copper/30 rounded-lg px-3.5 py-2 text-sm text-vanilla focus:outline-none focus:border-olive"
                >
                  <option>Multispectral NDVI & Crop Phenology Analysis</option>
                  <option>NISAR / Sentinel-1 Microwave Radar & Soil Moisture</option>
                  <option>AI & Deep Learning for Yield Estimation</option>
                  <option>UAV / Drone Hyperspectral Precision Agriculture</option>
                </select>
              </div>

              <div className="flex items-center gap-2 p-3 bg-olive/10 border border-olive/20 rounded-lg text-xs text-vanilla/90">
                <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
                <span>Includes IEEE GRSS certificate, dataset toolkit, and hands-on Google Earth Engine sandbox access.</span>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm text-tea/70 hover:text-vanilla transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-olive text-earth-950 font-serif font-bold text-sm shadow-earth-subtle hover:bg-tea transition-all"
                >
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* Digital Satellite Ticket Badge */
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="relative p-6 bg-earth-950 border border-copper/40 rounded-2xl shadow-earth-card overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-copper/20 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-tea font-bold tracking-widest uppercase">
                      NIE IEEE STUDENT BRANCH // GRSS CHAPTER
                    </span>
                    <h4 className="text-xl font-serif font-bold text-vanilla mt-0.5">
                      Remote Sensing in Agriculture &apos;26
                    </h4>
                  </div>
                  <div className="px-3 py-1 bg-olive/20 border border-olive/40 rounded font-mono text-xs font-bold text-tea">
                    {ticketId}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5 text-xs font-sans">
                  <div>
                    <div className="text-[10px] text-tea/60 font-mono">DELEGATE NAME</div>
                    <div className="font-bold text-vanilla text-sm mt-0.5">{formData.name || "Alex Varma"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-tea/60 font-mono">CATEGORY</div>
                    <div className="font-bold text-tea uppercase mt-0.5">{tier.replace("_", " ")}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-tea/60 font-mono">LOCATION</div>
                    <div className="font-bold text-vanilla/90 mt-0.5">NIE Mysuru, India</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-tea/60 font-mono">ACCESS LEVEL</div>
                    <div className="font-bold text-olive mt-0.5">Full Symposium + Lab</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-copper/20 text-[11px] text-tea/80">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-olive" />
                    <div>
                      <div className="text-vanilla font-bold">Verified Symposium Credential</div>
                      <div className="text-[9px] text-tea/60">Present at registration reception</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <div className="text-vanilla">Dates: Nov 3–5, 2026</div>
                    <div className="text-tea/70">Cauvery Agro-Eco Study</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-tea">
                  <CheckCircle2 className="w-4 h-4 text-olive" />
                  <span>Confirmation receipt dispatched to {formData.email || "your email"}.</span>
                </div>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-olive text-earth-950 font-serif font-bold text-xs hover:bg-tea shadow-earth-subtle transition-all"
                >
                  Return to Overview
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
