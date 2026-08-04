const phrases = [
  "Designed & Made in Sri Lanka",
  "Sustainably Sourced & Ethically Produced",
  "All Women Staff",
];

export default function AnnouncementBar() {
  const track = [...phrases, ...phrases];

  return (
    <div className="bg-[#D9C7A3] overflow-hidden" style={{ height: "32px" }}>
      <div className="h-full flex items-center marquee-track whitespace-nowrap">
        {track.map((phrase, i) => (
          <span
            key={i}
            className="font-sans text-[11px] tracking-[0.15em] text-white px-6 flex-shrink-0"
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
