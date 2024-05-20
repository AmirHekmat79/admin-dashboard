import { useForm } from 'react-hook-form';
import { httpInterceptorService } from '@core/http-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCategoryContext } from './category-context';
import { useEffect } from 'react';

const AddOrUpdateCategory = ({ setShowAddCategory }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { category, setCategory } = useCategoryContext();
  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('id', category.id);
    }
  }, [category]);
  const onSubmitForm = async (data) => {
    setShowAddCategory(false);
    const response = httpInterceptorService.post(`/CourseCategory/`, data);
    toast.promise(
      response,
      {
        pending: 'در حال ذخیره اطلاعات...',
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            if (category) {
              setCategory(null);
            }
            return 'عملیات با موفقیت انجام شد';
          },
        },
        error: {
          render({ data }) {
            if (data.response.status === 400) {
              return t('categoryList.' + data.response.data.code);
            } else {
              return 'خطا در اجرای عملیات';
            }
          },
        },
      },
      {
        position: 'bottom-left',
      }
    );
  };
  const onClose = () => {
    setShowAddCategory(false);
    setCategory(null);
  };
  return (
    <div className="card">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <label className="form-label">نام</label>
            <input
              {...register('name', { required: true })}
              className={`form-control form-control-lg ${
                errors.name && 'is-invalid'
              }`}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
            )}
          </div>
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-primary ms-2">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateCategory;
