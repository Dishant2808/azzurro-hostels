export default function PromoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 text-white py-3 px-4 text-sm font-semibold overflow-hidden" style={{backgroundColor: 'hsl(225, 81%, 19.6%)'}}>
      <div className="whitespace-nowrap animate-scroll-left">
        <span className="inline-block px-32">STUDENT DISCOUNT - EXTRA 10% OFF SALE</span>
        <span className="inline-block px-32">BUY NOW, PAY LATER afterpay◇</span>
        <span className="inline-block px-32">STUDENT DISCOUNT - EXTRA 10% OFF SALE</span>
        <span className="inline-block px-32">BUY NOW, PAY LATER afterpay◇</span>
      </div>
    </div>
  );
}