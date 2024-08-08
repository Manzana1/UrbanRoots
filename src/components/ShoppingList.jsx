import { useState } from 'react'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'
import StockManager from './StockManager'
import { plantList } from '../datas/plantList'
// import PortalPlantItem from '../components/PortalPlantItem'

//


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
        if (plantAlreadyInCart) {

            //ajuste la quantité au stock




            const cartFilteredCurrentPlant = cart.filter(
                (itemInCart) => itemInCart.name !== name
            )

            updateCart([
                ...cartFilteredCurrentPlant,
                { name, price, id, amount: plantAlreadyInCart.amount + 1 }
            ])
        } else {
            updateCart([...cart, { name, price, id, amount: 1 }])
        }

        const plantsUpdated = plants.map((plant) => {

            if (plant.id === id && plant.stock > 0) {

                const newPlant = {
                    cover: plant.cover,
                    name: plant.name,
                    water: plant.water,
                    light: plant.light,
                    price: plant.price,
                    stock: plant.stock - 1
                }
                return newPlant;

            }



            return plant;
        });

        updatePlants(plantsUpdated)

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