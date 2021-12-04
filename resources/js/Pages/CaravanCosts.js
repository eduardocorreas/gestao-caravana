import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";
import { formatCurrency } from "../Utils/mask";

export default function CaravanCosts(props) {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [typeCost, setTypeCost] = useState("alimentacao");
    const [showFormCosts, setShowFormCosts] = useState(false);

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
                                        <a
                                            href={
                                                "/caravana/" +
                                                props.caravan.slug
                                            }
                                            class="font-bold"
                                        >
                                            {props.caravan.name +
                                                " " +
                                                props.caravan.year}
                                        </a>
                                    </li>
                                    <li>
                                        <span class="mx-2">/</span>
                                    </li>
                                    <li>Custos</li>
                                </ol>
                            </nav>
                            <div>
                                <div class="flex justify-between align-items-center mt-10 mb-3">
                                    <h2 class="text-xl font-bold uppercase">
                                        Últimos custos
                                    </h2>
                                    {showFormCosts ? (
                                        <button
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowFormCosts(!showFormCosts)
                                            }
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                    ) : (
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowFormCosts(!showFormCosts)
                                            }
                                        >
                                            <i class="fa fa-plus text-white"></i>{" "}
                                            Novo custo
                                        </button>
                                    )}
                                </div>
                                <form
                                    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    style={{
                                        display: showFormCosts
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                            <label
                                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                for="grid-first-name"
                                            >
                                                Descrição
                                            </label>
                                            <input
                                                class="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-first-name"
                                                type="text"
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                                value={description}
                                            />
                                        </div>
                                        <div class="w-full md:w-1/4 px-3">
                                            <label
                                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                for="grid-last-name"
                                            >
                                                Valor
                                            </label>
                                            <NumberFormat
                                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
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
                                        <div class="w-full md:w-1/4 px-3">
                                            <label
                                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                for="grid-last-name"
                                            >
                                                Observação
                                            </label>
                                            <input
                                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type="text"
                                                onChange={(e) =>
                                                    setNotes(e.target.value)
                                                }
                                                value={notes}
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
                                                    setTypeCost(e.target.value)
                                                }
                                                value={typeCost}
                                            >
                                                <option value="alimentacao">
                                                    Alimentação
                                                </option>
                                                <option value="guia">
                                                    Guia Turístico
                                                </option>
                                                <option value="hospedagem">
                                                    Hospedagem
                                                </option>
                                                <option value="medicamentos">
                                                    Medicamentos
                                                </option>
                                                <option value="passeio">
                                                    Passeios
                                                </option>
                                                <option value="transporte">
                                                    Transporte
                                                </option>
                                                <option value="outros">
                                                    Outros
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="flex justify-end align-items-end">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => storeCost()}
                                        >
                                            Cadastrar
                                        </button>
                                    </div>
                                </form>

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
                                                            {cost.description}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
