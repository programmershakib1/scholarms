import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [locations, setLocations] = useState("");
  const [themeColor, setThemeColor] = useState("dark");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const handleGithubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const handleSingOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const animationValue = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1 },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const userInfo = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          signUp: new Date().toISOString(),
          lastSignIn: new Date().toISOString(),
        };
        axiosPublic.put("/user", userInfo);
        const user = { email: currentUser.email };
        axiosPublic.post("/jwt", user).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    handleSignUp,
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    handleSingOut,
    user,
    setUser,
    loading,
    emailValue,
    setEmailValue,
    locations,
    setLocations,
    themeColor,
    setThemeColor,
    animationValue,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
