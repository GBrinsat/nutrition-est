function isNotLoggedIn(req, res, next) {
    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect("/login")
    } 

    next()
}

function isLoggedIn(req, res, next) {
    // Check if user is logged in
    if (req.session.user) {
        return res.redirect("/profile")
    } 
    
    next()
}

module.exports = {
    isNotLoggedIn,
    isLoggedIn
}