import React, {Component, useState} from "react"
import logo from "./logo.svg"
import "./App.css"
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
// @ts-ignore
import Notifications, {notify} from 'react-notify-toast';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            alignContent: "center",
            display: "flex",
            margin: "auto",
            minHeight: '99vh'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
type MyState = {};


class LambdaDemo extends Component<{}, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {loading: false, msg: null}
    }

    handleClick = (api: string) => (e: { preventDefault: () => void }) => {
        e.preventDefault();

        this.setState({loading: true});
        fetch("/.netlify/functions/" + api)
            .then(response => response.json())
            .then(json => this.setState({loading: false, msg: json.msg}))
    };

    render = () => {
        // @ts-ignore
        const {loading, msg} = this.state;

        return (
            <p>
                {/*Sukunimi, Etunimi. Vuosiluku. Teoksen nimi. Teoksen julkaisija. [Viitattu päivämäärä] Saatavilla: URLI*/}
                <span>{msg}</span>
            </p>
        )
    };
}




function App() {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const [reference, setReference] = useState('');

    // @ts-ignore
    const onSubmit = (data, e) => {
        e.preventDefault();

        const {
            Sukunimi,
            Etunimi,
            Vuosiluku,
            TeoksenNimi,
            Viitattu,
            Saatavilla
        } = data;

        let referenceString = `${Sukunimi}, ${Etunimi}. ${Vuosiluku}. ${TeoksenNimi}. [Viitattu ${Viitattu}] Saatavilla: ${Saatavilla}`;

        setReference(referenceString);
        navigator.clipboard.writeText(referenceString).then(r => notify.show('Lähdeviite kopioitu', "success"));
        ;
        console.log(data);
    };

    return (
        <Grid container className={classes.root}>
            <Notifications />
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <TextField id="Sukunimi" label="Sukunimi" name="Sukunimi" variant="outlined"
                                   inputRef={register}/>
                    </Grid>
                    <Grid item xs>
                        <TextField id="Etunimi" label="Etunimi" name="Etunimi" variant="outlined" inputRef={register}/>
                    </Grid>
                    <Grid item xs>
                        <TextField id="Vuosiluku" label="Vuosiluku" name="Vuosiluku" variant="outlined"
                                   inputRef={register}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <TextField id="Teoksen-nimi" label="Teoksen nimi" name="TeoksenNimi" variant="outlined"
                                   inputRef={register}/>
                    </Grid>
                    <Grid item xs>
                        <TextField id="Viitattu" label="[Viitattu päivämäärä]" name="Viitattu" variant="outlined"
                                   inputRef={register}/>
                    </Grid>
                    <Grid item xs>
                        <TextField id="Saatavilla" label="Saatavilla: URLI" name="Saatavilla" variant="outlined"
                                   inputRef={register}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignContent='center' alignItems='center'>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type="submit" variant="contained" color="primary">Luo lähdeviite + kopioi</Button>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </form>

            <Grid container spacing={3} alignContent='center' alignItems='center'>

                <Grid item xs={12}>
                    <span><pre id="reference">
                        {
                            reference
                        }
                    </pre></span>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default App
