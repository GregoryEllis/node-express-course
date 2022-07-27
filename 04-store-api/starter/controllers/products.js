const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price:{ $gt: 30} })
        .sort('price')
        .select('name price')

    res.status(200).json({ products, nbHits: products.length })
    // find and returns everything in the products object.
    // const products = await Product.find({})
    // res.status(200).json({ products })
    // Using throw will access the express-async-errors package 
    // throw new Error('testing async errors')
    // res.status(200).json({msg:'products testing route'})
}
const getAllProducts = async (req,res) => {
    // if the user does not enter feature then this logic will not be applied.
    // pulling the featured, company, name, sort, and fields out of the request query
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    // if featured is true setup a new property in queryObject.
    if(featured) {
        // if the featured is set to true then set this property to true if not set it to false
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = {$regex: name, $options: 'i' }
    }
     if(numericFilters) {
         const operatorMap = {
            '>':'$gt',
            '>=':'$gte', 
            '=':'$eq',
            '<':'$lt', 
            '<=':'$lte', 
          }
          const regEx = /\b(<|>|>=|<|<=)\b/g
          let filters = numericFilters.replace(
              regEx,
              (match)=>`-${operatorMap[match]}-`
              )
            //   console.log(filters)

            // These are the two properties that use number values.  
            const options = ['price', 'rating'];
            // split is the method that splits a string into an array
            // here we are splitting it at the comma
            // now using forEach I will iterate over the array
            // now in the callback function I will have access to that item.
            filters = filters.split(',').forEach((item)=> { 
              // array destructing
              // with array destructing order matters.
              // The order will be as follows: field = price/rating, operator = $gt/$gte, value = 40/4.  
              // we are splittig at the hypen this is the reason for including a hypen in the above code.
              // since order matters we are able to grab the correct index from the desturctured array.
              const [field, operator, value] = item.split('-') 
                // only if the field is price or rating which is from my options do I want to add a new property on queryObject.
              if(options.includes(field)){
                  // since this value is a string I most use the Number() method.
                  queryObject[field] = {[operator]: Number(value) }
                  console.log(operator)
              }
            })
     }

    console.log(queryObject)
    // if a property/value pair is not in our model all products and its property/value pairs are return 
    let result = Product.find(queryObject)
    // sort 
    if(sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // The logic:
    // the user will pass in some kind of value.
    // then we multiply this by the linmit
    // if we just have a default page will have 1 - 1 = 0
    // then multiply by the limit its still going to be 0
    // so, effectively we'll skip 0 items
    // and we will limit our response to 7
    // however if the user is going to be looking for the second page 
    // we'll have 2 -1 = 1 and that is multiplied by the limit.
    // so in this case since we are looking for page number 2 to we will skip 7 and have a limit of 7 this is how we will show the second page.
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)
    // 23 products
    // If the res in limit to only 7 items how many page do I have?
    // If we divide 23 by 7 we have 4 pages (7 7 7 2 = 23 items) 
    // The first page will have 7 items. The second page will have 7 items. The third page will have 7 items and the forth page will have 2 items. 

    // await is here b/c the result must be resolved before we recieve the data.
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}