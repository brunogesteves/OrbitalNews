import * as Yup from 'yup';

export const PostSchema = Yup.object().shape({
  title: Yup.string().required('Field Required'),
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
  status: Yup.boolean().required('Field Required'),
  image: Yup.string().required('Field Required'),
});
