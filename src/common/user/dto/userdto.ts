export const toUserDetail = (user :any) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    stateMessage: user.stateMessage,
    role: user.role
  }
}