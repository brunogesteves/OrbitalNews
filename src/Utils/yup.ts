import * as Yup from 'yup';

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('Field Required')
    .min(10, 'Must be minimum 10 digits')
    .max(100, 'Must be maximum 100 digits'),
  posted_at: Yup.date().required('Field Required'),
  content: Yup.string().required('Field Required'),
  image: Yup.string().required('Field Required'),
  categoryId: Yup.number().required('Field Required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Field Required'),
  password: Yup.string().required('Field Required'),
});

export const BannerSchema = Yup.object().shape({
  title: Yup.string().required('Field Required'),
  position: Yup.string().required('Field Required'),
  link: Yup.string().required('Field Required'),
  status: Yup.string().required('Field Required'),
  image: Yup.string().required('Field Required'),
});
