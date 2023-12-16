import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';

function Movie() {
  const { movie } = useLoaderData();

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {/* {props.user && (
                  <Link to={`/movies/${id}/review`}>Add Review</Link>
                )} */}
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
            <br />
            {movie.reviews.map((review, index) => (
              <Card key={review._id}>
                <Card.Body>
                  <h5>{`${review.name} reviewed on ${moment(review.date).format(
                    'Do MMMM YYYY',
                  )}`}</h5>
                  <p>{review.text}</p>
                  {/* {props.user && props.user.id === review.user_id && (
                    <Row>
                      <Col>
                        <Link to={`/movies/${id}/review`}>Edit</Link>
                      </Col>
                      <Col>
                        <Button variant="link">Delete</Button>
                      </Col>
                    </Row>
                  )} */}
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;
