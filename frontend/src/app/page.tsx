import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedTasks from '../components/home/FeaturedTasks';
import Testimonials from '../components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="home-page-container">
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedTasks />
      <Testimonials />
    </div>
  );
}
