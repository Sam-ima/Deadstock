import React from 'react';
// import Navbar from '../component/nav_bar';
import HeroSection from '../component/hero_section';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* <Navbar /> */}
      <HeroSection />
      
      {/* Additional sections can be added here */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Featured Categories
          </h2>
          {/* Categories grid will go here */}
        </div>
      </section>
    </div>
  );
};

export default Homepage;