import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Code2, Rocket, Users, Trophy, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
    >
      <Icon className="w-12 h-12 mb-4 text-black" />
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const features = [
    {
      icon: Code2,
      title: 'Learn & Build',
      description: 'Get hands-on experience with cutting-edge technologies and build amazing projects.',
    },
    {
      icon: Users,
      title: 'Network',
      description: 'Connect with like-minded developers and industry professionals.',
    },
    {
      icon: Trophy,
      title: 'Compete',
      description: 'Participate in hackathons and coding competitions to showcase your skills.',
    },
    {
      icon: Rocket,
      title: 'Innovate',
      description: 'Turn your ideas into reality with our resources and mentorship.',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Spring Hackathon 2024',
      date: 'March 15-17, 2024',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600',
    },
    {
      id: 2,
      title: 'AI Workshop Series',
      date: 'April 1-30, 2024',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600',
    },
    {
      id: 3,
      title: 'Tech Talk: Future of Web',
      date: 'May 5, 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
       <Navbar />
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.section
            style={{ opacity }}
            className="relative flex items-center justify-center h-screen overflow-hidden text-white bg-black"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600"
                alt="Hero background"
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-6 text-6xl font-bold md:text-7xl">
                  Welcome to TechNest Technical Club
                </h1>
                <p className="mb-8 text-xl md:text-2xl">
                  Where Innovation Meets Community
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/events">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center px-8 py-3 space-x-2 font-medium text-black bg-white rounded-full"
                    >
                      <span>Explore Events</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-3 font-medium text-white bg-transparent border-2 border-white rounded-full"
                    >
                      Join TechNest
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold">Why Join TechNest?</h2>
                <p className="text-xl text-gray-600">Discover the opportunities that await you</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </section>

          {/* Events Preview Section */}
          <section className="py-20 bg-gray-100">
            <div className="px-4 mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold">Upcoming Events</h2>
                <p className="text-xl text-gray-600">Don&apos;t miss out on these exciting opportunities</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -10 }}
                    className="overflow-hidden bg-white shadow-lg rounded-xl"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-48"
                    />
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                      <p className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </p>
                      <Link
                        to={`/event/${event.id}`}
                        className="inline-flex items-center mt-4 font-medium text-black hover:underline"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 text-white bg-black">
            <div className="px-4 mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
                {[
                  { number: '1000+', label: 'Members' },
                  { number: '50+', label: 'Events' },
                  { number: '100+', label: 'Projects' },
                  { number: '30+', label: 'Partners' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="mb-2 text-4xl font-bold">{stat.number}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-4xl px-4 mx-auto text-center">
              <h2 className="mb-6 text-4xl font-bold">Ready to Join TechNest?</h2>
              <p className="mb-8 text-xl text-gray-600">
                Be part of a community that drives innovation and creates impact
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-8 py-3 space-x-2 font-medium text-white bg-black rounded-full"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;