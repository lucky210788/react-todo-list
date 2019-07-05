import React, {Component} from 'react';
import './singUp.css';
// import {Link} from 'react-router-dom';
import Button from '../UI/button/Button'
import Input from '../UI/input/Input'
// import axios from "../../axios/axios-set";

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^-?\d+\.?\d*$/;
    return re.test(phone);
}

class SingUp extends Component {
    state = {
        newUser: {},
        isFormValid: false,
        formControls: {
            name: {
                value: '',
                type: 'text',
                placeholder: 'Name',
                errorMessage: 'Required field',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            surname: {
                value: '',
                type: 'text',
                placeholder: 'Surname',
                errorMessage: 'Required field',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            phone: {
                value: '',
                type: 'text',
                placeholder: 'Phone',
                errorMessage: 'Only numbers',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    number: true
                }
            },
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

    addUserHandler = () => {
        const newUser = {
            name: this.state.formControls.name.value,
            surname: this.state.formControls.surname.value,
            phone: this.state.formControls.phone.value,
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
        };

        // this.setState({newUser}, async () => {
        //     try {
        //         await axios.post('api/registration', this.state.newUser);
        //         this.state.formControls.name.value = '';
        //         this.state.formControls.surname.value = '';
        //         this.state.formControls.phone.value = '';
        //         this.state.formControls.email.value = '';
        //         this.state.formControls.password.value = '';
        //         this.setState({
        //             newUser: {}
        //         });
        //     } catch (e) {
        //         console.log(e);
        //     }
        // });
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.number) {
            isValid = validatePhone(value) && isValid;
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
                <img src="./img/singup.jpg" alt="" className="form-img"/>
                <form className="text-center" onSubmit={this.submitHeandler}>
                    {this.renderInputs()}
                    <Button
                        disabled={!this.state.isFormValid}
                        className={'btn-main btn-sing-up'}
                        onClick={this.addUserHandler}
                        type="button"
                    >sing up</Button>
                    {/*<p className="some-text">Already have an account! <Link to="/login">Login</Link></p>*/}
                </form>
            </div>
        );
    }
}

export default SingUp;