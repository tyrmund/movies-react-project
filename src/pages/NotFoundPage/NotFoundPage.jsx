import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function NotFoundPage() {

    return (
        <div className="NotFoundPage mt-5">
            <Container>
                <h1 className="text-center mt-3">Oops! How did you even get here?</h1>
                <img
                    className="w-100 h-auto mx-auto d-block"
                    style={{ maxWidth: '400px' }}
                    src="https://res.cloudinary.com/dc7ycwd1u/image/upload/v1715445067/giphy-750322318_iluil0.gif" alt="not-found-gif" />
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <Button
                        className='btn btn-secondary mx-auto d-block mt-5'>
                        Back to Ironbuster
                    </Button>
                </Link>
            </Container>
        </div>
    )

}

export default NotFoundPage