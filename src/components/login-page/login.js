import React, {Component} from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import Button from '../UI/button/Button'
import Input from '../UI/input/Input'
// import axios from "../../axios/axios-set";
// import Cookies from 'universal-cookie';

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// const cookies = new Cookies();

class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                placeholder: 'Email address',
                errorMessage: 'Enter a valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                placeholder: 'Password',
                errorMessage: 'Minimum length 9 characters',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 9
                }
            }
        }
    };
    submitHeandler = (event) => {
        event.preventDefault();
    };
    // loginHandler = async () => {
    //     const user = {
    //         email: this.state.formControls.email.value,
    //         password: this.state.formControls.password.value,
    //     };
    //     try {
    //         const response = await axios.post('api/login-page', user);
    //         if (response) {
    //             cookies.set('token', response.data, {path: '/'});
    //         }
    //         this.props.onLogIn();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls,
            isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    disabled={this.state.isFormValid}
                    placeholder={control.placeholder}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className="page-wrap text-center">
                <img src="./img/login.jpg" alt="" className="form-img"/>
                <form className="text-center" onSubmit={this.submitHeandler}>
                    {this.renderInputs()}
                    <Button
                        disabled={!this.state.isFormValid}
                        className={'btn-main'}
                        // onClick={this.loginHandler}
                    >login</Button>
                    <p className="some-text">Don't have any account? <Link to="/singup">Sing up</Link></p>
                </form>
            </div>
        );
    }
}

export default Login;