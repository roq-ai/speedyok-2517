import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApprovalRequestInterface {
  id?: string;
  title: string;
  text: string;
  images?: string;
  status: string;
  requester_id?: string;
  approver_id?: string;
  created_at?: any;
  updated_at?: any;

  user_approval_request_requester_idTouser?: UserInterface;
  user_approval_request_approver_idTouser?: UserInterface;
  _count?: {};
}

export interface ApprovalRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  text?: string;
  images?: string;
  status?: string;
  requester_id?: string;
  approver_id?: string;
}
