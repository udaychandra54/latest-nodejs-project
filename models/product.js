const db = require('../util/database')



module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
    return db.execute('insert into products (title,imageUrl,description,price) values (?,?,?,?)',[this.title,this.imageUrl,this.description,this.price])
    
  }

  static fetchAll() {
   return db.execute('select * from products')
  }
 static findById(id){
   return db.execute(' select * from products where products.id=?',[id])
  }

  static deleteById(id){
   
  }
};


