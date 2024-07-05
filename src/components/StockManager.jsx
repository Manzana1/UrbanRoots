import { useState } from "react"
import { plantList } from "../datas/plantList"

//si l'ajoute est plus grand que le stock de la plante, ca s'arrete.


function StockManager({ children }) {
const [stock, setStock] = useState(plantList)

}

export default StockManager