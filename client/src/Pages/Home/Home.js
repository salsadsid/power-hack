import React from 'react';

const Home = () => {
    return (
        <div>
          <div className="hero min-h-screen" style={{ backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe perspiciatis, enim delectus numquam necessitatibus incidunt mollitia velit aliquam cum fugit quo in aut laborum pariatur praesentium nesciunt eaque ex labore blanditiis dignissimos! Rem ullam, temporibus tempora harum laudantium doloribus similique neque dolores assumenda repellendus, vero corporis ex, beatae odit!</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>  
        </div>
    );
};

export default Home;