import CourseItem from './course-item';

const CourseList = ({ cources }) => {
  return (
    <div className="row">
      {cources.map((cource) => (
        <div className="col-4" key={cource.id}>
          <CourseItem {...cource} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
