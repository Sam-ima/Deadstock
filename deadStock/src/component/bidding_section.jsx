import React, { useState } from 'react';
import { biddingHistory } from '../data';
import { FaHistory, FaChartLine, FaTrophy } from 'react-icons/fa';

const BiddingSection = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sneakers');
  const [bidDuration, setBidDuration] = useState('3');

  const handleSubmitBid = (e) => {
    e.preventDefault();
    alert(`Bid placed: $${bidAmount} on ${selectedCategory} for ${bidDuration} days`);
    setBidAmount('');
  };

  return (
    <section className="bidding-section" id="bidding">
      <div className="container">
        <h2 className="section-title">Live Bidding System</h2>
        <div className="bidding-container">
          <div className="bid-info">
            <h3>How Bidding Works</h3>
            <p>
              Place bids on exclusive deadstock items. Our platform supports 
              both B2B bulk purchases and B2C individual sales with real-time 
              bidding.
            </p>
            
            <div className="bid-features">
              <div className="feature">
                <FaChartLine />
                <h4>Real-time Updates</h4>
                <p>Instant notifications when you're outbid</p>
              </div>
              <div className="feature">
                <FaHistory />
                <h4>Bid History</h4>
                <p>Track all previous bids on items</p>
              </div>
              <div className="feature">
                <FaTrophy />
                <h4>Auto-bid System</h4>
                <p>Set maximum bids and let the system bid for you</p>
              </div>
            </div>

            <div className="bidding-history">
              <h4>Recent Bids</h4>
              {biddingHistory.map((bid, index) => (
                <div key={index} className="bid-item">
                  <span className="bidder">{bid.bidder}</span>
                  <span className="bid-amount">${bid.amount}</span>
                  <span className="bid-time">{bid.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bid-form-container">
            <form className="bid-form" onSubmit={handleSubmitBid}>
              <h4>Place Your Bid</h4>
              
              <div className="form-group">
                <label>Select Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Sneakers">Sneakers</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Collectibles">Collectibles</option>
                  <option value="Designer">Designer</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bid Amount ($)</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Bid Duration (Days)</label>
                <select 
                  value={bidDuration}
                  onChange={(e) => setBidDuration(e.target.value)}
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>

              <div className="form-group">
                <label>User Type</label>
                <div className="user-type-selector">
                  <button 
                    type="button"
                    className={`user-type-btn ${selectedCategory === 'B2C' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('B2C')}
                  >
                    B2C (Individual)
                  </button>
                  <button 
                    type="button"
                    className={`user-type-btn ${selectedCategory === 'B2B' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('B2B')}
                  >
                    B2B (Business)
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-bid">
                Submit Bid
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiddingSection;