import moviesService from './services/movies';

export async function moviesLoader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || undefined;

  let filters = {};
  for (const [key, value] of url.searchParams) {
    if (key === 'page' || value === '' || value === 'All Ratings') continue;
    filters[key] = value;
  }

  try {
    let movies, ratings;

    // Fetch movies
    let query = [],
      by = [];
    for (const key in filters) {
      query.push(filters[key]);
      by.push(key);
    }

    if (Object.keys(filters).length === 0) {
      movies = await moviesService.getAll(page).then((res) => res.data.movies);
    } else {
      movies = await moviesService
        .find(query, by, page)
        .then((res) => res.data.movies);
    }

    // Fetch ratings
    ratings = await moviesService
      .getRatings()
      .then((res) => ['All Ratings', ...res.data]);

    return {
      movies,
      ratings,
      searchTitle: filters.title,
      searchRating: filters.rated,
    };
  } catch (e) {
    console.log(e);
  }
}
