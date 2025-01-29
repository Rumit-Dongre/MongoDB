// * __________UPDATE____________________________________________
// Advanced Update ( $inc, $min, $max, $mul, $unset, $rename & Upsert in MongoDB )



//@ har student ki age 1 se increase kardo
db.student.updateMany({}, { $inc: { age: -2} })



//@ hawking ki age 50 kardo agar uski age 25 hai to
//  {
//     _id: ObjectId('6793ef44918e97bb94cb0ce6'),
//     name: 'stephen hawking',
//     age: 25,
//     class: 'Btech'
//   },

db.student.updateOne({name:"stephen hawking"},{$max:{age:50}})


db.student.updateOne({name:"stephen hawking"},{$min:{age:23}})

db.student.updateOne({name:"stephen hawking"},{$mul:{age:2}})

// @# field remove kardo
db.student.updateOne({name:"stephen hawking"},{$unset:{age:1}})
db.student.updateOne({name:"stephen hawking"},{$set:{age:1}})

//@ rename 
db.student.updateOne({name:"stephen hawking"},{$rename:{age:"age1"}})