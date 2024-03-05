import express from 'express'
import { registerController, logincontroller,getAllAccounts,getaccountByIdController,updateAccountController, deleteAccountController } from '../controllers/authController.js'
import { requireSignIn, isUser , isAdmin, isManager} from '../middlewares/authMiddleware.js'
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

// Route for handling the Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication
  // Redirect to different pages based on user's role
  if (req.user.role === 0) { // Assuming 0 represents a regular user role
    res.redirect('/user-dashboard');
  } else if (req.user.role === 1) { // Assuming 1 represents an admin role
    res.redirect('/admin-dashboard');
  }else if (req.user.role === 2) { // Assuming 2 represents an manager role
    res.redirect('/manager-dashboard');
  } else {
    // Handle other roles or unknown roles
    res.redirect('/dashboard'); // Default redirect to dashboard
  }
});


// Route for logging out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});



// protected user route auth
// router.get('/user-auth', requireSignIn, (req, res) => {
//     res.setHeader('Cache-Control', 'no-store');
//     res.status(200).send({ ok: true });
// });

// protected User route auth
router.get('/user-auth',requireSignIn, isUser,(req,res)=>{
    res.status(200).send({ok:true});
})
// protected Admin route auth
router.get('/admin-auth',requireSignIn, isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// protected Manager route auth
router.get('/manager-auth',requireSignIn, isManager,(req,res)=>{
    res.status(200).send({ok:true});
})


export default router