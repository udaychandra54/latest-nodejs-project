const path= require('path');
const fs= require('fs');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports= class Cart{
    static addToCart(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0}
            if(!err){
                cart=JSON.parse(fileContent);
            }
            const existingProductIndex= cart.products.findIndex(p=>p.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }else{
                updatedProduct={id:id,qty:1}
                cart.products=[...cart.products,updatedProduct]
            }
            cart.totalPrice= cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err,fileContent)=>{
                console.log(err)
            })
        })
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                return;
            }
            let cart= JSON.parse(fileContent);
            const updatedCart= {...cart}
           const product= updatedCart.products.find(p=>p.id===id);
           if(!product){
            return;
           }
           const productQty= product.qty;
           updatedCart.totalPrice= updatedCart.totalPrice- productPrice*productQty;
           updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id)
           fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
            console.log(err)
            
        })
        })
    }

    static getCart(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb(null)
            }else{
                cb(JSON.parse(fileContent))
            }
        })
    }

    // static deleteCartItem(id){
    //     fs.readFile(p,(err,fileContent)=>{
    //         if(!err){
    //             let cart= JSON.parse(fileContent);
    //             console.log('cart ',cart)
    //            let updatedCart= cart.products.filter(p=>p.id!==id);
    //            fs.writeFile(p,JSON.stringify(updatedCart),err=>{
    //             console.log(err)
    //            })
    //         }
    //     })
    // }
}