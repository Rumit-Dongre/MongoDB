

db.createCollection("cust")
db.createCollection("order")

// db.cust.insertMany([ 
//     {
//         '_id':101,
//         name: "John Doe",
//         email:"d5I8i@example.com",
//     },
//     {
//         '_id':102,
//         name: "Emily Smith",
//         email:"Z5I8i@example.com",
//     },
//     {
//         '_id':103,
//         name: "Larry Huster",
//         email:"A5sI8i@example.com"
//     },
//     {
//         '_id':104,
//         name: "Jane Kumar",
//         email:"5sI8i@example.com"
//     }
// ])




db.order.insertMany([
    {
        "_id":1,
        "order_number":"ORD001",
        "cust_id":101, 
    },
    {
        "_id":2,
        "order_number":"ORD002",
        "cust_id":102, 
    },
    {
        "_id":3,
        "order_number":"ORD003",
        "cust_id":103, 
    },
])

db.order.updateOne({
    "_id":3
},{
    $set: {
        "cust_id":105
    }
})



db.cust.aggregate([
    {
        $lookup: {
            from: "order",
            localField: "_id",
            foreignField: "cust_id",
            as: "ordersDetails"
        }
    },
    {
        $project: {
          
          
     
            ordersDetails: 1,
        }
    }

])