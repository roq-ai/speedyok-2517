import axios from 'axios';
import queryString from 'query-string';
import { ApprovalRequestInterface, ApprovalRequestGetQueryInterface } from 'interfaces/approval-request';
import { GetQueryInterface } from '../../interfaces';

export const getApprovalRequests = async (query?: ApprovalRequestGetQueryInterface) => {
  const response = await axios.get(`/api/approval-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createApprovalRequest = async (approvalRequest: ApprovalRequestInterface) => {
  const response = await axios.post('/api/approval-requests', approvalRequest);
  return response.data;
};

export const updateApprovalRequestById = async (id: string, approvalRequest: ApprovalRequestInterface) => {
  const response = await axios.put(`/api/approval-requests/${id}`, approvalRequest);
  return response.data;
};

export const getApprovalRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/approval-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteApprovalRequestById = async (id: string) => {
  const response = await axios.delete(`/api/approval-requests/${id}`);
  return response.data;
};
