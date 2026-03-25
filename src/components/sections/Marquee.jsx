const Marquee = () => (
  <div className="bg-black text-white py-4 overflow-hidden border-y-4 border-black">
    <div className="whitespace-nowrap animate-marquee flex gap-12 text-xl font-bold italic">
      {[...Array(5)].map((_, i) => (
        <span key={i}>WEB DEVELOPMENT • MOBILE APPS • MACHINE LEARNING • ARTIFICIAL INTELLIGENCE • NEXT.JS • FLUTTER •</span>
      ))}
    </div>
  </div>
);

export default Marquee;
