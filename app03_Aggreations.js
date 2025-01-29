
//@ Aggreations based on group 

// data respresention
db.inspi.insertMany([
    { name: "Khabib", city: "Delhi" },
    { name: "Jhon", city: "Goa" },
    { name: "Cole", city: "London" },
    { name: "Akbar", city: "Agra" },
    { name: "Brock", city: "Goa" },
    { name: "Rey", city: "Delhi" },
    { name: "Kendrick", city: "London" },
])




/*
    ye group bana deta hai unique values ke
*/
db.student.aggregate([
    {
        $group: {
            _id: "$class",
        }
    }
])
//output=> [ { _id: 'Btech' }, { _id: 'BCA' }, { _id: 'Bsc' } ]


//@ count how many records are there in the each group field
db.student.aggregate([
    {
        $group: {
            _id: "$class",
            cooountCustom: { $sum: 1 }
        }
    }
])

//@ output => coutnt the fields
// [
//     { _id: 'Btech', cooountCustom: 3 },
//     { _id: 'BCA', cooountCustom: 2 },
//     { _id: 'Bsc', cooountCustom: 1 }
// ]



db.student.aggregate([
    {
        $match: {
            age: { $gt: 22 }
        }
    },

    {
        $group: {
            _id: "$class",
            cooountCustom: { $count: {} }
        }
    }
])


db.student.aggregate([

    {
        $group: {
            _id: "$class",
            cooountCustom: { $count: {} }
        }
    }, {
        $sort: {
            cooountCustom: 1
        }
    }
])


// @ list all the students
db.student.aggregate([

    {
        $group: {
            _id: "$class",
            students: { $push: "$name" }
        }
    },

])
db.student.aggregate([

    {
        $group: {
            _id: "$age",
            students: { $push: "$name" }
        }
    },

])

//@ return all the records
db.student.aggregate([

    {
        $group: {
            _id: "$class",
            students: { $push: "$$ROOT" }
        }
    }, 

])

//@ add toset
db.student.aggregate([

    {
        $group: {
            _id: "$class",
            students: { $addToSet: "$name" }
        }
    }, 

])

//@ har class me sabse zayada age wala kon hai
db.student.aggregate([

    {
        $group: {
            _id: "$class",
            maximum_student_age: { $max: "$age" }
        }
    }, 
   

])
db.student.aggregate([

    {
        $group: {
            _id: "$class",
            maximum_student_age: { $avg: "$age" }
        }
    }, 
   

])