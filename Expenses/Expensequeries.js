const getGroups='SELECT * FROM groups';
const getGroupById='SELECT * FROM groups WHERE id = $1 ';
const addGroup = 'INSERT INTO groups (name ,created_at) VALUES ($1,$2) RETURNING *';
const updateGroup= 'UPDATE groups SET name = $1 WHERE id = $2 ';
const deleteGroup ='DELETE FROM groups WHERE id = $1 ';
const getGroupMembers= 'SELECT * FROM users INNER JOIN group_members ON user_id = group_members.user_id' ;
const checkGroupandUserExists= 'SELECT * FROM group_members  where group_id = $1 and user_id = $2 ';
const addGroupMember= 'INSERT INTO group_members (group_id,user_id) VALUES ($1,$2) ';
const removeGroupMember= 'DELETE FROM group_members WHERE group_id = $1 AND user_id = $2 ';

module.exports = {
 getGroups,
 getGroupById,
 addGroup,
 updateGroup,
 deleteGroup,
 checkGroupandUserExists,
 getGroupMembers,
 addGroupMember,
 removeGroupMember,
}