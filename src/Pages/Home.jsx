import React, { Suspense } from "react"; 
import Banner from "../Components/Banner/Banner";
import LatestProducts from "../Components/LatestProducts/LatestProducts";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <Suspense fallback={
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold text-purple-700">Loading...</h2>
        </div>
      }>
        <LatestProducts></LatestProducts>
      </Suspense>
      
    </div>
  );
};

export default Home;