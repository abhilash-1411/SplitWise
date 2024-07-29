
const { Router } = require('express')
const controller=require('./ExpenseController');

const router=Router();


router.get('/groups',controller.getGroups)

module.exports=router;
