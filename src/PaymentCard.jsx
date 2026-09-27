import { useState } from "react";

const paymentMethods = [
  {
    name: "Korek",
    icon: "📱",
    placeholder: "Korek account / phone number",
  },
  {
    name: "Zain",
    icon: "📱",
    placeholder: "Zain account / phone number",
  },
  {
    name: "Zain Cash",
    icon: "💳",
    placeholder: "Zain Cash number",
  },
  {
    name: "Asiacell",
    icon: "📱",
    placeholder: "Asiacell account / phone number",
  },
  {
    name: "FIB",
    icon: "💳",
    placeholder: "FIB account / number",
  },
  {
    name: "FastPay",
    icon: "💳",
    placeholder: "FastPay account / number",
  },
  {
    name: "Qi Card",
    icon: "💳",
    placeholder: "Qi Card / account number",
  },
  {
    name: "Bank / Card",
    icon: "🏦",
    placeholder: "Bank / card number",
  },
];

export default function PaymentCard() {
  const [method, setMethod] = useState("Korek");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");

  const selected = paymentMethods.find(
    (item) => item.name === method
  );

  function submitPayment(event) {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setMessage("Please enter the payment amount.");
      return;
    }

    if (!account.trim()) {
      setMessage(
        "Please enter your account or transaction number."
      );
      return;
    }

    if (!receipt) {
      setMessage("Please attach your payment receipt.");
      return;
    }

    setMessage(
      "Payment request submitted successfully. Status: Pending review."
    );
  }

  return (
    <div className="page section">
      <div className="payment-page">
        <div className="payment-card">

          <div className="payment-card-header">
            <div>
              <div className="payment-brand">
                GOLDENBET
              </div>

              <div className="payment-title">
                Payment Center
              </div>

              <div className="payment-country">
                🇮🇶 Iraq & Kurdistan
              </div>
            </div>

            <div className="payment-badge">
              SECURE PAYMENT
            </div>
          </div>

          <div className="payment-method-grid">
            {paymentMethods.map((item) => (
              <button
                key={item.name}
                type="button"
                className={
                  "payment-method-card " +
                  (method === item.name
                    ? "active"
                    : "")
                }
                onClick={() => {
                  setMethod(item.name);
                  setMessage("");
                }}
              >
                <span className="payment-method-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          <div className="payment-account-card">

            <div>
              <span>
                PAYMENT METHOD
              </span>

              <strong>
                {method}
              </strong>
            </div>

            <div>
              <span>
                ACCOUNT NAME
              </span>

              <strong>
                GOLDENBET
              </strong>
            </div>

            <div>
              <span>
                ACCOUNT / CARD NUMBER
              </span>

              <strong className="payment-number">
                YOUR ACCOUNT NUMBER
              </strong>
            </div>

            <p>
              Replace "YOUR ACCOUNT NUMBER"
              with your real receiving account
              number before publishing.
            </p>

          </div>

          <form
            className="payment-form"
            onSubmit={submitPayment}
          >

            <label>
              Amount (IQD)

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                placeholder="Enter amount"
              />
            </label>

            <label>
              Transaction / Sender Account Number

              <input
                type="text"
                value={account}
                onChange={(event) =>
                  setAccount(event.target.value)
                }
                placeholder={
                  selected?.placeholder
                }
              />
            </label>

            <label>
              Payment Receipt

              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(event) =>
                  setReceipt(
                    event.target.files?.[0] ||
                    null
                  )
                }
              />
            </label>

            {receipt && (
              <div className="receipt-selected">
                ✓ {receipt.name}
              </div>
            )}

            <button
              className="receipt-button"
              type="submit"
            >
              📤 Submit Payment for Review
            </button>

          </form>

          {message && (
            <div className="payment-message">
              {message}
            </div>
          )}

          <div className="payment-note">
            ⚠️ Send payment only to the official
            GoldenBet account shown on this page.
            Keep your payment receipt until the
            payment is approved.
          </div>

        </div>
      </div>
    </div>
  );
}
