const joi =require("joi");
const listingSchema=joi.object( {
        listing:joi.object({
            title:joi.string().required(),
            description:joi.string().required(),
            
            image:joi.object({
                filename:joi.string(),

                url:joi.string().allow("",null),
            }),
            
            price:joi.number().required().min(0),
            location:joi.string().required,
            country:joi.string().required(),
        }).required()

    });
   // console.log(listingSchema);
    module.exports=listingSchema;
    const reviewSchema=joi.object({
        review:joi.object({
            comment:joi.string().required(),
            rating:joi.number().required().min(1).max(5),
        }).required()
     });
     module.exports=reviewSchema;