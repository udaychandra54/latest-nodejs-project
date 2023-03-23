const User = require('../models/user')
exports.getLogin = (req, res, next) => {
  const isLoggedIn=req.session.isLoggedIn
  console.log('isloggedin ',req.session.isLoggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated:isLoggedIn
  });
};

exports.postLogin=(req,res,next)=>{
  User.findById('6419cb5d2d4c5d0a04c4c4d4').then(user=>{
    req.session.isLoggedIn=true
    req.session.user=user;
    req.session.save(()=>{
      res.redirect('/')

    })
  })

}

exports.postLogout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}
