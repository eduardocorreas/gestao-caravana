import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";
import { formatCurrency } from "../Utils/mask";

export default function CaravanMemberDetail(props) {
    const [name, setName] = useState(props.caravanMember.name);
    const [phone, setPhone] = useState(props.caravanMember.phone);
    const [email, setEmail] = useState(props.caravanMember.email);
    const [type, setType] = useState(props.caravanMember.type);
    const [price, setPrice] = useState(0.0);
    const [showForm, setShowForm] = useState(false);
    const [showFormPayment, setShowFormPayment] = useState(false);

    async function updateMember() {
        if (!name || !phone || !email || !type) {
            NotificationManager.error(
                "Todos os campos são obrigatórios",
                "Ação necessária!",
                5000
            );
        } else {
            await axios
                .put("/caravana/membro", {
                    id: props.caravanMember.id,
                    name,
                    phone,
                    email,
                    type,
                })
                .then((res) => {
                    window.location.reload();
                    NotificationManager.success(res.data, "Sucesso", 5000);
                })
                .catch((err) => {
                    console.log(err.data);
                    NotificationManager.error(err, "Erro!", 5000);
                });
        }
    }

    async function storeMemberPayment() {
        if (!price || price == 0) {
            NotificationManager.error(
                "Lance um valor válido e maior que 0",
                "Atenção!",
                5000
            );
        } else {
            await axios
                .post("/caravana/membro/pagamento", {
                    caravan_id: props.caravan.id,
                    caravan_member_id: props.caravanMember.id,
                    price,
                })
                .then((res) => {
                    window.location.reload();
                    NotificationManager.success(res.data, "Sucesso", 5000);
                })
                .catch((err) => {
                    console.log(err.data);
                    NotificationManager.error(err, "Erro!", 5000);
                });
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.caravan.name + " - " + props.caravanMember.name}
                </h2>
            }
        >
            <Head
                title={props.caravan.name + " - " + props.caravanMember.name}
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div class="grid grid-cols-1  md:grid-cols-3 gap-3 mb-5">
                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <div class="flex space-x-6 items-center justify-content-between">
                                        <i class="fa fa-user fa-2x mx-5" />
                                        <div>
                                            <p class="font-semibold text-2xl">
                                                {props.payments.length}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Pag. realizados
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <div class="flex space-x-6 items-center">
                                        <i class="fa fa-money-bill-alt fa-2x mx-5" />
                                        <div>
                                            <p class="font-semibold text-2xl">
                                                {formatCurrency(
                                                    props.totalPayments
                                                )}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Total de entrada
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <div class="flex space-x-6 items-center">
                                        <i class="fa fa-arrow-down fa-2x mx-5" />
                                        <div>
                                            <p class="font-semibold text-2xl">
                                                {formatCurrency(
                                                    props.caravan.ticket_price -
                                                        props.totalPayments
                                                )}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                A ser quitado
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end align-items-end mb-5">
                                {!showForm && (
                                    <button
                                        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        Atualizar dados
                                    </button>
                                )}
                                <button
                                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() =>
                                        setShowFormPayment(!showFormPayment)
                                    }
                                >
                                    Lançar pagamento
                                </button>
                            </div>
                            <form
                                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                style={{ display: showForm ? "block" : "none" }}
                            >
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-first-name"
                                        >
                                            Nome
                                        </label>
                                        <input
                                            class="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            value={name}
                                        />
                                    </div>
                                    <div class="w-full md:w-1/4 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Telefone
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            value={phone}
                                        />
                                    </div>
                                    <div class="w-full md:w-1/4 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                        />
                                    </div>
                                    <div class="w-full md:w-1/4 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Tipo
                                        </label>
                                        <select
                                            class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            value={type}
                                        >
                                            <option
                                                value="pilgrim"
                                                selected={
                                                    type === "pilgrim"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Peregrino
                                            </option>
                                            <option
                                                value="admin"
                                                selected={
                                                    type === "admin"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Admin
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex justify-end align-items-end">
                                    <button
                                        class=" mr-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => updateMember()}
                                    >
                                        Atualizar
                                    </button>
                                </div>
                            </form>

                            <form
                                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                style={{
                                    display: showFormPayment ? "block" : "none",
                                }}
                            >
                                <div class="w-full px-3 mb-6 md:mb-3">
                                    <label
                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-first-name"
                                    >
                                        Valor pago
                                    </label>
                                    <NumberFormat
                                        class="w-full appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        onValueChange={(values) => {
                                            setPrice(values.floatValue);
                                        }}
                                        value={price}
                                        thousandSeparator={"."}
                                        prefix={"R$ "}
                                        decimalSeparator=","
                                    />
                                </div>
                                <div class="flex justify-end align-items-end">
                                    <button
                                        class=" mr-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() =>
                                            setShowFormPayment(!showFormPayment)
                                        }
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => storeMemberPayment()}
                                    >
                                        Lançar
                                    </button>
                                </div>
                            </form>

                            <table class="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Valor
                                        </th>
                                        <th class=" text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Data de pagamento
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.payments.map((payment) => (
                                        <tr class="border text-left px-8 py-4">
                                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                <b>
                                                    {formatCurrency(
                                                        payment.price
                                                    )}
                                                </b>
                                            </td>
                                            <td class=" text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {payment.created_at
                                                    .split("T")[0]
                                                    .split("-")
                                                    .reverse()
                                                    .join("/")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
