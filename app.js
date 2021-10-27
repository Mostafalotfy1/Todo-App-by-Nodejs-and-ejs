const express = require('express');
const app = express();

const mongoose = require('mongoose')
const Item = require('./models/items')
const mongodb = 'mongodb+srv://mostafa11:mostafa11@cluster0.taf1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongodb).then(()=>{console.log('connected')

app.listen(3000);}
).catch((e)=>console.log(e))
app.use(express.urlencoded({extended:true}))
app.set('view engine' , 'ejs');
// app.get('/create-item', (req, res)=>{
//     const item = new Item({
//         name: "computer",
//         price:2000
//     })
//     item.save().then(result => res.send(result))
// })

// app.get('/get-item', (req, res)=>{
    
//     Item.findById('617692d3fef20231d348e971').then(result => res.send(result)).catch((e)=>{console.log(e)})
// })
app.get('/',(req,res)=>{
   res.redirect('/get-items')
})
app.get('/get-items', (req, res)=>{
    
    Item.find().then(result => {
      
        res.render('index',{items:result})
    }).catch((e)=>{console.log(e)})
})
app.get('/add-item',(req,res)=>{
    res.render('add-item')


})
app.post('/items', (req,res)=>{
    const item = Item(req.body)
    item.save().then(()=>{
        res.redirect('/get-items')
    }).catch((e)=>console.log(e))
})
app.get('/items/:id',(req,res)=>{
  //  console.log(req.params)
    const id = req.params.id;
    Item.findById(id).then((result)=>{
        res.render('item-detail',{item:result})
    })
})
app.delete('/items/:id',(req,res)=>{
    //  console.log(req.params)
      const id = req.params.id;
      Item.findByIdAndDelete(id).then((result)=>{
        res.json({redirect:'/get-items'})
         
      })
  })
  app.put('/items/:id',(req,res)=>{
    //  console.log(req.params)
      const id = req.params.id;
      Item.findByIdAndUpdate(id,req.body).then((result)=>{
        res.json({msg:'update sucessfully'})
         
      })
  })
app.use((req,res)=>{
    res.render('error')

})