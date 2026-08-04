"use client";

import { useState } from "react";

const sizeData = [
  { size: "XS", bust: "80–84", waist: "60–64", hips: "86–90" },
  { size: "S", bust: "84–88", waist: "64–68", hips: "90–94" },
  { size: "M", bust: "88–93", waist: "68–73", hips: "94–99" },
  { size: "L", bust: "93–98", waist: "73–78", hips: "99–104" },
  { size: "XL", bust: "98–104", waist: "78–84", hips: "104–110" },
];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-sans text-xs text-[#0A0A0A] underline underline-offset-2 hover:text-[#2A2A2A] transition-colors"
      >
        Size Guide
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white max-w-lg w-full p-6 md:p-8 z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-[#0A0A0A]">Size Guide</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-[#0A0A0A]"
                aria-label="Close size guide"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="font-sans text-xs text-[#0A0A0A]/60 mb-4">
              All measurements in centimetres (cm).
            </p>
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-[#E7DCC8]">
                  <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">
                    Size
                  </th>
                  <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">
                    Bust
                  </th>
                  <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">
                    Waist
                  </th>
                  <th className="text-left py-2 text-[#0A0A0A]/60 font-medium text-xs">
                    Hips
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.size} className="border-b border-[#F4EDE1]">
                    <td className="py-3 font-medium text-[#0A0A0A]">{row.size}</td>
                    <td className="py-3 text-[#0A0A0A]">{row.bust}</td>
                    <td className="py-3 text-[#0A0A0A]">{row.waist}</td>
                    <td className="py-3 text-[#0A0A0A]">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
