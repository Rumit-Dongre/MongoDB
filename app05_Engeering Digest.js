// @projection 
db.student.find({}, { name: 1 })
//* Output=> 
/*
    [
  { _id: ObjectId('6793ef44918e97bb94cb0ce2'), name: 'Rumit' },
  {
    _id: ObjectId('6793ef44918e97bb94cb0ce3'),
    name: 'albert enistein'
  },
  { _id: ObjectId('6793ef44918e97bb94cb0ce4'), name: 'nikola tesla' },
  { _id: ObjectId('6793ef44918e97bb94cb0ce5'), name: 'marie curie' },
  {
    _id: ObjectId('6793ef44918e97bb94cb0ce6'),
    name: 'stephen hawking'
  },
  { _id: ObjectId('6793ef44918e97bb94cb0ce7'), name: 'steve jobs' }
]
*/




// * ______________________________________________________

// & Comaprision Operators
// & $lt less than
// & $lte less than equal to
// & $gt greater than
// & $gte greater than equal to

// db.student.find({age:20}) => fillter that matches 


db.student.find({ age: { $lt: 20 } })
db.student.find({ age: { $gt: 20 } })
db.student.find({ age: { $in: [25, 20, 32] } })


//@ suupose this data
// {
//     _id: ObjectId('6793ef44918e97bb94cb0ce2'),
//     name: 'Rumit',
//     age: 20,
//     hobbies:[walk , talk , scream]

// }

db.student.find({ hobbies: "walk" })



//@ 2
// {
//     _id: ObjectId('6793ef44918e97bb94cb0ce2'),
//     name: 'Rumit',
//     age: 20,
//     hobbies:[walk , talk , scream]
//     identity:{
//         hasPanCard:false
//         adharCard:true}

// }

db.student.find({ 'identity.hasPanCard': true })





// * ______________________________________________________

//* Logical Operators
//* $and
//* $or
//* $not

db.student.find({
    $or: [
        { age: { $gt: 20 } }, { age: { $lt: 30 } }
    ]
})


db.student.find({
    $and: [
        { age: { $gt: 20 } }, { age: { $lt: 30 } }
    ]
})


//@ aise student jinke age ho 20 se kaam or hobbis ho walk unko award do 

db.student.find({
    $and: [
        { age: { $gt: 20 } }, { hobbies: "walk" }
    ]
})





// @ $exits true false
db.student.find({ hasMacbook: { $exists: true } })
//=> reyurn alll the documenets who has the field macbook


//@ type
db.student.find({ age: { $type: "number" } })


// @  Evaluation Operators

db.student.find({ age: { $regex: "/^2/" } })



//@ indeing 
// {
//     _id: ObjectId('6793ef44918e97bb94cb0ce2'),
//     name: 'Rumit',
//     age: 20,
//     hobbies:[walk , talk , scream]
//     identity:{
//         hasPanCard:false
//         adharCard:true}
//     },
//     bio:"im a youtuber 1"
// }

// first name the field indeing 
db.student.createIndex({ bio: "text" })


//@ now the field is indexed you can use $text to search 

db.student.find({ $text: { $search: "youtuber" } })
// => this search all the bio whos contain the text search






//* __________ARRAY____________________________________________
// Querying Arrays in MongoDB
// {
//     "_id": ObjectId('6793ef44918e97bb94cb0ce2'),
//     "name": "Rumit",
//     "age": 20,
//     "hobbies": [
//         "walk",
//         "talk",
//         "scream"
//     ],
//     "identity": {
//         "hasPanCard": false,
//         "adharCard": true
//     },
//     "bio": "im a youtuber 1"
//     "experience":[
//         {
//             "company":"Google",
//             "duration":5
//         },
//         {
//             "company":"Amazon",
//             "duration":2
//         }
//     ]
// }


//1 find student who has hobbiesof cricket 

db.student.find({ "hobbies": "cricket" })
// =>this added cricket in the array of hobbies

//2 fdind the student who had the work in nested array doument 

db.student.find({ "experience.company": "Google" })
db.student.find({ "experience.company": "Google" }).size()



//@ SORT
db.student.find().sort({ age: 1 }) //@ a ascending order
db.student.find().sort({ age: -1 }) //@ descending order
db.student.find().sort({ age: 1, name: -1 }) //@ multiple sort



