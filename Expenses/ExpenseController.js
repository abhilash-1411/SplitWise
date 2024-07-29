const pool = require('../db')
const queries=require('./Expensequeries');

//1.Get Groups
const getGroups=(req,res)=>{
    pool.query(queries.getGroups,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
//2 Get GroupBYId
const getGroupById=(req,res)=>{
const id=parseInt(req.params.id)
if(isNaN(id)){
  res.status(400).send('Invalid group ID');
}
pool.query(queries.getGroupById,[id],(error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
})
};

//3. Add Group
const addGroup=(req,res)=>{
    const {name,created_at}=req.body;
    pool.query(queries.addGroup,[name,created_at],(error,results)=>{
      if(error)throw error;
      res.status(201).json(results.rows[0]);
    })
  }

//4. Update Group
const updateGroup=(req,res)=>{
    const id=parseInt(req.params.id);
    const {name}=req.body;
    pool.query(queries.getGroupById,[id],(error,results)=>{
   if(error){
    return res.status(500).send('server error');
   }
   const groupNotFound=results.rows.length===0;
   if(groupNotFound){
    return res.status(404).send('Group not found');
   }
    });
    pool.query(queries.updateGroup,[name,id],(error,results)=>{
        if(error) throw error;
        res.status(200).send("Group updated successfully")

    });
}
// 5. Delete group
const deleteGroup=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.deleteGroup,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).send(`Group ${id} deleted successfully`);
})
}
//6 List all the group member;
// const listGroupMembers=(req,res)=>{
//     const group_id=parseInt(req.params.group_id);
//     pool.query(queries.getGroupMembers,[group_id],(error,results)=>{
//           if(error) throw  error;
//           if(results.rows.length===0){
//             return res.status(404).send('No members found for this group');
//           }
//           res.status(200).json(results.rows);
//     });
// }
//7 Add group member;
// const addGroupMember=(req,res)=>{
//      const {group_id,user_id}=req.body;
//      pool.query(queries.checkGroupandUserExists,[group_id,user_id],(error,results)=>{
//         if(error) throw error;
//         if(results.rows.length>0){
//             return res.status(400).send('user already exist in this group');
//         }
//      }); 
//      pool.query(queries.addGroupMember,[group_id,user_id],(error,results)=>{
//             if(error) throw error;
//             res.status(201).send("member added successfully");
//      });
// }

//8.Remove group member
//    const removeGroupMember=(req,res)=>{
//     const {group_id,user_id}=req.body;
//     pool.query(queries.checkGroupandUserExists,[group_id,user_id],(error,results)=>{
//         if(error) throw error;
//         if(results.rows.length===0){
//             return res.status(404).send('Member does not exists')
//         }
//     }); 
//     pool.query(queries.removeGroupMember,[group_id,user_id],(error,results)=>{
//         if(error) throw error;
//         res.status(200).send("Member remove successfully")
//     });
//    }

//9. 

module.exports={
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup,
    listGroupMembers,
    addGroupMember,
    removeGroupMember,

}