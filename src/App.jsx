import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Footer from "./Components/footer";
import Menu from "./Components/Menu";
import BookTable from "./Components/BookTable";
import Contact from "./Components/Contact";
import ReservationForm from "./Components/ReservationForm";
import PaymentForm from "./Components/PaymentForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RZS844CuzG9XgGrifLD1GYRqcB0jOh2EFXInNNTR9WIi6lSCSCJrLxnXZrD9AtmZNlwOPjz4iZw4WPLQabqM8zX00mGNirXNY"
);
function App() {
  return (
    <Router>
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
      <Footer />
    </Router>
  );
}

export default App;
