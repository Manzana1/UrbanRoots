import CareScale from './CareScale'
import '../styles/PlantItem.css'
import { useState } from 'react'

function handleClick(plantName) {
	alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`)
}



function PlantItem({ cover, name, water, light, price, stock, category }) {

	// hidden et setHidden c'est pour le hover
	const [hidden, setHidden] = useState(true)
	return (
		<li className='lmj-plant-item' onClick={() => handleClick(name)}>
			{hidden ? null : name}
			<span className='lmj-plant-item-price'>{price}€</span>
			<img className='lmj-plant-item-cover' src={cover} alt={`${name} cover`}
				//on ajoute le hover - avec le texte qui apparait et disparait
				onMouseEnter={() => setHidden(false)}
				onMouseLeave={() => setHidden(true)} />

			{name}

			{/* en ajoutant la plante, le stock descend, et affiche qut de stock */}
			<span>stock: {stock}</span>
			<span>catégorie: {category}</span>
			<div>
				<CareScale careType='water' scaleValue={water} />
				<CareScale careType='light' scaleValue={light} />
			</div>
		</li>
	)
}

export default PlantItem