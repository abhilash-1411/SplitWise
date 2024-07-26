// const { parseArgs } = require("util");
const pool = require("../db");
const queries = require("./queries");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getusersById = (req, res) => {
  const id = parseInt(req.params.id);
  //Validate user
  if (isNaN(id)) {
    return res.status(400).send("Invalid user id");
  }
  pool.query(queries.getUsersById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUsers=(req,res)=>{
    const { name, email, age, dob,password } = req.body;

      //hash the password
    bcrypt.hash(password,10,(error, hashedPassword)=>{
     if(error) throw error;
   
    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (error) throw error;
  
      if (results.rows.length) {
        return res.status(400).send('Email already taken!');
      }
  
      // Add users to the db with hash passwords
      pool.query(queries.addUsers, [name, email, age, dob,hashedPassword], (error, results) => {
        if (error) throw error;
        res.status(201).send('User created successfully!');
      });
      });
    });
}

const deleteusers=(req,res) => {
    const id=parseInt(req.params.id);
    pool.query(queries.deleteusers,[id],(error,results)=>{

        if (error) throw error;
    
        const userNotFound=results.rows.length===0;
        if(userNotFound){
          return  res.status(404).send('That user is not existed in the database!')
        }
    
        pool.query(queries.deleteusers,[id],(error,results)=>{
          if(error) throw error;
          res.status(200).send("student removed sucessfully!")
        })
      })
}

const updateUsers=(req,res) => {
    const id=parseInt(req.params.id);
    const {name,password}=req.body;
  
    pool.query(queries.getUsersById,[id],(error,results)=>{
     
      if (error) {
        return res.status(500).send('Server error');
      }
  
      const noUserFound=results.rows.length===0;
      if(noUserFound){
        return  res.status(404).send('That user is not existed in the database!')
      }
  
      pool.query(queries.updateUsers,[name,id],(error,results)=>{
        if(error)throw error;
        res.status(200).send('student updated sucessfully!')
      })
    })
}
const registerUsers=(req,res) => {
    const {name,email,password}=req.body;

    pool.query(queries.checkEmailExists,[email],(error,results)=>{
          if(error) throw error;
  
          if(results.rows.length) return res.status(400).send('Email already exists!');
  
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password, salt);
  
        
        pool.query(queries.registerUsers,[name,email,hash],(err,data)=>{
          if(error) throw error;
           res.status(201).send('User is been sucessfully registered!');
        })
    })
}

const login=(req,res) => {
    const { email, password } = req.body;

    // Check if user exists
    pool.query(queries.checkEmailExistsLogin, [email], (error, results) => {
      if (error) {
        return res.status(500).send('Server error');
      }
      if (results.rows.length === 0) {
        return res.status(400).send('Email not found!');
      }

      const user = results.rows[0];
  
      console.log('Retrieved user:', user);
      console.log('User password:', user.password);
  
      if (!user.password) {
        console.error('Password is undefined for the user:', user);
        return res.status(500).send('Server error');
      }
  
      // Compare passwords
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          return res.status(500).send('Server Error');
        }
        if (isMatch) {
          // Generate JWT
          const token = jwt.sign({ userId: user.id }, 'jwt_secret', { expiresIn: '560h' });
          console.log('password is sucessfully matched!')
          return res.status(200).json({ token });
        } else {
          return res.status(400).send('wrong password!');
        }
      });
    });
}



module.exports = {
  getUsers,
  getusersById,
  addUsers,
  deleteusers,
  updateUsers,
  registerUsers,
  login
};
