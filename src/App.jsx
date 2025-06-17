// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // for github
import "./App.css";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import NewFooter from "./Components/newFooter";
import BookTable from "./Components/BookTable";
import Contact from "./Components/Contact";
import ReservationForm from "./Components/ReservationForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RZS844CuzG9XgGrifLD1GYRqcB0jOh2EFXInNNTR9WIi6lSCSCJrLxnXZrD9AtmZNlwOPjz4iZw4WPLQabqM8zX00mGNirXNY"
);

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/book-table"
          element={
            <Elements stripe={stripePromise}>
              <BookTable />
            </Elements>
          }
        />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <NewFooter />
    </Router>
  );
}

export default App;
