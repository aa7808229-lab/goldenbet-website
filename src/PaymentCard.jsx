import { useMemo, useState } from "react";

const paymentMethods = {
  Iraq: {
    currency: "IQD",
    mobile: [
      "Zain Cash",
      "Asiacell",
      "Korek",
      "FIB",
      "FastPay",
      "Qi Card",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "Qi Card",
    ],
  },

  Turkey: {
    currency: "TRY",
    mobile: [
      "Papara",
      "FAST",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Iran: {
    currency: "IRR",
    mobile: [
      "Mobile Wallet",
      "Mobile Banking",
    ],
    cards: [
      "Shetab Card",
      "Visa",
      "Mastercard",
    ],
  },

  "Saudi Arabia": {
    currency: "SAR",
    mobile: [
      "STC Pay",
      "Mobily Pay",
      "Bank Mobile",
    ],
    cards: [
      "Mada",
      "Visa",
      "Mastercard",
    ],
  },

  "United Arab Emirates": {
    currency: "AED",
    mobile: [
      "e& money",
      "Careem Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Qatar: {
    currency: "QAR",
    mobile: [
      "Mobile Banking",
      "Mobile Wallet",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Kuwait: {
    currency: "KWD",
    mobile: [
      "KNET",
      "Mobile Banking",
      "Mobile Wallet",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Jordan: {
    currency: "JOD",
    mobile: [
      "Zain Cash",
      "Orange Money",
      "UWallet",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Egypt: {
    currency: "EGP",
    mobile: [
      "Vodafone Cash",
      "Orange Money",
      "Etisalat Cash",
      "WE Pay",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Lebanon: {
    currency: "LBP",
    mobile: [
      "Mobile Wallet",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Germany: {
    currency: "EUR",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  France: {
    currency: "EUR",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Italy: {
    currency: "EUR",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Spain: {
    currency: "EUR",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Netherlands: {
    currency: "EUR",
    mobile: [
      "iDEAL",
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Portugal: {
    currency: "EUR",
    mobile: [
      "MB WAY",
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Belgium: {
    currency: "EUR",
    mobile: [
      "Bancontact",
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "SEPA",
    ],
  },

  Switzerland: {
    currency: "CHF",
    mobile: [
      "TWINT",
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  "United Kingdom": {
    currency: "GBP",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  USA: {
    currency: "USD",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "PayPal",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "American Express",
    ],
  },

  Canada: {
    currency: "CAD",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "Interac",
    ],
  },

  Australia: {
    currency: "AUD",
    mobile: [
      "Apple Pay",
      "Google Pay",
      "PayID",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Brazil: {
    currency: "BRL",
    mobile: [
      "Pix",
      "Mobile Banking",
      "Digital Wallet",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Mexico: {
    currency: "MXN",
    mobile: [
      "CoDi",
      "Mobile Banking",
      "Digital Wallet",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Japan: {
    currency: "JPY",
    mobile: [
      "PayPay",
      "LINE Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "JCB",
    ],
  },

  "South Korea": {
    currency: "KRW",
    mobile: [
      "Kakao Pay",
      "Naver Pay",
      "Samsung Pay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  China: {
    currency: "CNY",
    mobile: [
      "Alipay",
      "WeChat Pay",
      "Mobile Banking",
    ],
    cards: [
      "UnionPay",
      "Visa",
      "Mastercard",
    ],
  },

  India: {
    currency: "INR",
    mobile: [
      "UPI",
      "PhonePe",
      "Google Pay",
      "Paytm",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
      "RuPay",
    ],
  },

  Singapore: {
    currency: "SGD",
    mobile: [
      "PayNow",
      "GrabPay",
      "Apple Pay",
      "Google Pay",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Malaysia: {
    currency: "MYR",
    mobile: [
      "Touch 'n Go",
      "DuitNow",
      "GrabPay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Indonesia: {
    currency: "IDR",
    mobile: [
      "GoPay",
      "OVO",
      "DANA",
      "QRIS",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Pakistan: {
    currency: "PKR",
    mobile: [
      "Easypaisa",
      "JazzCash",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Bangladesh: {
    currency: "BDT",
    mobile: [
      "bKash",
      "Nagad",
      "Rocket",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  Nigeria: {
    currency: "NGN",
    mobile: [
      "OPay",
      "PalmPay",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },

  SouthAfrica: {
    currency: "ZAR",
    mobile: [
      "Capitec Pay",
      "SnapScan",
      "Mobile Banking",
    ],
    cards: [
      "Visa",
      "Mastercard",
    ],
  },
};

const defaultPaymentMethods = {
  currency: "USD",
  mobile: [
    "Mobile Wallet",
    "Mobile Banking",
  ],
  cards: [
    "Visa",
    "Mastercard",
  ],
};

const countryNames = [
  "Iraq",
  "Turkey",
  "Iran",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Jordan",
  "Egypt",
  "Lebanon",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Portugal",
  "Belgium",
  "Switzerland",
  "United Kingdom",
  "USA",
  "Canada",
  "Australia",
  "Brazil",
  "Mexico",
  "Japan",
  "South Korea",
  "China",
  "India",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Pakistan",
  "Bangladesh",
  "Nigeria",
  "SouthAfrica",
];

export default function PaymentCard({
  country = "Iraq",
  onCountryChange,
}) {
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [paymentType, setPaymentType] = useState("mobile");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const methods = useMemo(() => {
    return (
      paymentMethods[selectedCountry] ||
      defaultPaymentMethods
    );
  }, [selectedCountry]);

  const availableMethods =
    paymentType === "mobile"
      ? methods.mobile
      : methods.cards;

  const handleCountryChange = (event) => {
    const newCountry = event.target.value;

    setSelectedCountry(newCountry);
    setSelectedMethod("");
    setPhoneNumber("");
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
    setMessage("");

    if (onCountryChange) {
      onCountryChange(newCountry);
    }
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    setSelectedMethod("");
    setMessage("");
  };

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0] || null;

    setFile(selectedFile);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMethod) {
      setMessage("Please select a payment method.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (paymentType === "mobile" && !phoneNumber) {
      setMessage("Please enter your phone number.");
      return;
    }

    if (paymentType === "card") {
      if (
        !cardNumber ||
        !cardName ||
        !expiry ||
        !cvv
      ) {
        setMessage(
          "Please complete all card information."
        );
        return;
      }
    }

    if (!file) {
      setMessage(
        "Please upload your payment receipt."
      );
      return;
    }

    setMessage(
      "Your payment request has been submitted for review."
    );
  };

  return (
    <section className="payment-card">
      <div className="payment-card-header">
        <span className="payment-card-icon">
          💳
        </span>

        <div>
          <h2>Deposit</h2>
          <p>
            Choose your country and payment method.
          </p>
        </div>
      </div>

      <form
        className="payment-card-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="payment-country">
          Country
        </label>

        <select
          id="payment-country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countryNames.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <div className="payment-country-currency">
          Currency: <strong>{methods.currency}</strong>
        </div>

        <div className="payment-type-buttons">
          <button
            type="button"
            className={
              paymentType === "mobile"
                ? "payment-type-button active"
                : "payment-type-button"
            }
            onClick={() =>
              handlePaymentTypeChange("mobile")
            }
          >
            📱 Phone / Mobile
          </button>

          <button
            type="button"
            className={
              paymentType === "card"
                ? "payment-type-button active"
                : "payment-type-button"
            }
            onClick={() =>
              handlePaymentTypeChange("card")
            }
          >
            💳 Bank Card
          </button>
        </div>

        <label htmlFor="payment-method">
          Payment Method
        </label>

        <select
          id="payment-method"
          value={selectedMethod}
          onChange={(event) =>
            setSelectedMethod(event.target.value)
          }
        >
          <option value="">
            Select Payment Method
          </option>

          {availableMethods.map((method) => (
            <option
              key={method}
              value={method}
            >
              {method}
            </option>
          ))}
        </select>

        {paymentType === "mobile" && (
          <div className="payment-mobile-section">
            <label htmlFor="payment-phone">
              Phone Number
            </label>

            <input
              id="payment-phone"
              type="tel"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              placeholder="+964 7XX XXX XXXX"
            />
          </div>
        )}

        {paymentType === "card" && (
          <div className="payment-card-section">
            <label htmlFor="payment-card-number">
              Card Number
            </label>

            <input
              id="payment-card-number"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(event) =>
                setCardNumber(event.target.value)
              }
              placeholder="Card Number"
              autoComplete="cc-number"
            />

            <label htmlFor="payment-card-name">
              Cardholder Name
            </label>

            <input
              id="payment-card-name"
              type="text"
              value={cardName}
              onChange={(event) =>
                setCardName(event.target.value)
              }
              placeholder="Name on Card"
              autoComplete="cc-name"
            />

            <div className="payment-card-row">
              <div>
                <label htmlFor="payment-expiry">
                  Expiry
                </label>

                <input
                  id="payment-expiry"
                  type="text"
                  value={expiry}
                  onChange={(event) =>
                    setExpiry(event.target.value)
                  }
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
              </div>

              <div>
                <label htmlFor="payment-cvv">
                  CVV
                </label>

                <input
                  id="payment-cvv"
                  type="password"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value)
                  }
                  placeholder="CVV"
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </div>
        )}

        <label htmlFor="payment-amount">
          Amount
        </label>

        <input
          id="payment-amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
          placeholder={`Amount in ${methods.currency}`}
        />

        <label htmlFor="payment-receipt">
          Payment Receipt
        </label>

        <input
          id="payment-receipt"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
        />

        {file && (
          <div className="payment-selected-file">
            <span>📎</span>
            <span>{file.name}</span>
          </div>
        )}

        <div className="payment-warning">
          <strong>Important</strong>
          <p>
            Only use payment methods that are officially
            supported by GoldenBet in your country.
          </p>
        </div>

        <button
          type="submit"
          className="payment-submit-button"
        >
          📤 Submit Deposit
        </button>

        {message && (
          <div className="payment-message">
            {message}
          </div>
        )}
      </form>
    </section>
  );
}
