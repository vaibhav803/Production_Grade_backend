const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }

}






// const asyncHandler = () => {}
// asyncHandler = (fn) => () => {}
// asyncHandler = (fn) => {() => {}}

// const asyncHandler = (fn) => async (req,res,next) => {
//     return

//     try{
//         await fn(req,res,next)
//     } catch(error){
//         res.status(error.code || 500).json({
//             message: error.message,
//             success: false
//         })
//     }



// }

export {asyncHandler}