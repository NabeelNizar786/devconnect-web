import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const plans = [
  {
    name: "Silver",
    price: "₹700",
    duration: "3 Months",
    features: ["Chat feature", "Send 100 connections", "Blue tick"],
    buttonClass: "btn-primary",
  },
  {
    name: "Gold",
    price: "₹900",
    duration: "6 Months",
    features: ["Chat feature", "Send 500 connections", "Blue tick"],
    buttonClass: "btn-secondary",
    highlight: true,
  },
  {
    name: "Platinum",
    price: "₹1500",
    duration: "12 Months",
    features: ["Chat feature", "Unlimited connections", "Blue tick"],
    buttonClass: "btn-accent",
  },
];

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser()
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {}
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        {
          withCredentials: true,
        }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: "INR",
        name: "DevConnects",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {}
  };
  return isUserPremium ? (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-gray-300">
        You're already a premium user
      </h1>
    </div>
  ) : (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Premium Membership</h2>
          <p className="mt-3 text-base-content/70">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:flex md:justify-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card bg-base-300 rounded-2xl p-8 shadow-md transition hover:shadow-xl
                shrink-0 min-w-65 ${
                  plan.highlight ? "ring-2 ring-primary scale-[1.02]" : ""
                }`}
            >
              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-semibold">
                  {plan.name} Membership
                </h3>

                <div>
                  <p className="text-5xl font-bold">{plan.price}</p>
                  <p className="text-sm text-base-content/60">
                    {plan.duration}
                  </p>
                </div>

                <ul className="space-y-2 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-success">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${plan.buttonClass} w-full`}
                  onClick={() => handleBuyClick(plan.name)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;
