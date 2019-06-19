export const authFailed = state => {
  const isAuthenticated = state.getInPath("auth.isAuthenticated");
  const status = state.getInPath("auth.status");
  if (!isAuthenticated && status == "pending") {
    return false;
  }
  if (!isAuthenticated && status == "failed") {
    return true;
  }
  return false;
};
