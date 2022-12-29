const imageValidate = (images) => {
    let imagesTable = []
    if(Array.isArray(images)){
        imagesTable = images
    }else {
        imagesTable.push(images)
    }
    if(imagesTable.length > 3) {
        return {error: "Send no more than 3 images at once"}
    }
    /*this is a for loop in javascript*/
    for(let image of imagesTable) {
        if(image.size > 1048576)
            return {error: "Size of image too large (Over 1 MB)"}

        const filetypes = /jpg|jpeg|png/
        const mimetype = filetypes.test(image.mimetype)
        if(!mimetype) {
            return {error: "Incorrect file type (jpg, jpeg or png only)"}
        }
    }
    return {error: false}
}

module.exports = imageValidate