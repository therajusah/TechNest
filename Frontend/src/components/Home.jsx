import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <Navbar />
      <div className="container px-4 py-16 mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Hey, Welcome to TechNest Technical CLub
          </h1>
          <p className="text-lg text-white">
        🚀 Join us for an electrifying TechFest at Supaul College of Engineering! <br />🌟 Calling all tech enthusiasts! Prepare to ignite your passion for innovation and collaboration at our upcoming TechFest. 
        <br />
        📅 Save the Date: 
        <br />
        📍 Location: Supaul College of Engineering, Supaul 
        <br />
        Whether you&#39;re a seasoned coder or just diving into the world of technology, this event is your platform to shine. Let&#39;s hack, create, and shape the future together! Stay tuned for event specifics, registration details, and exciting updates. Don&#39;t miss this chance to explore cutting-edge tech, network with like-minded individuals, and make lasting memories.
      </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
