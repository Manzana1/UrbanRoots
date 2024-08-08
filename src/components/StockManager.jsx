import { useState } from "react"
import { plantList } from "../datas/plantList"

//si l'ajoute est plus grand que le stock de la plante, ca s'arrete.

function StockManager({ children }) {
    const [stock, setStock] = useState(plantList)
    const [cart, setCart] = useState([])

    function addStockToCart(plant) {
        const inCart = cart.find((item) => item.id === plant.id);
        if (plant.stock > 0) {
            setStock(stock.map((item) =>
                item.id === plant.id ? { ...item, stock: item.stock - 1 } : item
            ));
            if (inCart) {
                setCart(cart.map((item) =>
                    item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                setCart([...cart, { ...plant, quantity: 1 }]);
            }
        }
    }
    function removeStockFromCart(plant) {
        const inCart = cart.find((item) => item.id === plant.id);

        if (inCart && inCart.quantity > 0) {
            setStock(stock.map((item) =>
                item.id === plant.id ? { ...item, stock: item.stock + 1 } : item
            ));
            if (inCart.quantity === 1) {
                setCart(cart.filter((item) => item.id !== plant.id));
            } else {
                setCart(cart.map((item) =>
                    item.id === skate.id ? { ...item, quantity: item.quantity - 1 } : item
                ));
            }
        }
    };
    return children({ stock, cart, addToCart: addStockToCart, removeFromCart: removeStockFromCart });
};


export default StockManager