const { Router } = require('express')
const controller=require('./Controller');

const router=Router();

router.get('/users',(req,res)=>{
    res.send("Users route")
})

router.get('/',controller.getUsers);
router.get('/:id',controller.getusersById);
router.post("/",controller.addUsers);
router.delete("/:id",controller.deleteusers);
router.put("/:id",controller.updateUsers);
router.post('/register',controller.registerUsers)
router.post('/login',controller.login)

module.exports=router;