import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";

export default function Dashboard(props) {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [initialValue, setInitialValue] = useState("0");
    const [billingTarget, setBillingTarget] = useState("0");
    const [ticketPrice, setTicketPrice] = useState("0");
    const [showForm, setShowForm] = useState(false);

    async function storeCaravan() {
        if (!name || !year || !initialValue || !billingTarget) {
            NotificationManager.error(
                "Todos os campos são obrigatórios",
                "Ação necessária!",
                5000
            );
        } else {
            await axios
                .post("/caravana", {
                    name,
                    year,
                    initialValue,
                    billingTarget,
                    ticketPrice,
                })
                .then((res) => {
                    window.location.reload();
                    NotificationManager.success(res.data, "Sucesso", 5000);
                })
                .catch((err) => {
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
                    Todas as caravanas
                </h2>
            }
        >
            <Head title="Peregrinações Maíra" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div class="flex justify-end align-items-end">
                                {!showForm ? (
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  mb-5"
                                        type="button"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        Cadastrar nova caravana
                                    </button>
                                ) : (
                                    <button
                                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        <i class="fa fa-times" />
                                    </button>
                                )}
                            </div>
                            <form
                                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                style={{ display: showForm ? "block" : "none" }}
                            >
                                <div class="grid grid-cols-1  md:grid-cols-5 gap-3 mb-5">
                                    <div class="">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-first-name"
                                        >
                                            Peregrinação
                                        </label>
                                        <input
                                            class="appearance-none block w-full  bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            value={name}
                                        />
                                        {/* <p class="text-red-500 text-xs italic">
                                            Please fill out this field.
                                        </p> */}
                                    </div>
                                    <div class="">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Ano
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                            value={year}
                                        />
                                    </div>
                                    <div class="">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Valor inicial
                                        </label>
                                        <NumberFormat
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onValueChange={(values) => {
                                                setInitialValue(
                                                    values.floatValue
                                                );
                                            }}
                                            value={initialValue}
                                            thousandSeparator={"."}
                                            prefix={"R$ "}
                                            decimalSeparator=","
                                        />
                                    </div>
                                    <div class="">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Valor esperado
                                        </label>
                                        <NumberFormat
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onValueChange={(values) => {
                                                setBillingTarget(
                                                    values.floatValue
                                                );
                                            }}
                                            value={billingTarget}
                                            thousandSeparator={"."}
                                            prefix={"R$ "}
                                            decimalSeparator=","
                                        />
                                    </div>
                                    <div class="">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Valor da inscrição
                                        </label>
                                        <NumberFormat
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onValueChange={(values) => {
                                                setTicketPrice(
                                                    values.floatValue
                                                );
                                            }}
                                            value={ticketPrice}
                                            thousandSeparator={"."}
                                            prefix={"R$ "}
                                            decimalSeparator=","
                                        />
                                    </div>
                                </div>
                                <div class="flex justify-end align-items-end">
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() => storeCaravan()}
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                            <ul
                                role="list"
                                class="border border-gray-200 rounded-md divide-y divide-gray-200"
                            >
                                {props.caravans.map((caravan) => (
                                    <li
                                        class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                        key={caravan.id}
                                    >
                                        <div class="w-0 flex-1 flex items-center">
                                            <span class="ml-2 flex-1 w-0 truncate">
                                                {caravan.name} - {caravan.year}
                                            </span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a
                                                href={
                                                    "/caravana/" + caravan.slug
                                                }
                                                class="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Ver mais
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
