const backendDomain = process.env.BACKEND_URL || 'http://localhost:8080';

const SummaryApi = {
    SignUp : {
        url : `${backendDomain}/api/signup`,	
        method : "POST"
    },
    SignIn : {
        url : `${backendDomain}/api/signin`,	
        method : "POST"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,	
        method : "GET"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,	
        method : "GET"
    },
    allUsers : {
        url : `${backendDomain}/api/all-users`,	
        method : "GET"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,	
        method : "POST"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,	
        method : "POST"
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,	
        method : "POST"
    },
    productCategory : {
        url : `${backendDomain}/api/get-productCategory`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCart : {
        url : `${backendDomain}/api/add-to-cart`,
        method : 'post'
    },
    addToCartCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-card-product`,
        method : 'get'
    }

}

export default SummaryApi