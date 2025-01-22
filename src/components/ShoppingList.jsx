import { useState } from 'react'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'
import StockManager from './StockManager'
import { plantList } from '../datas/plantList'
// import PortalPlantItem from '../components/PortalPlantItem'

function ShoppingList({ cart, updateCart, plants, updatePlants }) {
    const [activeCategory, setActiveCategory] = useState('')


    const categories = plants.reduce(
        (acc, elem) =>
            acc.includes(elem.category) ? acc : acc.concat(elem.category),
        []
    )
    // verifier amount pour supprimer - alerte
    function addToCart(name, price, id) {

        const plantAlreadyInCart = cart.find((itemInCart) => itemInCart.name === name)
        let noStock = false

        // trouver et updater la valeur du stock
        const plantsUpdated = plants.map((plant) => {
            if (plant.id === id && plant.stock > 0) {
                plant.stock -= 1;
                //essayer modifier plante actuelle - ok 
                //pas besoin d'en créer un nouveau - just a modifier le stock 12 aout
            } else if (plant.id === id) {
                noStock = true

            }
            return plant;
        });

        updatePlants(plantsUpdated)

        if (noStock) {
            alert('no stock');
        } else {

            if (plantAlreadyInCart) {

                // Récupere items qui n'ont pas changés
                const cartFilteredCurrentPlant = cart.filter(
                    (itemInCart) => itemInCart.name !== name
                )

                // incrémente le compteur
                plantAlreadyInCart.amount = plantAlreadyInCart.amount + 1;

                updateCart([
                    ...cartFilteredCurrentPlant,
                    plantAlreadyInCart
                ])
            } else {
                updateCart([...cart, { name, price, id, amount: 1 }])
            }
        }
    }



    // restock lors du refresh 

    return (
        <div className='lmj-shopping-list'>
            <Categories
                categories={categories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />

            <ul className='lmj-plant-list'>
                {plants.map((plant) =>
                    !activeCategory || activeCategory === plant.category ? (
                        <div key={plant.id}>
                            <PlantItem
                                cover={plant.cover}
                                name={plant.name}
                                water={plant.water}
                                light={plant.light}
                                price={plant.price}
                                stock={plant.stock}

                            />


                            <button onClick={() => addToCart(plant.name, plant.price, plant.id)}>Ajouter</button>
                        </div>
                    ) : null
                )}
            </ul>
        </div>
    )
}

export default ShoppingList