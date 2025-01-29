
// @ MAKE THE USER COLLECTION SCHEMA 


db.user.insertMany([
    {
        "_id": 18,
        "name": "Rumit Dongre",

        "hobbies": ["cricket", "walk"],
        "class": "Btech",
        "gender": "male",
        "hasMacbook": true,
        "experience": [
            {
                "company": "Google",
                "duration": 5
            },
            {
                "company": "Amazon",
                "duration": 2
            }
        ]

    },
    {
        "_id": 19,
        "name": "Jane Doe",

        "hobbies": ["sWimming", "Coding"],
        "class": "BSc",
        "gender": "female",
        "hasMacbook": true,
        "experience": [
            {
                "company": "tesla",
                "duration": 2

            }]
    },
    {
        "_id": 20,
        "name": "John Doe",

        "hobbies": ["cricket", "walk"],
        "class": "Btech",
        "gender": "male",
        "hasMacbook": true,
        "experience": [
            {
                "company": "capegemini",
                "duration": 1
            },
            {
                "company": "OpenAI",
                "duration": 2
            }

        ]
    },
    {
        "_id": 21,
        "name": "BABU Doe",
        "hobbies": ["sWimming", "Coding"],
        "class": "BSc",
        "gender": "female",
        "hasMacbook": true,
        "experience": [
            {
                "company": "tesla",
                "duration": 2

            }]
    }
])




//@ array added elements
db.user.updateOne({ _id: 21 }, {
    $push: {
        "hobbies": "cricket"
    }

})
db.user.updateOne({ _id: 21 }, {
    $push: {
        "hobbies": {
            $each: ["programming", "pors"]
        }
    }

})






//@ remove elements
db.user.updateOne({ _id: 21 }, {
    $pull: {
        "hobbies": "pors"
    },
    // $pop:{
    //     "hobbies": 1        
    // }

})



db.user.updateOne({ _id: 21 }, {
    $pop: {
        "hobbies": 1
    }

})



//@  Object Match
db.user.find({ "experience.duration": { $gt: 2 } })

db.user.find({ experience: { $elemMatch: { company: "Amazon", duration: 2 } } })


db.user.find({ experience: { $elemMatch: { company: "Google", duration: { $gt: 4 } } } })


db.user.updateOne(
    { _id: 18 },
    { $push: { experience: { company: "Microsoft", duration: 3 } } }
)


db.user.updateOne(
    { _id: 18 },
    { $pull: { experience: { company: "Amazon" } } }
)



//@ $addFields 
db.user.aggregate([
    {
        $addFields: {
            totalExperience: { $sum: "$experience.duration" }
        }
    }
])




//@ Aggreations

db.user.aggregate([
    {
        $match: {
            "hasMacbook": "true"
        }
    },
    {
        $project: {
            name: 1,
            totalExperience: { $sum: "$experience.duration" }
        }
    }

])



db.user.aggregate([
    { $match: { gender: "male" } },
    { $unwind: "$experience" },
    {
        $project: {
            _id: 0,
            name: 1,
            totalExperience: { $sum: "$experience.duration" }
        }
    }
])
