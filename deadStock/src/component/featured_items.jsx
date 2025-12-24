import React from 'react';
import { featuredItems } from '../data';
import { FaTag, FaClock, FaGem } from 'react-icons/fa';

const FeaturedItems = () => {
  return (
    <section className="featured-section" id="featured">
      <div className="container">
        <h2 className="section-title">Featured Deadstock Items</h2>
        <div className="products-grid">
          {featuredItems.map(item => (
            <div key={item.id} className="product-card">
              <img 
                src={item.image} 
                alt={item.name} 
                className="product-image"
              />
              <div className="product-details">
                <div className="product-category">{item.category}</div>
                <h3 className="product-title">{item.name}</h3>
                <div className="product-price">${item.price.toLocaleString()}</div>
                <div className="product-stats">
                  <span>
                    <FaTag /> Retail: ${item.originalPrice}
                  </span>
                  <span>
                    <FaGem /> {item.condition}
                  </span>
                </div>
                <div className="product-bidding">
                  <div className="bidding-info">
                    <span>
                      <FaClock /> {item.timeLeft}
                    </span>
                    <span>{item.bids} bids</span>
                  </div>
                  <button className="bid-btn">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;