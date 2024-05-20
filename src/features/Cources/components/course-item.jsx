import { Link } from 'react-router-dom';

const CourseItem = ({
  title,
  id,
  description,
  duration,
  coverImageUrl,
  courseLevel,
  numOfReviews,
}) => {
  return (
    <div className="card">
      <img className="card-img-top" src={coverImageUrl} />
      <div className="card-header px-4 pt-4 pb-0">
        <div className="badge bg-primary my-2 fw-bolder">{courseLevel}</div>
        <h4 className="mb-0">
          <Link to={`/courses/${id}`}>{title}</Link>
        </h4>
      </div>
      <div className="card-body px-4 pt-2">
        <p className="text-truncate-3">{description}</p>
      </div>
      <div className="card-footer fs-sm  d-flex align-items-center fw-bolder text-secondary justify-content-between">
        <div className="d-flex align-items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-clock align-middle me-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {`${duration} ساعت`}
        </div>
        <div className="d-flex align-items-center gap-1">
          {`${numOfReviews} نظر`}
        </div>
      </div>
    </div>
  );
};
export default CourseItem;
