import express from 'express'
import { registerController, logincontroller,getAllAccounts,getaccountByIdController,updateAccountController, deleteAccountController } from '../controllers/authController.js'
import { requireSignIn, isAuthor , isAdmin,isEditor, isReviewer, isQuality, isFormatting } from '../middlewares/authMiddleware.js'
import passport from 'passport';

// router object
const router = express.Router()


// routing

router.post('/register',registerController);
router.post('/login',logincontroller);
router.get('/all-accounts',getAllAccounts);
router.get('/get-account/:id', getaccountByIdController);
router.put('/update-acount/:id',updateAccountController)
router.delete('/delete-account/:id', deleteAccountController);



// google 
// Route for initiating the Google OAuth authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication
  // Redirect to different pages based on user's role
  if (req.user.role === 'author') {
    res.redirect('/author-dashboard');
  } else if (req.user.role === 'admin') {
    res.redirect('/admin-dashboard');
  } else if (req.user.role === 'manager') {
    res.redirect('/manager-dashboard');
  } else if (req.user.role === 'editor') {
    res.redirect('/editor-dashboard');
  } else if (req.user.role === 'reviewer') {
    res.redirect('/reviewer-dashboard');
  } else if (req.user.role === 'quality') {
    res.redirect('/quality-dashboard');
  } else if (req.user.role === 'formatting') {
    res.redirect('/formatting-dashboard');
  } 
});



// Route for logging out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});





// protected User route auth
router.get('/author-auth',requireSignIn, isAuthor,(req,res)=>{
    res.status(200).send({ok:true});
})
// protected Admin route auth
router.get('/admin-auth',requireSignIn, isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// protected Editor route auth
router.get('/editor-auth', requireSignIn, isEditor, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Reviewer route auth
router.get('/reviewer-auth', requireSignIn, isReviewer, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Quality route auth
router.get('/quality-auth', requireSignIn, isQuality, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Formatting route auth
router.get('/formatting-auth', requireSignIn, isFormatting, (req, res) => {
  res.status(200).send({ ok: true });
});


export default router