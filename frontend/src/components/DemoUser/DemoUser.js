import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


export default function DemoUser() {

    const { closeModal } = useModal();
    const history = useHistory()
    const dispatch = useDispatch()
    const credential = "Demo-lition"
    const password = "password"

    useEffect(() => {
        dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push("/"))
    }, [])

    return (
        <h1>Loading...</h1>
    )
}
