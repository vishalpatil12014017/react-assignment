import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./CreditCardCarousel.css";

function CreditCardCarousel() {
  const [cards, setCards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://interview-api.onrender.com/v1/cards?limit=1&page=${currentIndex}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFlYzdmZmVjNDQzZTAwMWRmNjkwYzYiLCJpYXQiOjE2Nzk3Mzg4NzksImV4cCI6MzQ3OTczODg3OSwidHlwZSI6ImFjY2VzcyJ9.9mrkVuZQyE1AFaxwmcUSUI5j0RnYKeJR0W_biwUgdKU",
            },
          }
        );
        const data = await response.json();

        settotalPages(data.totalPages);
        setCards(data.results[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCards();
    const intervalId = setInterval(() => {
      if (currentIndex === totalPages) {
        setCurrentIndex(1);
      } else {
        setCurrentIndex((currentIndex) => currentIndex + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentIndex, totalPages]);

  return (
    <>
      <div className="credit-card-stack">
        <div className="credit-card"></div>
        <div className="credit-card"></div>
        <div className="credit-card">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Cards
              name={cards.name}
              number={cards.cardNumber}
              expiry={cards.cardExpiration}
              cvc={cards.cardCvc}
              focused={null}
            />
          )}
        </div>
      </div>
    </>
  );
}

export  {CreditCardCarousel};
