import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";
import { formatCurrency } from "../Utils/mask";

export default function CaravanExtraValue(props) {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [typeExtraValue, setTypeExtraValue] = useState("doacao");
    const [showFormExtraValue, setShowFormExtraValue] = useState(false);

    async function storeExtraValue() {
        if (!description || !price || !typeExtraValue) {
            NotificationManager.error(
                "Todos os campos são obrigatórios",
                "Ação necessária!",
                5000
            );
        } else {
            await axios
                .post("/caravana/valor-extra", {
                    caravan_id: props.caravan.id,
                    description,
                    price,
                    type: typeExtraValue,
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

    async function deleteExtraValue(id) {
        await axios
            .delete("/caravana/valor-extra/" + id)
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
                                    <li>Valor extra</li>
                                </ol>
                            </nav>
                            <div>
                                <div class="flex justify-between align-items-center mt-10 mb-3">
                                    <h2 class="text-xl font-bold uppercase">
                                        Últimos registros
                                    </h2>
                                    {showFormExtraValue ? (
                                        <button
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowFormExtraValue(
                                                    !showFormExtraValue
                                                )
                                            }
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                    ) : (
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowFormExtraValue(
                                                    !showFormExtraValue
                                                )
                                            }
                                        >
                                            <i class="fa fa-plus text-white"></i>{" "}
                                            Novo valor
                                        </button>
                                    )}
                                </div>
                                <form
                                    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    style={{
                                        display: showFormExtraValue
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <div class="flex flex-wrap -mx-3 mb-6">
                                        <div class="w-full md:w-1/3 px-3">
                                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Descrição
                                            </label>
                                            <input
                                                class="appearance-none w-full block bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                                        <div class="w-full md:w-1/3 px-3">
                                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
                                        <div class="w-full md:w-1/3 px-3">
                                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Tipo
                                            </label>
                                            <select
                                                class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                onChange={(e) =>
                                                    setTypeExtraValue(
                                                        e.target.value
                                                    )
                                                }
                                                value={typeExtraValue}
                                            >
                                                <option value="doacao">
                                                    Doação
                                                </option>
                                                <option value="eventos">
                                                    Eventos
                                                </option>
                                                <option value="rifa">
                                                    Rifa
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
                                            onClick={() => storeExtraValue()}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
