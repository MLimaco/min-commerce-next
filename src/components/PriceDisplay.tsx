interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  onSale: boolean | undefined;
}

export default function PriceDisplay({ price, originalPrice, onSale }: PriceDisplayProps) {
  return (
    <div className="mb-6">
      {onSale && (
        <div className="flex items-center mb-1">
          <span className="text-sm text-gray-500 line-through mr-2">
            S/ {originalPrice.toFixed(2)}
          </span>
          <span className="badge-accent text-xs py-0.5 px-1.5">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </span>
        </div>
      )}
      <div className="text-3xl font-bold text-gray-900">
        S/ {price.toFixed(2)}
      </div>
    </div>
  );
}