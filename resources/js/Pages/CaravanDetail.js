import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    RadialLinearScale,
    ArcElement,
} from "chart.js";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";
import { formatCurrency } from "../Utils/mask";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    BarElement
);
import { months } from "@/Utils/date";

export default function CaravanDetail(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("peregrino");

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [typeCost, setTypeCost] = useState("alimentacao");
    const [showForm, setShowForm] = useState(false);
    const [showFormCosts, setShowFormCosts] = useState(false);

    async function storeMember() {
        if (!name || !phone || !email || !type) {
            NotificationManager.error(
                "Todos os campos são obrigatórios",
                "Ação necessária!",
                5000
            );
        } else {
            await axios
                .post("/caravana/membro", {
                    caravan_id: props.caravan.id,
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

    async function storeCost() {
        if (!description || !price || !notes || !typeCost) {
            NotificationManager.error(
                "Todos os campos são obrigatórios",
                "Ação necessária!",
                5000
            );
        } else {
            await axios
                .post("/caravana/custos", {
                    caravan_id: props.caravan.id,
                    description,
                    price,
                    notes,
                    type: typeCost,
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

    async function deleteCost(id) {
        await axios
            .delete("/caravana/custos/" + id)
            .then((res) => {
                window.location.reload();
                NotificationManager.success(res.data, "Sucesso", 5000);
            })
            .catch((err) => {
                console.log(err.data);
                NotificationManager.error(err, "Erro!", 5000);
            });
    }

    const dataDoughnut = {
        labels: props.costLabels,
        datasets: [
            {
                label: "# por custo",
                data: props.costValues,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataDoughnutExtraValues = {
        labels: props.extraValuesLabels,
        datasets: [
            {
                label: "# por valor",
                data: props.extraValuesValues,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.caravan.name + " " + props.caravan.year}
                </h2>
            }
        >
            <Head title={props.caravan.name + " " + props.caravan.year} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <nav class="bg-grey-light rounded font-sans w-full mb-5">
                                <ol class="list-reset flex text-grey-dark">
                                    <li>
                                        <a href="/" class="font-bold">
                                            Todas as caravanas
                                        </a>
                                    </li>
                                    <li>
                                        <span class="mx-2">/</span>
                                    </li>
                                    <li>
                                        {props.caravan.name +
                                            " " +
                                            props.caravan.year}
                                    </li>
                                </ol>
                            </nav>
                            <div class="grid grid-cols-1  md:grid-cols-4 gap-3 mb-5">
                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <div class="flex space-x-6 items-center justify-content-between">
                                        <i class="fa fa-user fa-2x mx-5" />
                                        <div>
                                            <p class="font-semibold text-2xl">
                                                {props.members.length}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Inscritos
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
                                                    props.totalValue
                                                )}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Total em caixa
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <div class="flex space-x-6 items-center">
                                        <i class="fa fa-hand-holding-usd fa-2x mx-5" />
                                        <div>
                                            <p class="font-semibold text-2xl">
                                                {formatCurrency(
                                                    props.totalPayments
                                                )}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Total de inscrições
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
                                                    props.totalCosts
                                                )}
                                            </p>
                                            <p class="font-semibold text-sm text-gray-400">
                                                Total de custos
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-1  md:grid-cols-2 gap-3 mb-5">
                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <Doughnut
                                        title="Valor extra por categoria"
                                        data={dataDoughnutExtraValues}
                                        style={{ height: 200 }}
                                    />
                                </div>
                                <div class="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
                                    <Doughnut
                                        title="Custos por categoria"
                                        data={dataDoughnut}
                                        style={{ height: 200 }}
                                    />
                                </div>
                            </div>
                            {/* INSCRITOS */}
                            <div>
                                <div class="flex justify-between align-items-center mt-10 mb-3">
                                    <h2 class="text-xl font-bold uppercase">
                                        Últimos Inscritos
                                    </h2>
                                </div>
                                <table class="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Nome
                                            </th>
                                            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Telefone
                                            </th>
                                            <th class="text-right  px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Opções
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.members &&
                                            props.members.map((member) => (
                                                <tr
                                                    class="border text-left px-8 py-4"
                                                    key={member.id}
                                                >
                                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        <b>{member.name}</b>
                                                    </td>
                                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {member.phone}
                                                    </td>
                                                    <td class="text-right border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        <a
                                                            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            href={
                                                                "/caravana/" +
                                                                props.caravan
                                                                    .slug +
                                                                "/membro/" +
                                                                member.id
                                                            }
                                                        >
                                                            <i class="fa fa-eye text-white"></i>{" "}
                                                            Ver mais
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                <div class="mt-3 mb-5 text-right">
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={() =>
                                            window.location.replace(
                                                "/caravana/membro/" +
                                                    props.caravan.slug
                                            )
                                        }
                                    >
                                        <i class="fa fa-eye text-white"></i> Ver
                                        todos
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div class="grid grid-cols-1  md:grid-cols-2 gap-3 mb-5">
                                {/* CUSTOS */}
                                <div>
                                    <div class="flex justify-between align-items-center mt-10 mb-3">
                                        <h2 class="text-xl font-bold uppercase">
                                            Últimos custos
                                        </h2>
                                    </div>

                                    <table class="items-center bg-transparent w-full border-collapse ">
                                        <thead>
                                            <tr>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Descrição
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Valor
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Anotações
                                                </th>
                                                <th class="text-right  px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Opções
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.costs &&
                                                props.costs.map((cost) => (
                                                    <tr
                                                        class="border text-left px-8 py-4"
                                                        key={cost.id}
                                                    >
                                                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            <b>
                                                                {
                                                                    cost.description
                                                                }
                                                            </b>
                                                        </td>
                                                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            {formatCurrency(
                                                                cost.price
                                                            )}
                                                        </td>
                                                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            {cost.notes}
                                                        </td>
                                                        <td class="text-right  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            <button
                                                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                onClick={() =>
                                                                    deleteCost(
                                                                        cost.id
                                                                    )
                                                                }
                                                            >
                                                                <i class="fa fa-trash text-white"></i>{" "}
                                                                Excluir
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    <div class="mt-3 text-right">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                window.location.replace(
                                                    "/caravana/custo/" +
                                                        props.caravan.slug
                                                )
                                            }
                                        >
                                            <i class="fa fa-eye text-white"></i>{" "}
                                            Ver todos
                                        </button>
                                    </div>
                                </div>
                                {/* VALOR EXTRA */}
                                <div>
                                    <div class="flex justify-between align-items-center mt-10 mb-3">
                                        <h2 class="text-xl font-bold uppercase">
                                            Valor extra
                                        </h2>
                                    </div>

                                    <table class="items-center bg-transparent w-full border-collapse ">
                                        <thead>
                                            <tr>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Descrição
                                                </th>
                                                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Valor
                                                </th>
                                                <th class="text-right  px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Opções
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.extraValues &&
                                                props.extraValues.map(
                                                    (extraValue) => (
                                                        <tr
                                                            class="border text-left px-8 py-4"
                                                            key={extraValue.id}
                                                        >
                                                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                <b>
                                                                    {
                                                                        extraValue.description
                                                                    }
                                                                </b>
                                                            </td>
                                                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                {formatCurrency(
                                                                    extraValue.price
                                                                )}
                                                            </td>
                                                            <td class="text-right  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                <button
                                                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                    onClick={() =>
                                                                        deleteExtraValue(
                                                                            extraValue.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i class="fa fa-trash text-white"></i>{" "}
                                                                    Excluir
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                    <div class="mt-3 text-right">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                window.location.replace(
                                                    "/caravana/valor-extra/" +
                                                        props.caravan.slug
                                                )
                                            }
                                        >
                                            <i class="fa fa-eye text-white"></i>{" "}
                                            Ver todos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
