import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getApprovalRequestById, updateApprovalRequestById } from 'apiSdk/approval-requests';
import { Error } from 'components/error';
import { approvalRequestValidationSchema } from 'validationSchema/approval-requests';
import { ApprovalRequestInterface } from 'interfaces/approval-request';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ApprovalRequestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ApprovalRequestInterface>(
    () => (id ? `/approval-requests/${id}` : null),
    () => getApprovalRequestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ApprovalRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateApprovalRequestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/approval-requests');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ApprovalRequestInterface>({
    initialValues: data,
    validationSchema: approvalRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Approval Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="text" mb="4" isInvalid={!!formik.errors?.text}>
              <FormLabel>Text</FormLabel>
              <Input type="text" name="text" value={formik.values?.text} onChange={formik.handleChange} />
              {formik.errors.text && <FormErrorMessage>{formik.errors?.text}</FormErrorMessage>}
            </FormControl>
            <FormControl id="images" mb="4" isInvalid={!!formik.errors?.images}>
              <FormLabel>Images</FormLabel>
              <Input type="text" name="images" value={formik.values?.images} onChange={formik.handleChange} />
              {formik.errors.images && <FormErrorMessage>{formik.errors?.images}</FormErrorMessage>}
            </FormControl>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'requester_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'approver_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'approval_request',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ApprovalRequestEditPage);
