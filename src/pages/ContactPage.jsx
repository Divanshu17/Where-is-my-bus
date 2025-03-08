import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  Bars3Icon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import SideNavBar from "./components/SideNavBar";

function ContactPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Load user data from localStorage if available
  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phoneNumber || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Office locations
  const offices = [
    {
      name: "Jaipur Headquarters",
      address: "123 Transport Nagar, Jaipur, Rajasthan 302001",
      phone: "+91 141 2345678",
      email: "jaipur@bustrack.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
    {
      name: "Delhi Office",
      address: "456 Connaught Place, New Delhi 110001",
      phone: "+91 11 87654321",
      email: "delhi@bustrack.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "How do I track my bus in real-time?",
      answer:
        "You can track your bus in real-time by selecting your route from the Routes page and clicking on 'Track'. This will show you the current location of your bus on the map along with estimated arrival times.",
    },
    {
      question: "How accurate is the bus tracking?",
      answer:
        "Our bus tracking system updates every 30 seconds and provides accuracy within 10-15 meters. However, factors like weather and network connectivity may occasionally affect accuracy.",
    },
    {
      question: "Can I save my favorite routes?",
      answer:
        "Yes, you can save your favorite routes by clicking the bookmark icon next to any route. Your saved routes can be accessed from the Saved Routes section in the app.",
    },
    {
      question: "How do I report an issue with a bus or route?",
      answer:
        "You can report issues through the Feedback page in the app or by contacting our customer support team directly via phone or email.",
    },
  ];

  // Social media links
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/3 to-amber-500/3"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              scale: [1, Math.random() * 0.2 + 0.9],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#f0e6d2]/90 shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-900" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2 text-blue-600" />
            Contact Us
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-50 flex justify-center"
          >
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Your message has been sent successfully!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto"
        >
          {/* Introduction Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Get in Touch
            </h3>
            <p className="text-gray-700 mb-4">
              We're here to help with any questions about our bus tracking
              service. Feel free to reach out through any of the channels below
              or fill out the contact form.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <PhoneIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <p className="text-gray-700">+91 1800 123 4567</p>
                  <p className="text-sm text-gray-500">Mon-Sat, 9am-6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <p className="text-gray-700">support@bustrack.com</p>
                  <p className="text-sm text-gray-500">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <GlobeAltIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Social Media</h4>
                  <div className="flex space-x-2 mt-1">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-600" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 rounded-xl font-bold shadow-md flex items-center justify-center space-x-2 transition-all ${
                    isSubmitted
                      ? "bg-green-600 text-white"
                      : isSubmitting
                      ? "bg-blue-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      <span>Message Sent</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              variants={itemVariants}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
                Our Offices
              </h3>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {office.name}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{office.address}</p>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <p className="text-gray-700">{office.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <p className="text-gray-700">{office.email}</p>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <p className="text-gray-700">{office.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder - in a real app, you would integrate Google Maps or similar */}
              <div className="mt-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">
                  Interactive map would be displayed here
                </p>
              </div>
            </motion.div>
          </div>

          {/* FAQs Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 shadow-lg rounded-xl p-6 border border-amber-200 mb-6"
          >
            <h3 className="text-xl font-bold text-amber-800 mb-2 flex items-center">
              Emergency Contact
            </h3>
            <p className="text-amber-700 mb-4">
              For urgent matters related to bus services or emergencies:
            </p>

            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-amber-700 mr-2" />
              <p className="text-amber-700 font-semibold">
                Emergency Helpline: +91 1800 999 8888
              </p>
            </div>
            <p className="text-sm text-amber-600 mt-2">
              Available 24/7 for emergency assistance only
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-[#e0d2be] py-4 mt-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} BusTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ContactPage;
