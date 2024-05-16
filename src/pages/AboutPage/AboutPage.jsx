import { Container } from "react-bootstrap"
import memeWojtek from './../../assets/meme_wojtek.jpg'


function AboutPage() {

  return (
    <div className="AboutPage">
      <Container>
        <h1 className="text-center mt-5">About this page</h1>
        <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
        <p className="text-center mt-5 fs-3">We want to dedicate this website to the man who made it possible...</p>
        <p className="text-center mt-5 fs-2">Please give it up for</p>
        <h2 className="text-center mt-3 mb-3" style={{ fontSize: '100px' }}>WOJTEK</h2>
        <img src={memeWojtek} alt="Meme de OppenWojtek" className="img-meme mx-auto d-block"
          style={{
            zIndex: 100,
            borderRadius: '40px',
            width: '900px'
          }} />
        <p className="text-center mb-5">(Burn in hell)</p>
      </Container>
    </div>
  )

}

export default AboutPage