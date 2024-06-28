import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-purple-500 to-indigo-600">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-8">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
            voluptate repellat recusandae voluptatibus dolorum ab deserunt.
            Libero quidem perspiciatis autem asperiores ut impedit doloremque
            repellendus! Adipisci nemo earum fugiat accusantium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
