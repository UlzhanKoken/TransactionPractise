import { useContext } from "react";
import Context from "./context";

export default function TransactionHistory({ transactions }) {
  const { theme } = useContext(Context);

  return (
    <div
      style={{
        width: "25%",
        margin: "2rem auto",
        boxSizing: "border-box",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <h6
        className={`pb-2 border-bottom ${theme ? "text-black-important" : "text-white-important"}`}
        style={{ borderBottom: "1px solid #dcdcdc", marginBottom: "1rem" }}
      >
        Transaction History
      </h6>

      {transactions.map((transaction, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "1rem 1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Левая часть: иконка и название+дата */}
          <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            {transaction.img ? (
              <img
                src={transaction.img}
                alt={transaction.name}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  marginRight: 15,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "whitesmoke",
                  marginRight: 15,
                  flexShrink: 0,
                  borderRadius: 4,
                }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: theme ?  "black" : "#006400",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={transaction.name}
              >
                {transaction.name}
              </p>
              <small
                style={{
                  fontSize: "0.75rem",
                  color: "#666",
                  marginTop: 4,
                }}
              >
                {transaction.date}
              </small>
            </div>
          </div>

          {/* Правая часть: сумма */}
          <div
            style={{
              color: transaction.type === 1 ? "green" : "red",
              fontWeight: "700",
              flexShrink: 0,
              fontSize: "1rem",
              marginLeft: "20px",
              whiteSpace: "nowrap",
            }}
          >
            {transaction.type === 1 ? "+" : "-"}${transaction.price}
          </div>
        </div>
      ))}

      {/* Адаптив */}
      <style>{`
        @media (max-width: 576px) {
          div[style*="width: 25%"] {
            width: 100% !important;
          }
          div[style*="display: flex"][style*="justify-content: space-between"] {
            flex-wrap: wrap !important;
          }
          div[style*="color: green"], div[style*="color: red"] {
            margin-left: auto !important;
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
}
