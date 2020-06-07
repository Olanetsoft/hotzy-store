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
                location.assign('/home');
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
                location.assign('/home')
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
export const signup = async (email, password) => {
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
                location.assign('/home');
            }, 1500)
        };
    } catch (err) {
        //console.log(err)
        showAlert('error', err.response.data.message);
    }

};



