/*
[
    { _id: 1, name: 'John Doe', age: 35, gender: 'male' },
    { _id: 2, name: 'Jane Smith', age: 40, gender: 'female' },
    { _id: 3, name: 'Michael Johnson', age: 45, gender: 'male' },
    { _id: 4, name: 'Emily Williams', age: 30, gender: 'female' },
    { _id: 5, name: 'Robert Brown', age: 38, gender: 'male' },
    { _id: 6, name: 'Emma Jones', age: 33, gender: 'female' },
    { _id: 7, name: 'William Davis', age: 37, gender: 'male' },
    { _id: 8, name: 'Olivia Miller', age: 41, gender: 'female' },
    { _id: 9, name: 'David Wilson', age: 36, gender: 'male' },
    { _id: 10, name: 'Sophia Moore', age: 32, gender: 'female' },
    { _id: 11, name: 'Richard Taylor', age: 39, gender: 'male' },
    { _id: 12, name: 'Isabella Anderson', age: 43, gender: 'female' },
    { _id: 13, name: 'Joseph Thomas', age: 34, gender: 'male' },
    { _id: 14, name: 'Mia Jackson', age: 42, gender: 'female' },
    { _id: 15, name: 'Charles White', age: 36, gender: 'male' },
    { _id: 16, name: 'Abigail Harris', age: 31, gender: 'female' },
    { _id: 17, name: 'Daniel Martin', age: 44, gender: 'male' },
    { _id: 18, name: 'Evelyn Thompson', age: 38, gender: 'female' },
    { _id: 19, name: 'Matthew Garcia', age: 37, gender: 'male' },
    { _id: 20, name: 'Sofia Martinez', age: 35, gender: 'female' }
  ]

*/


db.teachers.find({ age: 34 }) 

//@ same thing with the aggreations
db.teachers.aggregate([
    {
        $match: {
            age: 34
        }
    }
])


// @ group teacher by age

db.teachers.aggregate([
    {
        $group: {
            _id: "$age",
            teachersCustom: { $push: "$name" },
            completeDocument: { $push: "$$ROOT" },
          
          
        }
    }
])


// @ group teacher by age and male gender

db.teachers.aggregate([
    {
        $match:{
            gender:"male"
        }
    },
    {
        $group: {
            _id: "$age",
            number : { $sum: 1 },
          
          
        }
    },{
        $sort: {
            number: -1
        }
    }
])




// @ Bucket based grouping

// db.aggregate([
//     {
//         $match: {
//             gender: "male"
//         }
//     },{
//         $bucket: {
//     }
// ])