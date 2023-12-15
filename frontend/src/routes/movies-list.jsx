import { useEffect } from 'react';
import { Form, Link, useLoaderData } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FormGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function MoviesList() {
  const { movies, ratings, title, rating } = useLoaderData();

  useEffect(() => {
    document.getElementById('title').value = title || '';
  });

  return (
    <Container>
      <Row>
        <Col>
          <Form role="search">
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search by title"
                id="title"
                name="title"
                defaultValue={title}
              />
            </FormGroup>
            <Button>Search</Button>
          </Form>
        </Col>
        <Col>
          {/* <Form role="search">
            <FormGroup>
              <FormControl as="select" name="rating" defaultValue={rating}>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <Button>Search</Button>
          </Form> */}
        </Col>
      </Row>

      <Row>
        {movies.map((movie) => (
          <Col key={movie._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img src={movie.poster} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Rating: {movie.rated}</Card.Text>
                <Card.Text>{movie.plot}</Card.Text>
                <Link to={`/movies/${movie._id}`}>View Reviews</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MoviesList;
