import React, { useContext, useState, useEffect } from "react";
import './FoodDisplay.css';
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const searchQueryFromURL = new URLSearchParams(location.search).get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchQueryFromURL);

  // Update URL and trigger search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/"); // Reset URL if search is cleared
    }
  };

  // Reset search results when input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      navigate("/"); // Reset URL and show full list
    }
  }, [searchTerm, navigate]);

  const filteredList = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = item.name.toLowerCase().includes(searchQueryFromURL.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <h2>
          {searchQueryFromURL
            ? `Search Results for "${searchQueryFromURL}"`
            : "Top dishes near you"}
        </h2>

        <div className="navbar-search-container">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <img src={assets.search_icon} alt="search" onClick={handleSearch} />
        </div>
      </div>

      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p style={{ marginTop: "20px", fontSize: "18px" }}>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
