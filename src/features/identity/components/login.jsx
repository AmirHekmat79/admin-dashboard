import Logo from '@assets/images/logo.svg';
import { useTranslation } from 'react-i18next';
import { httpService } from '@core/http-service';

import {
  Link,
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../../contexts/app/app-context/app-context';
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { language } = useAppContext();
  const { t } = useTranslation();
  const submitForm = useSubmit();
  const onSubmit = (data) => {
    submitForm(data, { method: 'POST' });
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const routeErrors = useRouteError();
  return (
    <>
      <div className="text-center mt-4">
        <img src={Logo} style={{ height: '100px' }} alt="logo" />
        <h3 className="h2">{t('login.title')}</h3>
        <p className="lead">{t('login.introMessage')}</p>
        <p className="lead">
          {t('login.areNotRegistered')}
          <Link
            to="/register"
            className={`${language === 'fa' ? 'me-3' : 'ms-3'}`}
          >
            {t('login.register')}
          </Link>
        </p>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t('login.mobile')}</label>
                <input
                  type="text"
                  {...register('mobile', {
                    required: t('login.validation.mobileRequired'),
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
                <label className="form-label">{t('login.password')}</label>
                <input
                  type="password"
                  className={`form-control form-control-lg mb-2 ${
                    errors.password && 'is-invalid'
                  }`}
                  {...register('password', {
                    required: t('login.validation.passwordRequired'),
                  })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <p className="text-danger mt-1 fw-bolder">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t('login.signingin') : t('login.signin')}
                </button>
              </div>
              {routeErrors && (
                <div className="alert alert-danger mt-3 p-2 text-danger text-center mx-auto">
                  {routeErrors.response?.data.map((error) => (
                    <p className="mb-0">
                      {t(`login.validation.${error.code}`)}
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

export default Login;

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post('/Users/login', data);
  if (response.status === 200) {
    localStorage.setItem('token', response?.data.token);
    return redirect('/');
  }
};
