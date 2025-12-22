import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const newsHeadlines = [
    "🎮 GTA 6 release trailer drops December 2025!",
    "⚔️ Elden Ring: Shadow of the Erdtree DLC breaking records!",
    "🚀 Starfield gets massive new expansion 'Frontiers'.",
    "🔥 Call of Duty: Black Ops 6 pre-orders surpass 2M already.",
    "🕹️ Sony announces new PS6 prototype with VR integration.",
  ];

  return (
    <footer className=" relative bg-gradient-to-b from-[#1a1a3d] to-[#000000] text-gray-300 pt-4 pb-10 px-6 lg:px-20 border-t border-purple-700/30">
      {/* 🔥 Neon top border glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 animate-pulse"></div>

      {/* 📰 Live News Ticker */}
      <div className="overflow-hidden whitespace-nowrap border-y border-purple-600/30 py-2 mb-8">
        <motion.div
          className="inline-block text-purple-400 text-sm sm:text-base font-medium tracking-wide"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {newsHeadlines.map((headline, index) => (
            <span key={index} className="mx-10 inline-block">
              {headline}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 🔮 Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative"
      >
        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <FaGamepad className="text-purple-500 text-3xl animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-wide">GamePulse by RafeeArena</h2>
          </div>
          <p className="text-gray-400 text-sm leading-6">
            Power up your gaming world — Explore, Review & Share your favorite games.  
            Built for passionate gamers like you 🎮
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-[15px]">
            <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
            <li><Link to="/games" className="hover:text-purple-400 transition">Games</Link></li>
            <li><Link to="/reviews" className="hover:text-purple-400 transition">Reviews</Link></li>
            <li><Link to="/about" className="hover:text-purple-400 transition">About Us</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Support
          </h3>
          <ul className="space-y-2 text-[15px]">
            <li><Link to="/faq" className="hover:text-purple-400 transition">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-purple-400 transition">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-purple-600 inline-block pb-1">
            Join the Community
          </h3>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-blue-500 transition-all"><FaFacebook /></a>
            <a href="#" className="hover:text-sky-400 transition-all"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition-all"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-500 transition-all"><FaDiscord /></a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Join our Discord server for live gaming events & giveaways 🔥
          </p>
        </div>
      </motion.div>

      {/* 💬 Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-5"
      >
        © {new Date().getFullYear()} 
        <span className="text-purple-400 font-semibold"> GamePulse</span> — All rights reserved.
        <br />
        <span className="text-xs text-gray-600">Made with ❤️ by Rafee</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
