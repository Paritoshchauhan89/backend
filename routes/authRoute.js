import express from 'express'
import { registerController, logincontroller,getAllAccounts,getaccountByIdController,updateAccountController, deleteAccountController } from '../controllers/authController.js'
import { requireSignIn, isUser , isAdmin, isManager} from '../middlewares/authMiddleware.js'

// router object
const router = express.Router()

// routing

router.post('/register',registerController);
router.post('/login',logincontroller);
router.get('/all-accounts',getAllAccounts);
router.get('/get-account/:id', getaccountByIdController);
router.put('/update-acount/:id',updateAccountController)
router.delete('/delete-account/:id', deleteAccountController);







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