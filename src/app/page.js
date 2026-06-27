
import ArtCategories from '@/components/home/ArtCategories';
import Banner from '@/components/home/Banner';
import FeaturedArtworks from '@/components/home/FeaturedArtworks';
import TopArtists from '@/components/home/TopArtists';
;


import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Banner/>
     <FeaturedArtworks/>
      <TopArtists />
      <ArtCategories/>
    </div>
  );
};

export default HomePage;