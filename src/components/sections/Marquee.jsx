const Marquee = () => (
  <div className="bg-black text-white py-2 overflow-hidden border-y-4 border-black">
    <div className="whitespace-nowrap animate-marquee flex gap-12 text-md font-bold italic">
      {[...Array(5)].map((_, i) => (
        <span key={i}>WEB DEVELOPMENT • MOBILE APPS • MACHINE LEARNING • ARTIFICIAL INTELLIGENCE • LINUX DEVELOPMENT • FLUTTER •</span>
      ))}
    </div>
  </div>
);

export default Marquee;
