const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,fileContent])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
 
};



exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fileContent])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  });

};

exports.getCart = (req, res, next) => {
  
  Cart.getCart((cart)=>{
    Product.fetchAll(products=>{
      const cartProducts=[]
      for(let product of products){
        const cartProductData = cart.products.find(prod=>prod.id===product.id)
        if(cartProductData){
          cartProducts.push({productData:product,qty:cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts
      });
    })
   
  })
 
};

exports.postCart=(req,res,next)=>{
  const id = req.body.productId;
  Product.findById(id,(product)=>{
    Cart.addToCart(id,product.price)
    res.redirect('/cart')
  })
}

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price)
    res.redirect('/cart')
  })

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getProduct=(req,res,next)=>{
  const id = req.params.productId;
  Product.findById(id).then(([product])=>{
    console.log("product detail ",product)
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(err=>{
    console.log("error occured ",err)
  })
}

// exports.getProductDetails=(req,res,next)=>{
//   const id = req.params.productId;
//   Product.findById(id,(product)=>{
//     res.render('shop/product-detail',{
//       path:'/products',
//       pageTitle:'Product Details',
//       product:product
//     })
//   })
 
// }
