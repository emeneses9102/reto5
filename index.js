const express = require('express')
const app = express()
const routesProductos = require('./routes.Productos')
const handlebars = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname+"/public"))

app.use('/productos',routesProductos)


app.set('views','./views')

/*****  Plantillas *******/

//plantilla EJS
app.set('view engine','ejs')

//plantilla PUG
//app.set('view engine','pug')

//plantilla Handlebars
/*app.set('view engine','hbs')
app.engine('hbs',handlebars.engine({
    extname: ".hbs",
    defaultLayout:"index.hbs",
    layoutsDir:__dirname+"/views/layouts",
    partialsDir:__dirname+"/views/partials"
}))*/





const PORT= 8080
const server = app.listen(PORT, (err)=>{
    if(err) console.log(err)
    console.log(`Servidor escuchandose en el puerto ${PORT}`)
})
