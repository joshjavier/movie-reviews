import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/v1/movies';

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${baseUrl}?page=${page}`);
  }

  get(id) {
    return axios.get(`${baseUrl}/id/${id}`);
  }

  find(query, by = 'title', page = 0) {
    let url = new URL(baseUrl);
    if (Array.isArray(by) && by.length === query.length) {
      for (let i = 0; i < by.length; i++) {
        url.searchParams.set(by[i], query[i]);
      }
    } else {
      url.searchParams.set(by, query);
    }
    url.searchParams.set('page', page);

    return axios.get(url);
  }

  createReview(data) {
    return axios.post(baseUrl + '/review', data);
  }

  updateReview(data) {
    return axios.put(baseUrl + '/review', data);
  }

  deleteReview(id, userEmail) {
    return axios.delete(baseUrl + '/review', {
      data: { review_id: id, email: userEmail },
    });
  }

  getRatings() {
    return axios.get(baseUrl + '/ratings');
  }
}

export default new MovieDataService();
