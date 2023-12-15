import moviesService from './services/movies';

export async function moviesLoader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const title = url.searchParams.get('title');
  const rating = url.searchParams.get('rating');

  try {
    let movies, ratings;

    // Fetch movies
    if (title || rating) {
      let query = title ? title : rating;
      let by = title ? 'title' : 'rating';
      movies = await moviesService
        .find(query, by, page)
        .then((res) => res.data.movies);
    } else {
      movies = await moviesService.getAll(page).then((res) => res.data.movies);
    }

    // Fetch ratings
    ratings = await moviesService.getRatings().then((res) => res.data);

    return { movies, ratings, title, rating };
  } catch (e) {
    console.log(e);
  }
}
