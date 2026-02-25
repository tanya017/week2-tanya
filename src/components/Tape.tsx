import { stocks } from "../data/stockData";

const Tape = () => {
  const items = [...stocks, ...stocks]
  return (
    <div className="ticker-container">
      <div className="ticker-content">
        {items.map((item, index) => (
          <div key={index} className="ticker-item">
            <span className="symbol">{item.symbol}</span>
            <span className="price">{item.price}</span>
            <span className={`change ${item.change >= 0 ? "up" : "down"}`}>
              {item.change >= 0 ? "\u2191" : "\u2193"} {Math.abs(item.change)}%
            </span>
            <span className="dot">•</span>
          </div>
        ))}
      </div>
      <style>{`
        .ticker-container {
          width: 100%;
          padding: 20px 0;
          display: flex;
          align-items: center;
        }

        .ticker-content {
          display: flex;
          white-space: nowrap;
          animation: scroll-left 30s linear infinite;
        }

        .ticker-container:hover .ticker-content {
          animation-play-state: paused;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-right: 30px;
          font-family: Roboto, sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }

        .symbol { font-weight: 800; color: #000; }
        .change.up { color: #16a34a; }
        .change.down { color: #dc2626; }
        .dot { opacity: 0.2; font-size: 20px; }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Tape;
