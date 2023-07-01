const mapping: Record<string, string> = {
  'approval-requests': 'approval_request',
  businesses: 'business',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
