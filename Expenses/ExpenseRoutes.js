const expression =require("express");
const { Router } = require('express')
const controller=require('./ExpenseController');

const router=Router();

router.get('/expenses', (req, res) => {
    res.send('Expenses route');
});


router.get('/groups',controller.getGroups);
router.get('/groups/:id',controller.getGroupById);
router.post('/groups',controller.addGroup);
router.put('/groups/:id',controller.updateGroup);
router.delete('/groups/:id',controller.deleteGroup);
router.get('/getGroup/:group_id',controller.listGroupMembers);
router.post('/groups/addMember',controller.addGroupMember);
router.post('/removeGroupMember/:user_id',controller.removeGroupMember);


module.exports=router;
