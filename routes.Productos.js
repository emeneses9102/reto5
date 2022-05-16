const { Router } = require('express')
const router = Router()


const productos = []
let idProducto = 1

//middleware
const verificarProducto = (req,res,next)=>{
    const {id} = req.params
    const producto = productos.filter((item)=>{
        return item.id === parseInt(id) 
    })
    if(producto.length === 0){
        return res.json({error: "Producto no encontrado"})
    }
    next();
}

const errorMiddleware = (err, req, res, next)=>{
    if(err){
        return res.status(500).json({error:err})
    }
    next()
}

//Listar todos los productos
router.get('/', (req, res)=>{
    //Render para EJS
    res.render('listado',{productos})

    //Render para PUG
    //res.render('tablaProductos',{productos})

    //Render para HBS
    //res.render('main',{productos:productos})
})

//Listar producto por id
router.get('/:id',verificarProducto, (req, res )=>{
    const {id} = req.params
    const producto = productos.filter((item)=>{
        return item.id === parseInt(id) 
    })
    res.json({producto: producto})
})

//Registra un producto y muestra un mensaje con el id asignado
router.post('/', errorMiddleware,(req, res )=>{
    const producto = req.body
    producto["id"]=idProducto
    productos.push(producto)
    //res.json({Sistema: `Se registró el producto con el ID ${idProducto}`})
    idProducto++
    res.redirect('/productos')
})

//Actualiza un producto por ID
router.put('/:id',verificarProducto, (req, res)=>{
    const {id} = req.params
    const product = req.body
    product["id"]= parseInt(id)

    const posicion = productos.findIndex(item =>{
        return item.id === parseInt(id) 
    }) 
   productos.splice(posicion,1,product)
    
    res.json({mensaje: 'El producto ha sido actualizado'})
})

//Elimina un producto por ID
router.delete('/:id', verificarProducto,(req, res)=>{
    const {id} = req.params

    const posicion = productos.findIndex(item =>{
        return item.id === parseInt(id) 
    }) 
    productos.splice(posicion,1)

    res.json({mensaje: 'El producto ha sido eliminado'})
})
module.exports= router