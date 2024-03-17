import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import NavbarAdmin from '../../components/NavbarAdmin'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProductsTable from '../../components/ProductsTable'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { Pagination } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '../../hooks/useLogout'

  const Products_admin = () => {

  const {products, dispatch} = useProductsContext()
  const {user} = useAuthContext()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  
  /* /timer */
  const {logout} = useLogout()

  const [lastActiveTime, setLastActiveTime] = useState(new Date());

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      const currentTime = new Date();
      const diffInMilliseconds = currentTime - lastActiveTime;
      if (diffInMilliseconds >= 60000) {
        logout();
      }
    }, 60000);

    return () => clearTimeout(logoutTimer);
  }, [lastActiveTime]);

  const handleInteraction = () => {
    setLastActiveTime(new Date());
  };
  /* /timer */

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/api/endpoint/products/admin/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        // Map products to include imageUrl
        const productsWithImageUrls = json.map(product => ({
          ...product,
          imageUrl: `http://localhost:4000/images/${product.productFile}`
        }))
        dispatch({type: 'SET_PRODUCTS', payload: productsWithImageUrls})
      }
    }
      if (user) {
        fetchProducts()
      }
  }, [dispatch, user])

  // Check if products is null or undefined
  if (!products) {
    return (
      <div>
        <NavbarAdmin />
        <div className="products-admin-body">
          <Spinner animation="border" variant='danger' role="status" className='products-admin-spinner'>
          </Spinner>
        </div>
      </div>
    )
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter((product) => {
      return search.toLowerCase() === '' ? product : product.productTitle.toLowerCase().includes(search);
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div onClick={handleInteraction}>
      <NavbarAdmin />
        <div className="products-admin">
            <div className="products-admin-header">
              <div className="products-admin-add">
                <Link to='/admin/add-product' className='btn btn-warning'>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                <span style={{marginLeft: '5px'}}>Add Product</span>
                </Link>
              </div>
              <div className="products-admin-search">
                <Form>
                  <Form.Control
                    className='custom-search'
                    type="text"
                    autoFocus
                    style={{ textAlign: 'center' }}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jersey" />
                </Form>
              </div>
            </div>
            <div className="products-admin-body">
              {currentProducts.map((product) => (
                <ProductsTable key={product._id} product={product} />
              ))}
            </div>
            <div className="products-admin-pagination">
            <Pagination>
              {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
            </div>
        </div>
    </div>
  )
}

export default Products_admin
