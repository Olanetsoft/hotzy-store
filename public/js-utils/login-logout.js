//import axios
import axios from 'axios';

//import alert
//import { showAlert } from './alert';



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
            alert("Login omo aiye")
            //showAlert('success', 'Logged in Successfully');
            window.setTimeout(() => {
                location.assign('/home');
            }, 1500)
        };
    } catch (err) {
        console.log(err)
        //showAlert('error', err.response.data.message);
    }

};