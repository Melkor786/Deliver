import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFooditem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1424&q=80")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div><Navbar /></div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value ={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              className="d-block w-100"
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item" >
            <img
              src="https://images.unsplash.com/photo-1565060050382-f180053db6fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVyZ2VyfHx8fHx8MTY5MjA0ODc3Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
              className="d-block w-100"
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1631143071901-d9ede826b78d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8RG9udXRzfHx8fHx8MTY5MjA0ODkyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
              className="d-block w-100"
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div key={data._id} className="row mb-4">
                  <div className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditem !== [] ? (
                    fooditem.filter((item) => (item.CategoryName === data.CategoryName)
                    && (item.name.toLowerCase().includes(String(search).toLocaleLowerCase()))
                    ).map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem = {filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
