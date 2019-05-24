

export const authFailed = (state) => {
    const isAuthenticated = state.getIn('auth.isAuthenticated'.split('.'))
    const status = state.getIn('auth.status'.split('.'))
    if (!isAuthenticated && status == 'pending') {
        return false
    }
    if (!isAuthenticated && status == 'failed') {
        return true
    }
    return false
}