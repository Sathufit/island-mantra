const messages = [
  "Free delivery on orders over Rs 5,000",
  "Coastal fashion born in Hikkaduwa, Sri Lanka",
  "Islandwide delivery in 2–4 business days",
  "Handcrafted by local artisans",
  "Easy 14-day returns",
  "New arrivals added weekly",
];

export default function AnnouncementBar() {
  const items = [...messages, ...messages];

  return (
    <div className="bg-[#0A3D40] overflow-hidden" style={{ height: "36px" }}>
      <div className="flex items-center h-full">
        <div className="marquee-track flex items-center whitespace-nowrap">
          {items.map((msg, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-7 font-sans text-[11px] tracking-[0.16em] text-white/75"
            >
              <span className="text-[#E1704B]" style={{ fontSize: "7px" }}>◆</span>
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
