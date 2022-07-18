exports.isAdmin = (request, response, next) => {
    if (request.auth.role !== 'ADMIN') {
        return response.status(403).json({ message: 'role is not admin' })
    }
    next()
}



exports.isAuthorized = (request, response, next) => {
    if (request.auth.id !== request.params.id && request.auth.role !== 'ADMIN') {
        return response.status(403).json({ message: 'Not authorized' })
    }
    next()
}


