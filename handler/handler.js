const express = require('express');
const router = express.Router();
const Schema = require('../model/schemas')


router.get('/', (req, res) => {
    
    res.send("<h1>HOME PAGE!!</h1>")
});

router.post("/", async (req, res)=>{
    const {firstName ,lastName, userName ,email ,country ,state ,city} = req.body

    if (!firstName || !lastName || !userName || !email || !country || !state || !city) {
        return res.send({
            status: 422,
            message: "Please Fill all Filled!"
        })
    }

    const newUser = {
        firstName: firstName, 
        lastName: lastName,
        userName: userName,
        email: email,
        country: country,
        state: state,
        city: city,
    }
    

    try{
        const userSaved = await Schema.Users.findOne({ email: email })

        if (userSaved) {
            return res.send({
                status: 422,
                message: "Email Already Register"
            })
        } else{
            await Schema.Users.create(newUser)
            
            console.log("New User Created");
            res.status(200).json({
                status: 200,
                message: "New User Created."})
            // res.send({status: "SuccessFul", data: userSaved})
            res.end()
        }

    }catch(err){
        console.log(err);
        res.end("Not Created")
    }
})

router.post('/loginUser', async (req, res) => {
    const { userName, email } = req.body

    if (!userName || !email) {
        return res.send({
            status: 422,
            message: "Please Fill all Filled!"
        })
    }

    try {
        let userSaved = await Schema.Users.findOne({ 
            userName: userName, 
            email: email 
        })

        if (userSaved) {

            console.log("User LoggedIn");
            res.status(200).json({
                status: 200,
                message: "User LoggedIn.",
                data: userSaved
            })
            res.end()
        } else{
            return res.send({
                status: 422,
                message: "Username or Email not Register"
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/contactUs", async (req, res)=>{
    const {firstName ,lastName, email ,guestCount ,date ,eventLocation ,comment} = req.body

    if (!firstName || !lastName || !guestCount || !email || !date || !eventLocation || !comment) {
        return res.send({
            status: 422,
            message: "Please Fill all Filled!"
        })
    }

    const newContact = {
        firstName: firstName, 
        lastName: lastName,
        email: email,
        guestCount: guestCount,
        date: date,
        eventLocation: eventLocation,
        comment: comment,
    }
    

    try{
        const userSaved = await Schema.ContactUs.findOne({ email: email })

        if (userSaved) {
            return res.send({
                status: 422,
                message: "Email Already Contacted Us Before!"
            })
        } else{
            await Schema.ContactUs.create(newContact)
            
            console.log("New User Created");
            res.status(200).json({
                status: 200,
                message: "Thank You!, we will get back to you as Soon as Possible."})
            // res.send({status: "SuccessFul", data: userSaved})
            res.end()
        }

    }catch(err){
        console.log(err);
        res.end("Didn't Contacted.")
    }
})


router.post("/postMenu", async (req, res)=>{
    let {cocktails ,username, date ,cups ,location ,comment} = req.body

    // console.log(req.body);
    

    if ( !cups || !date || !location ) {
        return res.send({
            status: 422,
            message: "Please Fill all Filled!"
        })
    }

    if(!comment){
        comment = "Default Arrangement"
    }
    

    try{
        const userSaved = await Schema.Users.findOne({ userName: username })

        console.log(userSaved);
        

        const newMenu = {
            cocktails: cocktails, 
            email: userSaved.email,
            date: date,
            cups: cups,
            location: location,
            comment: comment,
            user: userSaved._id,
        }

        if (!userSaved) {
            return res.send({
                status: 422,
                message: "User Error in DB!"
            })

        } else{
        
            await Schema.Menus.create(newMenu)
            
            console.log("Menu Added");
            res.status(200).json({
                status: 200,
                message: "Thank You!"}
            )
            res.end()
        }

    }catch(err){
        console.log(err);
        res.end("Didn't Contacted.")
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        const allUsers = await Schema.Users.find({})
        res.send({status: "ok", data: allUsers})
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;