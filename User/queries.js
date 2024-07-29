const getUsers='SELECT * FROM users';
const getUsersById='SELECT * FROM users WHERE id=$1';
const addUsers='INSERT INTO users (name,email,age,dob,password) VALUES ($1, $2, $3, $4, $5)';
const checkEmailExists='SELECT s FROM users s WHERE s.email=$1';
const deleteusers='DELETE FROM users where id=$1';
const updateUsers='UPDATE users SET name=$1 WHERE id=$2 ';
const registerUsers='INSERT INTO users (name,email,password) VALUES ($1,$2,$3)';
const checkEmailExistsLogin= 'SELECT * FROM users WHERE email=$1';
module.exports = {
 getUsers,
 getUsersById,
 addUsers,
 checkEmailExists,
 deleteusers,
 updateUsers,
 registerUsers,
 checkEmailExistsLogin,
}
