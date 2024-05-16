import { Container } from "react-bootstrap"

function AboutPage() {

    return (
        <div className="AboutPage">
            <Container>
                <h1 className="text-center mt-5">About Wojtek</h1>
                <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
            </Container>
        </div>
    )

}

export default AboutPage