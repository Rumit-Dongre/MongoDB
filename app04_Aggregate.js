

//@ LOOKUP
//* join two collection for data representation
//* two collection must be one common field


db.library.aggregate([
    {
        $lookup: {
            from: "student",
            localField: "student_id", //@ library ke anadar konssi field hai vo
            foreignField: "_id", //@ student ke anadr ki jo field hai vo

            as: "student_kadata_hain" //@  custom naam  array banta hai
        }
    }
])


// iska ulta bhi kar skhte hai dekh skhte hai ki student ne konsi book issued ki hai 


db.student.aggregate([
    {
        $lookup: {
            from: "library",
            localField: "_id",
            foreignField: "student_id",
            as: "books_issued"
        }
    },
    {
        $unwind: "$books_issued" //@ araay ko object bana deta hai
    }
])


db.student.aggregate([
    {
        $lookup: {
            from: "library",
            localField: "_id",
            foreignField: "student_id",
            as: "books_issued"
        }
    },
    {
        $unwind: "$books_issued" //@ araay ko object bana deta hai
    }
])






