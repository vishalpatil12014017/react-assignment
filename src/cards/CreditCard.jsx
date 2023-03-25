import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./CreditCard.css";
export { CreditCard };
function CreditCard() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    cardExpiration: "",
    cardCvc: "",
    category: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      name: formData.name,
      cardHolder: formData.name,
      cardNumber: formData.cardNumber,
      cardExpiration: formData.cardExpiration,
      // cardCvc: formData.cardCvc,
      category: formData.category,
    };
    console.log(postData);
    fetch("https://interview-api.onrender.com/v1/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFlYzdmZmVjNDQzZTAwMWRmNjkwYzYiLCJpYXQiOjE2Nzk3Mzg4NzksImV4cCI6MzQ3OTczODg3OSwidHlwZSI6ImFjY2VzcyJ9.9mrkVuZQyE1AFaxwmcUSUI5j0RnYKeJR0W_biwUgdKU",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          name: "",
          cardNumber: "",
          cardExpiration: "",
          cardCvc: "",
          category: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="card-form">
        <Cards
          name={formData.name}
          number={formData.cardNumber}
          expiry={formData.cardExpiration}
          cvc={formData.cardCvc}
          brand={formData.category.toLowerCase()}
          preview={true}
        />
        <form style={{ "margin-top": "10px" }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              onChange={handleInputChange}
              value={formData.cardNumber}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardExpiration">Expiration Date:</label>
              <input
                type="text"
                id="cardExpiration"
                name="cardExpiration"
                onChange={handleInputChange}
                value={formData.cardExpiration}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardCvc">CVC:</label>
              <input
                type="text"
                id="cardCvc"
                name="cardCvc"
                onChange={handleInputChange}
                value={formData.cardCvc}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
