import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom';
import { httpInterceptorService } from '@core/http-service';
import { Suspense, useState } from 'react';
import CategoryList from '../features/Categories/components/category-list';
import Modal from '../components/modal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AddOrUpdateCategory from '../features/Categories/components/add-or-update-category';
import { useCategoryContext } from '../features/Categories/components/category-context';
const CourseCategories = () => {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const { category } = useCategoryContext();

  const deleteCategory = (categoryId) => {
    setSelectedCourseCategory(categoryId);
    setShowDeleteModal(true);
  };
  const navigate = useNavigate();
  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptorService.delete(
      `/CourseCategory/${selectedCourseCategory}`
    );
    toast.promise(
      response,
      {
        pending: 'در حال حذف...',
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return 'عملیات با موفقیت انجام شد';
          },
        },
        error: {
          render({ data }) {
            return t('categoryList.' + data.response.data.code);
          },
        },
      },
      {
        position: 'bottom-left',
      }
    );
  };
  const data = useLoaderData();
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <a
              className="btn btn-primary fw-bolder mt-n1"
              onClick={() => setShowAddCategory(true)}
            >
              افزودن دسته جدید
            </a>
          </div>
          {(showAddCategory || category) && (
            <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          )}
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات...</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  loadedCategories={loadedCategories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف این دسته اطمینان دارید؟"
      >
        <button
          type="button"
          className="btn btn-secondary fw-bolder"
          onClick={() => {
            setShowDeleteModal(false);
          }}
        >
          انصراف
        </button>
        <button
          type="button"
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};

export default CourseCategories;

export const courseCategoriesLoader = ({ request }) => {
  return defer({
    categories: loadCourseCategories(request),
  });
};

const loadCourseCategories = async (request) => {
  const page = new URL(request.url).searchParams.get('page') || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = '/CourseCategory/sieve';
  url += `?page=${page}&pageSize=${pageSize}`;
  const response = await httpInterceptorService.get(url);
  return response.data;
};
