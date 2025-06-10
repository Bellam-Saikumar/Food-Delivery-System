import { createContext, useState, useEffect } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-delivery-system-backend-pe5c.onrender.com";

  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const isLoggedIn = !!token; 

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  const subtotal = calculateTotal();
  const delivery = subtotal === 0 ? 0 : 5;
  const total = subtotal + delivery;

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    calculateTotal,
    subtotal,
    delivery,
    total,
    url,
    token,
    setToken,
    isLoggedIn,  // ✅ Now this is valid and derived correctly
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
