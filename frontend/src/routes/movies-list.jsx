import { useEffect } from 'react';
import { Form, Link, useLoaderData, useSubmit } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FormGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function MoviesList() {
  const { movies, ratings, searchTitle, searchRating } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById('title').value = searchTitle || '';
    document.getElementById('rated').value = searchRating || 'All Ratings';
  }, [searchTitle, searchRating]);

  return (
    <Container>
      <Form role="search">
        <Row>
          <Col>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search by title"
                id="title"
                name="title"
                defaultValue={searchTitle}
              />
            </FormGroup>
            <Button type="submit">Search</Button>
          </Col>
          <Col>
            <FormGroup>
              <FormControl
                as="select"
                id="rated"
                name="rated"
                defaultValue={searchRating}
                onChange={(event) => submit(event.currentTarget.form)}
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>

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
