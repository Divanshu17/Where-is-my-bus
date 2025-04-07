import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { getApiUrl, ENDPOINTS } from "../config/api";

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize Google OAuth on component mount
  useEffect(() => {
    // Load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAuth;
      document.body.appendChild(script);
    };

    // Initialize Google authentication
    const initializeGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
          callback: handleGoogleResponse,
          auto_select: false,
        });
      }
    };

    loadGoogleScript();

    // Cleanup function
    return () => {
      // Remove the script if component unmounts
      const script = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Handle Google sign-in response
  const handleGoogleResponse = (response) => {
    if (response && response.credential) {
      setIsGoogleLoading(true);

      // Decode the JWT token to get user info
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { name, email, picture } = JSON.parse(jsonPayload);

      // Send Google auth data to your backend
      fetch("http://localhost:5000/api/users/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          googleId: response.clientId,
          token: response.credential,
          picture,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Google authentication failed");
            });
          }
          return response.json();
        })
        .then((data) => {
          // Save user data to localStorage
          localStorage.setItem(
            "userData",
            JSON.stringify({
              fullName: data.fullName || name,
              email: data.email || email,
              phoneNumber: data.phoneNumber || "",
              token: data.token,
              profilePicture: data.profilePicture || picture,
              isGoogleUser: true,
            })
          );

          // Navigate to next page
          setIsGoogleLoading(false);
          navigate("/location-permission");
        })
        .catch((error) => {
          console.error("Google auth error:", error);
          setFormErrors({ submit: error.message });
          setIsGoogleLoading(false);
        });
    }
  };

  // Handle Google sign-in button click
  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);

    if (window.google && window.google.accounts && window.google.accounts.id) {
      // Prompt the Google sign-in popup
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If the popup is not displayed, use the standard Google sign-in
          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-button"),
            { theme: "outline", size: "large", width: "100%" }
          );
          document.getElementById("google-signin-button").click();
        }
        setIsGoogleLoading(false);
      });
    } else {
      console.error("Google API not loaded");
      setFormErrors({
        submit:
          "Google sign-in is not available right now. Please try again later.",
      });
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic validation before sending to API
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsSubmitting(false);
      return;
    }

    console.log("Sending signup data:", formData);

    // Send signup request to backend
    console.log("About to send fetch request to backend");
    fetch(getApiUrl(ENDPOINTS.SIGNUP), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Received response from backend:", response.status);
        if (!response.ok) {
          return response.json().then((data) => {
            console.error("Signup response error:", data);
            throw new Error(data.message || "Error creating account");
          });
        }
        console.log("Response is OK, parsing JSON");
        return response.json();
      })
      .then((data) => {
        console.log("Signup successful:", data);
        // Use the login function from AuthContext
        login({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          token: data.token,
        });

        setIsSubmitting(false);
        navigate("/location-permission");
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setError(error.message);
        setIsSubmitting(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Name is required";
      }
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
      }
    } else if (step === 2) {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (!formData.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
      }
    }

    return errors;
  };

  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      setFormErrors(errors);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return "bg-gray-200";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-amber-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.3 + 0.9],
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

      {/* Main gradient overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-3xl"></div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 z-10"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 z-10"
      >
        {/* Progress indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <motion.div
              animate={{
                backgroundColor: currentStep >= 1 ? "#3B82F6" : "#D1D5DB",
                scale: currentStep === 1 ? 1.1 : 1,
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
            >
              {currentStep > 1 ? <CheckCircleIcon className="h-5 w-5" /> : "1"}
            </motion.div>
            <div
              className={`w-10 h-1 ${
                currentStep > 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <motion.div
              animate={{
                backgroundColor: currentStep >= 2 ? "#3B82F6" : "#D1D5DB",
                scale: currentStep === 2 ? 1.1 : 1,
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
            >
              {currentStep > 2 ? <CheckCircleIcon className="h-5 w-5" /> : "2"}
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {currentStep === 1 ? "Create Account" : "Complete Profile"}
          </h2>
          <p className="text-gray-600">
            {currentStep === 1
              ? "Start your journey with us today"
              : "Just a few more details needed"}
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {/* Name */}
                <motion.div variants={itemVariants} className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      formErrors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1 pl-2">
                      {formErrors.fullName}
                    </p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 pl-2">
                      {formErrors.email}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 text-white text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
                >
                  <span>Continue</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </motion.button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {/* Password */}
                <motion.div variants={itemVariants} className="relative">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a Password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                  {formErrors.password ? (
                    <p className="text-red-500 text-xs mt-1 pl-2">
                      {formErrors.password}
                    </p>
                  ) : (
                    formData.password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex space-x-1 flex-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full ${
                                  i < passwordStrength()
                                    ? getPasswordStrengthColor()
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-2">
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 pl-1">
                          *Must be at least 8 characters
                        </p>
                      </div>
                    )
                  )}
                </motion.div>

                {/* Phone Number */}
                <motion.div variants={itemVariants} className="relative">
                  <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your Phone No"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      formErrors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 pl-2">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </motion.div>

                <div className="flex space-x-3">
                  <motion.button
                    variants={itemVariants}
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 text-gray-700 font-semibold rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 text-white text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
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
                    ) : (
                      "Sign Up"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign Up with Google */}
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Hidden div for Google sign-in button rendering */}
          <div id="google-signin-button" className="hidden"></div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3 border border-gray-300 text-gray-800 bg-white rounded-lg font-semibold shadow-md hover:bg-gray-50 transition-all flex items-center justify-center relative overflow-hidden"
          >
            {isGoogleLoading ? (
              <>
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-600"
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
                </div>
                <FcGoogle className="h-5 w-5 mr-2 opacity-0" />
                <span className="opacity-0">Sign up with Google</span>
              </>
            ) : (
              <>
                <FcGoogle className="h-5 w-5 mr-2" />
                <span>Sign up with Google</span>
              </>
            )}
          </button>

          {/* Display any Google auth errors */}
          {formErrors.submit && (
            <p className="text-red-500 text-sm text-center mt-2">
              {formErrors.submit}
            </p>
          )}
        </form>

        {/* Already have an account? */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </motion.div>

      {/* Bus route illustration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300/30">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-20 h-full bg-blue-500/50 blur-sm"
        ></motion.div>
      </div>
    </div>
  );
}

export default SignUp;
