import React from "react";
import logo from "../img/logo_peregrinacoes.png";

export default function ApplicationLogo({ className }) {
    return (
        <img src={logo} alt="Logo Peregrinações Maíra" className={className} />
    );
}
