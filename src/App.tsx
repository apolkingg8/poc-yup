import React from 'react';
import './App.css';
import {Button, MUIThemeProvider, TextField} from "@zeals-co-ltd/washi-components";
import {enTheme} from "@zeals-co-ltd/washi-styles";
import * as y from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";


const schema = y
    .object()
    .shape({
        email: y.string().email().required(),
        /*
        ^                         Start anchor
        (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
        (?=.*[!@#$&*])            Ensure string has one special case letter.
        (?=.*[0-9].*[0-9])        Ensure string has two digits.
        (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
        .{8,}                     Ensure string length more than 8.
        $                         End anchor.
        */
        password: y.string().matches(
            /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
        ).required(),
        passwordAgain: y.string().required().oneOf(
            [y.ref('password'), null],
            'Passwords must match',
        ),
    })

function App() {
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <MUIThemeProvider theme={enTheme}>
            <div className={'app'}>
                <form
                    className={'app-form'}
                    onSubmit={handleSubmit((data, event)=> {
                        console.log(data)
                    }, (errors, event)=> {
                        console.error(errors)
                    })}
                >
                    <TextField
                        inputProps={{...register('email')}}
                    />
                    <TextField
                        inputProps={{...register('password')}}
                        type={"password"}
                    />
                    <TextField
                        inputProps={{...register('passwordAgain')}}
                        type={"password"}
                    />
                    <Button
                        type={"submit"}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </MUIThemeProvider>
    );
}

export default App;
