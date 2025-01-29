



//@ commands
db.personal.insertOne({
  name: "Rumit",
  age: 21,
  dob: ISODate("2002-10-18T08:00:00.000Z"),
  weight: 45,
  kids: null,
  hobbies: ["coding", "sleeping"],
  address: {
    city: "Pune",
    state: "Maharashtra",
    country: "India"
  }
})
db.personal.insertOne({
  name: "Rumit 1",
  age: 21,
  dob: new Date(), // date object hi used karo bad me iske uper in built methods use kar skhte hai
  weight: 45,
  kids: null,
  hobbies: ["coding", "sleeping"],
  address: {
    city: "Pune",
    state: "Maharashtra",
    country: "India"
  }
})



//@ Validations 


db.createCollection("users", {
  validator: {

    $jsonSchema: {

      bsonType: "object",

      required: ["email", "password", "age", "course"],

      properties: {

        email: {
          bsonType: "string",
          description: "must be a string and is required"
        },

        password: {
          bsonType: "string",
          description: "must be a string and is required"
        },

        age: {
          bsonType: "number",
          minimum: 18,
          maximum: 20,
          description: "must be a number and is required"
        },
        course: {
          bsonType: "string",
          description: "must be a string and is required",
          enum: ["javascript", "python", "java"],
          description: ""
        }

      }
    }

  }
})




//@ AGGREGATE PIPELINE
db.student.insertMany([
  {
    name: "Rumit",
    age: 23,
    class: 'Btech'
  },
  {
    name: "albert enistein",
    age: 32,
    class: 'BCA'
  }, {
    name: "nikola tesla",
    age: 24,
    class: 'BCA'
  },
  {
    name: "marie curie",
    age: 20,
    class: 'Bsc'
  }, {
    name: "stephen hawking",
    age: 22,
    class: 'Btech'
  }, {
    name: "steve jobs",
    age: 23,
    class: 'Btech'
  }
])



db.student.aggregate([
  // stage1 => find student class is bca
  {
    $match: {
      class: "BCA"
    }
  }


])


db.student.aggregate([

  {
    $match: {
      age: {
        $gt: 20
      }
    }
  },
])


// both age < 20 and class is btech find
db.student.aggregate([
  {
    $match: {
      $and: [
        { age: { $gt: 20 } },
        { class: "Btech" }
      ]
    }
  }

])

// it returining the count of the student who is greater than 22
db.student.aggregate([

  {
    $match: {
      age: { $gt: 22 }
    }
  },
  {
    $count: "name"
  }


])

//@ one field
// @ asceding order 1 and descing order -1

db.student.aggregate([

  {
    $match: {
      age: { $gt: 22 }
    }
  },
  {
    $sort: { age: -1 }
  }


])

//@ sort by name and age
db.student.aggregate([

  {
    $match: {
      age: { $gt: 22 }
    }
  },
  {
    $sort: { age: -1, name: 1 }
  }


])


//@ projection returning only name and age

db.student.aggregate([

  {
    $match: {
      age: { $gt: 22 }
    }
  }, {
    $sort: { age: 1, name: 1 }
  },
  {
    $project: { name: 1, age: 1, _id: 0 }
  }



])


//@ Projection me custom field bhi bana skhte hai
db.student.aggregate([
  {
    $match: { age: { $gt: 23 } }
  },
  {
    $sort: { age: -1, name: 1 }
  },
  {
    //@ custom fields  
    $project: { name: 1, age: 1, 
      fulldetail:{$concat:["$name"," class is" , "$class"]} }


  }



])

db.student.aggregate([
  {
    $sort: { age: -1, name: 1 }
  },
  {
    $project: {
      name: 1, age: 1, isValidAge: {
        $gt: ["$age", 23]
      }
    }
  }

])




//@ sort by count 
// @ insights of the bca and betch student count 

db.student.aggregate([
  {
    $sortByCount: "$class"
  }
])

// output:[
//   { _id: 'Btech', count: 3 },
//   { _id: 'BCA', count: 2 },
//   { _id: 'Bsc', count: 1 }
// ]



db.student.aggregate([
  {
    $match: { age: { $gt: 20 } }
  },
  {
    $sort: { age: 1, name: 1 }
  },
  {
    $project: {
      name: 1, age: 1, _id:0
    }
  },
  {
    $skip: 2
  },
  {
    $limit: 2
  }

])



//@ sample operator 
//@ it give randfom record of the collection
db.student.aggregate([
  {
    $sample: {
      size: 2
    }
  }
])
