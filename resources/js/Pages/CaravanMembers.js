import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";

export default function CaravanMembers(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("peregrino");
    const [showForm, setShowForm] = useState(false);

    async function storeMember() {
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
                                    <li>Membros</li>
                                </ol>
                            </nav>
                            <div>
                                <div class="flex justify-between align-items-center mt-10 mb-3">
                                    <h2 class="text-xl font-bold uppercase">
                                        Últimos inscritos
                                    </h2>
                                    {showForm ? (
                                        <button
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowForm(!showForm)
                                            }
                                        >
                                            <i className="fa fa-times"></i>
                                        </button>
                                    ) : (
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() =>
                                                setShowForm(!showForm)
                                            }
                                        >
                                            <i class="fa fa-plus text-white"></i>{" "}
                                            Nova inscrição
                                        </button>
                                    )}
                                </div>
                                <form
                                    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    style={{
                                        display: showForm ? "block" : "none",
                                    }}
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
                                            {/* <p class="text-red-500 text-xs italic">
                                            Please fill out this field.
                                        </p> */}
                                        </div>
                                        <div class="w-full md:w-1/4 px-3">
                                            <label
                                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                for="grid-last-name"
                                            >
                                                Telefone
                                            </label>
                                            <NumberFormat
                                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type="text"
                                                value={phone}
                                                onValueChange={(values) =>
                                                    setPhone(
                                                        values.formattedValue
                                                    )
                                                }
                                                format="(##) #####-####"
                                                mask="_"
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
                                                <option value="pilgrim">
                                                    Peregrino
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="flex justify-end align-items-end">
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => storeMember()}
                                        >
                                            Cadastrar
                                        </button>
                                    </div>
                                </form>

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
                            </div>

                            {/* CUSTOS */}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
