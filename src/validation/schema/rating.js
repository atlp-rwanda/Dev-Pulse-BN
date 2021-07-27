import Schema from "./index";

const ratingBody = {
  trainee: Schema.id,
  quality: Schema.rating.error(
    (errors) =>
      new Error(`quality is required and must be object and ${errors}`)
  ),
  quantity: Schema.rating.error(
    (errors) =>
      new Error(`quantity is required and must be object and ${errors}`)
  ),
  ProfessionalCommunication: Schema.rating.error(
    (errors) =>
      new Error(
        `Professional communication is required and must be object and ${errors}`
      )
  ),
};

export { ratingBody };
