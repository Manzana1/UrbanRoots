//Permet d'afficher une plante dansCart.jsx et que le nb de plantes, le montant s'incrémente. C'est aussi pour le bouton x pour supprimer un 1 item

function CartItem({ item, index, onRemove }) {
  return (
    <div>
      <span>
        {index + 1}. {item.name} - ${item.price} x {item.amount}
      </span>
      <button onClick={() => onRemove()}>x</button>
    </div>
  );
}

export default CartItem;
