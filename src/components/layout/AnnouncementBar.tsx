export default function AnnouncementBar() {
  return (
    <div className="bg-[#0A3D40]" style={{ height: "32px" }}>
      <div className="h-full flex items-center justify-center px-4">
        <p className="font-sans text-[11px] tracking-[0.15em] text-white/65 text-center leading-none md:hidden whitespace-nowrap overflow-hidden text-ellipsis">
          Free delivery over Rs 5,000 · Made in Sri Lanka
        </p>
        <p className="hidden md:block font-sans text-[11px] tracking-[0.18em] text-white/65 text-center">
          Free delivery on orders over Rs 5,000&nbsp;&nbsp;·&nbsp;&nbsp;Made in Sri Lanka&nbsp;&nbsp;·&nbsp;&nbsp;Easy 14-day returns
        </p>
      </div>
    </div>
  );
}
