import Logo from '@assets/images/logo.svg';
import {
  Link,
  useSubmit,
  useNavigation,
  useActionData,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { httpService } from '@core/http-service';
import { useAppContext } from '../../../contexts/app/app-context/app-context';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitForm = useSubmit();
  const onSubmitForm = (data) => {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, { method: 'POST' });
  };
  const { language } = useAppContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const isSuccessOperation = useActionData();
  const navigate = useNavigate();
  const routeErrors = useRouteError();
  const { t } = useTranslation();
  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSuccessOperation]);
  return (
    <>
      <div className="text-center mt-4">
        <img src={Logo} style={{ height: '100px' }} alt="logo" />
        <h3 className="h2">{t('register.title')}</h3>
        <p className="lead">{t('register.introMessage')}</p>
        <p className="lead">
          {t('register.alreadyRegistered')}
          <Link
            to="/login"
            className={`${language === 'fa' ? 'me-3' : 'ms-3'}`}
          >
            {t('register.signin')}
          </Link>
        </p>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="mb-3">
                <label className="form-label">{t('register.mobile')}</label>
                <input
                  type="text"
                  {...register('mobile', {
                    required: t('register.validation.mobileRequired'),
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg  ${
                    errors.mobile && 'is-invalid'
                  }`}
                />
                {errors.mobile && errors.mobile.type === 'required' && (
                  <p className="text-danger mt-1 fw-bolder">
                    {errors.mobile?.message}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === 'minLength' ||
                    errors.mobile.type === 'maxLength') && (
                    <p className="text-danger mt-1 fw-bolder">
                      {t('register.validation.mobileLength')}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t('register.password')}</label>
                <input
                  type="password"
                  {...register('password', {
                    required: t('register.validation.passwordRequired'),
                  })}
                  className={`form-control form-control-lg mb-2 ${
                    errors.password && 'is-invalid'
                  }`}
                />
                {errors.password && errors.password.type === 'required' && (
                  <p className="text-danger mt-1 fw-bolder">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t('register.repeatPassword')}
                </label>
                <input
                  {...register('confirmPassword', {
                    required: t('register.validation.repeatPasswordRequired'),
                    validate: (value) => {
                      if (watch('password') !== value) {
                        return t('register.validation.notMatching');
                      }
                    },
                  })}
                  className={`form-control form-control-lg mb-2 ${
                    errors.confirmPassword && 'is-invalid'
                  }`}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'required' && (
                    <p className="text-danger mt-1 fw-bolder">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <p className="text-danger mt-1 fw-bolder">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t('register.saving') : t('register.register')}
                </button>
              </div>
              {isSuccessOperation && (
                <div className="alert alert-success text-success text-center mx-auto  mt-3 p-2">
                  {t('register.successOperation')}
                </div>
              )}
              {routeErrors && (
                <div className="alert alert-danger mt-3 p-2 text-danger text-center mx-auto">
                  {routeErrors.response?.data.map((error) => (
                    <p className="mb-0">
                      {t(`register.validation.${error.code}`)}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post('/Users', data);
  return response.status === 200;
};
