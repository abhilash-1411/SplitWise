const { query } = require('express');
const pool = require('../db')
const queries=require('./Expensequeries');

const getGroups=(req,res)=>{
    poolExpenses.query(query.getGroups,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};





  
module.exports={
    getGroups,

}