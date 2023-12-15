import { ObjectId } from 'mongodb';

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) return;

    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection('comments');
    } catch (e) {
      console.error(
        `unable to establish a connection handle in reviewDAO: ${e}`,
      );
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        email: user.email,
        movie_id: new ObjectId(movieId),
        text: review,
        date: date,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userEmail, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { email: userEmail, _id: new ObjectId(reviewId) },
        { $set: { text: review, date: date } },
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userEmail) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        email: userEmail,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
