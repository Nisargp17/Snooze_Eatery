import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = ({ amount, reservationId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch(`${API_BASE}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create payment intent");
      }

      const { clientSecret } = await res.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess({ paymentDetails: paymentIntent, reservationId });
      } else {
        setErrorMessage(
          `Payment status: ${paymentIntent.status}. Please try again.`
        );
      }
    } catch (err) {
      setErrorMessage(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className={`w-full px-6 py-3 rounded-md text-white ${
          isProcessing || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
