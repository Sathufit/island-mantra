const phrases = [
  "Designed & Made in Sri Lanka",
  "Sustainably Sourced & Ethically Produced",
  "All Women Staff",
];

export default function AnnouncementBar() {
  // Duplicated once so the marquee keyframe (translateX -50%) loops seamlessly
  const track = [...phrases, ...phrases];

  return (
    <div className="bg-[#C9A876] overflow-hidden" style={{ height: "36px" }}>
      <div className="h-full flex items-center marquee-track whitespace-nowrap">
        {track.map((phrase, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-white px-5">
              {phrase}
            </span>
            <span className="text-white/50 text-[8px] leading-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
