export const computeAverage = (ratings) => {
  if (!ratings.length) return;

  // categories in ratings objects
  const keys = [
    'quality',
    'quantity',
    'communication',
  ];

  // helps compute general average ratings
  let average_counter = 0;

  // object stores average rating for each key
  const avg_ratings = {
    quality: 0,
    quantity: 0,
    communication: 0,
    averageRating: 0,
  };

  // Compute the sum of each rating category
  for (let count = 0; count < ratings.length; count++) {
    keys.forEach((key) => {
      const { rate } = ratings[count][key];
      avg_ratings[key] += rate;
      avg_ratings.averageRating += rate;
      average_counter++;
    });
  }

  // Compute the average rating by category
  keys.forEach((key) => {
    avg_ratings[key] = (avg_ratings[key] / ratings.length).toFixed(2);
  });

  // Compute the average general rating
  avg_ratings.averageRating = (
    avg_ratings.averageRating / average_counter
  ).toFixed(2);

  console.log(avg_ratings, '################3');

  return avg_ratings;
};
