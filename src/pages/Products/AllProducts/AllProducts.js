import React, { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AllProducts.css";
import { useLanguage } from "../../LanguageContext";

export const AllProducts = ({ products }) => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const titleStyle = { fontFamily: lang === "ru" ? "Onest" : "Archivo" };

  const handleClick = useCallback(
    (id) => navigate(`/product/${id}`),
    [navigate]
  );

  if (!products.length) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "30px" , color: "white",...titleStyle }}>
        {lang === "en" ? "Loading products..." : "Загружаем продукты..."}
      </div>
    );
  }

  return (
    <div className="all_products">
      <div className="products_cards">
        {products.map((product) => (
          <div className="products_card" key={product.id}>
            <img src={product.image_url} alt="product" />
            <div className="products_card_content">
              <p className="price">
                {product.price.toLocaleString()} <span>uzs</span>
              </p>
              <NavLink className="products_name" style={titleStyle} to={`/product/${product.id}`}>
                {lang === "en" ? product.name_en : product.name_ru}
              </NavLink>
              <p className="products_number" style={titleStyle}>
                {product.part_number}
              </p>
              <button onClick={() => handleClick(product.id)} style={titleStyle}>
                {lang === "en" ? "View Product" : "Посмотреть Продукт"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
