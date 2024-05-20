import { httpInterceptorService } from '@core/http-service';
import CourseList from '../features/Cources/components/course-list';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
const Courses = () => {
  const data = useLoaderData();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">افزودن دوره جدید</a>
        </div>
        <Suspense
          fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
        >
          <Await resolve={data.courses}>
            {(specificCources) => <CourseList cources={specificCources} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Courses;

export const coursesLoader = () => {
  return defer({
    courses: loadCourses(),
  });
};

const loadCourses = async () => {
  const response = await httpInterceptorService.get('/Course/list');
  return response.data;
};
