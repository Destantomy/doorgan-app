import React, { useEffect, useState, useRef } from 'react'
import NavbarUser from '../../components/NavbarUser'
import { useProductsContext } from '../../hooks/useProductsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import UserProductsTable from '../../components/UserProductsTable'
import FooterUser from '../../components/FooterUser'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Overlay from 'react-bootstrap/Overlay'
import { useLogout } from '../../hooks/useLogout'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p>Tata cara mengunduh desain jersey </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>1. Klik tombol $Buy pada jersey yang diinginkan</p>
        <p>2. Lakukan pembayaran melalui menu payment yang tersedia</p>
        <p>3. Jangan tutup jendela payment pada saat melakukan pembayaran, karena setelah pembayaran berhasil halaman akan redirect secara otomatis ke halaman download desain</p>
        <p>4. Setelah pembayaran berhasil aplikasi otomatis redirect menuju halaman download desain, di sini anda dapat mengunduh desain jersey yang diinginkan</p>
        <p>5. Anda juga dapat menghubungi admin melalui tombol WhatsApp berikut. Salam Doorgan Apparel&trade; !</p>
      </Modal.Body>
    </Modal>
  );
}

const Home = () => {
  const { products, dispatch } = useProductsContext()
  const { user } = useAuthContext()
  const [search, setSearch] = useState('')
  const [element, setElement] = useState(4)
  const [isLoad, setLoad] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const {logout} = useLogout()

  const [lastActiveTime, setLastActiveTime] = useState(new Date());

  const load = () => {
    setElement(element + 4);
    if (element >= products.length) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };
  const slicedProducts = products ? products.slice(0, element) : [];

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = process.env.PUBLIC_CLIENT
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/api/endpoint/products/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        const productsWithImageUrls = json.map(product => ({
          ...product,
          imageUrl: `http://localhost:4000/images/${product.productSnapshot}`
        }))
        dispatch({ type: 'SET_PRODUCTS', payload: productsWithImageUrls })
      }
    }
    if (user) {
      fetchProducts()
    }
  }, [dispatch, user])

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

  return (
    <div onClick={handleInteraction}>
      <NavbarUser />
      <div className="user-products-header">
        <Form>
          <Form.Control
            className='user-products-search'
            type="text"
            autoFocus
            style={{ textAlign: 'center' }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jersey"
          />
        </Form>
      </div>
      <div className="user-products-container">
        <div className="user-products-body">
          {products !== null && products.length > 0 ? (
            slicedProducts
              .filter((product) => {
                return search.toLowerCase() === ''
                  ? product
                  : product.productTitle.toLowerCase().includes(search);
              })
              .map((product) => (
                <UserProductsTable key={product._id} product={product} />
              ))
          ) : (
            <Spinner
              animation="border"
              variant="danger"
              role="status"
              className="user-admin-spinner"
            />
          )}
        </div>
        <div className="user-products-pagination">
          {!isLoad && <button onClick={load} className="btn btn-secondary">Load more</button>}
          {isLoad && <span>Reached maximum pages</span>}
        </div>
        <div className="user-products-wa">
          <FontAwesomeIcon icon={faCircleInfo} className='custom-message btn btn-link' bounce onClick={() => setModalShow(true)} />
          <FontAwesomeIcon icon={faWhatsapp} className='custom-message btn btn-success' ref={target} onClick={() => setShow(!show)} />
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <Overlay target={target.current} show={show} placement="top">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: '#52be80',
                  padding: '2px 10px',
                  color: 'white',
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                <p style={{ textAlign: 'center' }}>Mohon maaf!<br />Untuk saat ini tombol WA belum dapat digunakan 🙏</p>
              </div>
            )}
          </Overlay>
        </div>
      </div>
      <FooterUser />
    </div>
  )
}

export default Home
