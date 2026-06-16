import React from "react";
import ProductCard from "../productCard/ProductCard";

export default function ProductGrid({ pageTitle, products }) {
  return (
    <div>
      {/* top */}

      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold">{pageTitle}</h1>

        <span className="text-sm text-slate-400 font-medium">
          {products.length} Items
        </span>
      </div>

      {/* cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
