//import axios
import axios from 'axios';


//import alert
import { showAlert } from './alert';



//exporting a js file is not like node just add export
export const login = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        //console.log(result)
        if (result.data.status === 'success') {
            //alert("Login omo aiye")
            showAlert('success', 'Logged in Successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        };
    } catch (err) {
        //console.log(err)
        showAlert('error', err.response.data.message);
    }

};

//for login from checkout page
//exporting a js file is not like node just add export
export const login2 = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        //console.log(result)
        if (result.data.status === 'success') {
            //alert("Login omo aiye")
            showAlert('success', 'Logged in Successfully Kindly proceed!');
            window.setTimeout(() => {
                location.assign('/checkout');
            }, 1500)
        };
    } catch (err) {
        //console.log(err)
        showAlert('error', err.response.data.message);
    }

};


//logout
export const logout = async () => {
    try {

        const result = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'

        });
        //console.log(result);
        if ((result.data.status = 'success')) {

            //to give the user some feedback when logging out
            document.querySelector('.nav-link.logout').textContent = 'Logging Out...';
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)

            // showAlert('error', 'Logging out...');
            // window.setTimeout(() => {
            //     location.assign('/')
            // }, 1500)
        }
    } catch (err) {
        console.log(err)
        ///showAlert('error', 'Error logging out ! Try again')
    };
};



//exporting a js file is not like node just add export
export const signup = async (name, email, password, passwordConfirm) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });
        //console.log(result)
        if (result.data.status === 'success') {
            //alert("Login omo aiye")
            showAlert('success', 'Sign up Successful');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        };
    } catch (err) {
        showAlert('error', err.response.data.message);
    }

};


//exporting a js file is not like node just add export
export const postComment = async (name, email, message, subject) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/contact-message',
            data: {
                name,
                email,
                message,
                subject
            }
        });
        if (result.data.status === 'success') {
            showAlert('success', "Message Sent Successfully!");
            window.setTimeout(() => {
                location.assign('/contact');
            }, 1500)
        };
    } catch (err) {
        console.log(err)
        showAlert('error', err.response.data.message);
    }

};



//exporting a js file is not like node just add export
export const postReview = async (review, rating, userId, productId, slug) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/review',
            data: {
                review,
                rating,
                userId,
                productId
            }
        });
        if (result.data.status === 'success') {
            showAlert('success', "Review Sent Successfully!");
            window.setTimeout(() => {
                location.assign(`/product-page/${slug}`);
            }, 1500)
        };
    } catch (err) {
        //console.log(err)
        showAlert('error', err);
    }

};


//exporting a js file is not like node just add export
export const postForgetPassword = async (email) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data: {
                email
            }
        });
        if (result.data.status === 'success') {
            showAlert('success', "Please check your mail inbox!");
            window.setTimeout(() => {
                location.assign(`/login`);
            }, 1500)
        };
    } catch (err) {
        //console.log(err)
        showAlert('error', err);
    }

};


//exporting a js file is not like node just add export
export const patchResetPassword = async (password, passwordConfirm) => {
    try {
        const resetResult = await axios({
            method: 'PATCH',
            url: '/reset/api/v1/users/resetPassword/:token',
            data: {
                password,
                passwordConfirm
            }
        });

        console.log(resetResult.data)
        if (resetResult.data.status === 'success') {
            showAlert('success', "Password reset Successful!");
            window.setTimeout(() => {
                location.assign(`/`);
            }, 1500)
        };
    } catch (err) {
        console.log(err)
        showAlert('error', err);
    }

};



