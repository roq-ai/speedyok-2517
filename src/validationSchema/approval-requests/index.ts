import * as yup from 'yup';

export const approvalRequestValidationSchema = yup.object().shape({
  title: yup.string().required(),
  text: yup.string().required(),
  images: yup.string(),
  status: yup.string().required(),
  requester_id: yup.string().nullable(),
  approver_id: yup.string().nullable(),
});
