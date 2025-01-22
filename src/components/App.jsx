import { useState, useEffect } from 'react'
import Banner from './Banner'
import logo from '../assets/logo.png'
import Cart from './Cart'
import Footer from './Footer'
import ShoppingList from './ShoppingList'
import '../styles/Layout.css'
import StockManager from './StockManager'
import { plantList } from '../datas/plantList'

function App() {
	const savedCart = localStorage.getItem('cart')
	console.log(savedCart)
	const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
	const [plants, updatePlants] = useState(plantList)

	console.log('JSON.parse(savedCart)')



	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	return (
		<div>
			<Banner>
				<img src={logo} alt='logo-la-maison-jungle' className='lmj-logo' />
				<h1 className='lmj-title'>La maison jungle</h1>
			</Banner>

			<div className='lmj-layout-inner'>

				<Cart cart={cart} updateCart={updateCart} plants={plants} updatePlants={updatePlants} />
				<ShoppingList plants={plants} cart={cart} updateCart={updateCart} updatePlants={updatePlants} />

			</div>


			<Footer />
		</div>
	)
}

export default App