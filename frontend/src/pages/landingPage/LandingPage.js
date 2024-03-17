import React from 'react'
import { useInView } from 'react-intersection-observer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import FooterUser from '../../components/FooterUser'

const LandingPage = () => {
    const { ref: ref1, inView: inView1 } = useInView({
        threshold: 0.1, // 10% harus dalam viewport sebelum trigger
        triggerOnce: false, // Animasi hanya terjadi sekali
      })
    
    const { ref: ref2, inView: inView2 } = useInView({
        threshold: 0.1,
        triggerOnce: false,
      })
    
    const { ref: ref3, inView: inView3 } = useInView({
        threshold: 0.1,
        triggerOnce: false,
      })


  return (
    <div className='landing-page-container'>
      <div className="landing-page-header">
        <div className="landing-page-header-title">
            <h3>Doorgan Apparel &trade;</h3>
            <span>Keep going!</span>
        </div>
        <div className="landing-page-header-log">
            <Link className='btn btn-success' to={'/login'}>
            Signup for free
            <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faRightToBracket} />
            </Link>
        </div>
      </div>
      <div className="landing-page-body">
        <div ref={ref1} className={`landing-page-body-1 ${inView1 ? 'fade-in-up' : ''}`}>
            <div className="body-1-caption">
                <h1>Doorgan Apparel &trade;</h1>
                <span>Sebuah platform yang dibangun untuk membantu anda dalam menemukan desain jersey impian anda.
                    Kami memahami betul bahwa jersey adalah sebuah signature dari sebuah tim,
                    yang mana dengan dimulai dari jersey semangat tim dapat meningkat dan tentu saja
                    jersey merupakan faktor pembeda antara tim satu dengan yang lain.
                </span>
            </div>
            <div className="body-1-img">
                <img src="slide-1.png" alt="Doorgan Apparel" />
            </div>
        </div>
        <hr />
        <div ref={ref2} className={`landing-page-body-2 ${inView2 ? 'fade-in-up' : ''}`}>
            <div className="body-2-img">
            <Carousel data-bs-theme="dark" slide={false}>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.1.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.2.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.3.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.4.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.5.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide-2.6.png"
                alt="Doorgan Apparel"
                />
            </Carousel.Item>
            </Carousel>
            </div>
            <div className="body-2-caption">
                <h1>Temukan banyak desain jersey favorit kamu di sini.</h1>
            </div>
        </div>
        <hr />
        <div ref={ref3} className={`landing-page-body-3 ${inView3 ? 'fade-in-up' : ''}`}>
            <div className="body-3-caption">
                <h1>Punya ide jersey impian?</h1>
                <h5>Request custom jersey impian mu jadi lebih mudah dengan stay keep in touch bersama admin!</h5>
            </div>
            <div className="body-3-img">
                <img src="slide-3.1.png" alt="Doorgan Apparel" />
            </div>
        </div>
      </div>
      <FooterUser />
    </div>
  )
}

export default LandingPage
