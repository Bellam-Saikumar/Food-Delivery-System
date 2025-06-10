import React, { useContext } from "react";
import './FoodItem.css';
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
    const { cartItems, addToCart, removeFromCart, url, isLoggedIn } = useContext(StoreContext);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(id);
        } else {
            alert("Please log in to add items to your cart.");
        }
    };

    const handleRemoveFromCart = () => {
        if (isLoggedIn) {
            removeFromCart(id);
        }
    };

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img src={url + '/images/' + image} alt="" className="food-item-image" />
                {
                    !cartItems[id] ? (
                        <img
                            className="add"
                            onClick={handleAddToCart}
                            src={assets.add_icon_white}
                            alt=""
                        />
                    ) : (
                        <div className="food-item-counter">
                            <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                        </div>
                    )
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
}

export default FoodItem;
