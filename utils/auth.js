const withAuth = (req, res, next) =>{

    // redirects user to /login page if they aren't logged in
    if(!req.session.user_id){
        res.redirect('/login');
    }
    else{
        next();
    }
};

module.exports = withAuth;