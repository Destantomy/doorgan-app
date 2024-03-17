import {ProductsContext} from '../context/productsContext'
import {useContext} from 'react'

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw Error('useProductsContext should be used inside the ProductsContextProvider')
  }
  return context
}
