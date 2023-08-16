import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({orderData:null});

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setOrderData(responseData);
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          color: "#333",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          My Order History
        </h1>

        {orderData.orderData &&
          orderData.orderData.Order_data &&
          orderData.orderData.Order_data.length > 0 ? (
            orderData.orderData.Order_data.slice(0)
              .reverse()
              .map((orderGroup) => (
                <div
                  key={orderGroup.Order_date}
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "800px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {orderGroup.Order_date}
                  </h3>
                  <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {Object.keys(orderGroup)
                    .filter((key) => key !== "Order_date")
                    .map((key) => {
                      const item = orderGroup[key];
                      return (
                        <div
                          key={item.id}
                          style={{
                            margin: "10px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            width: "16rem",
                          }}
                        >
                          <div className="card">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQic0xLnQxep-Yy6PAqmgFshN8vs9YefowGI67BwhV5gcj4jzlLJb09EjFNjZ988KxcexA&usqp=CAU"
                              className="card-img-top"
                              alt="img not loaded"
                              style={{
                                objectFit: "cover",
                              }}
                            />
                            <div
                              className="card-body"
                              style={{
                                padding: "15px",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <h5
                                className="card-title"
                                style={{
                                  fontSize: "1.2rem",
                                  marginBottom: "10px",
                                }}
                              >
                                {item.name}
                              </h5>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  fontSize: "0.9rem",
                                  color: "#555",
                                }}
                              >
                                <div style={{ marginBottom: "5px" }}>
                                  <strong>Qty:</strong> {item.qty}
                                </div>
                                <div style={{ marginBottom: "5px" }}>
                                  <strong>Size:</strong> {item.size}
                                </div>
                                <div style={{ marginBottom: "5px" }}>
                                  <strong>Order Date:</strong>{" "}
                                  {orderGroup.Order_date}
                                </div>
                                <div>
                                  <strong>Price:</strong> ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                </div>
              ))
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                marginTop: "40px",
              }}
            >
              No order data available.
            </p>
          )}
      </div>

      <Footer />
    </div>
  );
}

