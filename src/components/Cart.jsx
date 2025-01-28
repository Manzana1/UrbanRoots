import { useState, useEffect } from "react";
import CartItem from "./CartItem";

// import { plantList } from '../datas/plantList'
import "../styles/Cart.css";

function Cart({ cart, updateCart, plants, updatePlants }) {
  //il faut décrémenter le stock
  //supprime un item
  function removeItem(id) {
    //met a jour le compteur dans le panier

    updateCart((prevCart) => {
      const updatedCartUnfiltered = prevCart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.amount <= 1) {
          return null;
        }

        //si la quantité est plus que 1, décrémenter la quantité
        return { ...item, amount: item.amount - 1 };
      });

      const updatedCart = updatedCartUnfiltered.filter((item) => item !== null);
      return updatedCart;
    });

    // mise a jour de l'inventaire ...
    //nouvelle prop de stock

    const plant = plants.find((plant) => {
      return plant.id === id;
    });
    plant.stock += 1;

    //setter plantes il faut faire comme shopping - props udaplants et plants

    updatePlants(plants);
  }
  //ouvre et ferme la panier
  const [isOpen, setIsOpen] = useState(true);

  //calcule le total du panier
  const total = cart.reduce(
    (acc, plantType) => acc + plantType.price * plantType.amount,
    0
  );

  // useEffect - on veut que le titre de l'onglet change pour le montant total du panier
  useEffect(() => {
    document.title = `LMJ: $${total} d'achats`;
  }, [total]);

  return isOpen ? (
    <div className="lmj-cart">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(false)}
      >
        X
      </button>
      {/* si la longueur du panier plus grand que 0 on map chaque item et son ordre(item, index) */}
      {cart.length > 0 ? (
        <div>
          <h2>Cart</h2>

          <ul>
            {cart.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </ul>

          <h3>Total :${total}</h3>
          <button onClick={() => updateCart([])}>
            Empty your shopping cart
          </button>
        </div>
      ) : (
        <div>Your shopping cart is empty</div>
      )}
    </div>
  ) : (
    <div className="lmj-cart-closed">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(true)}
      >
        Open the cart
      </button>
    </div>
  );
}

export default Cart;
