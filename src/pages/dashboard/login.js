import { useState } from "react";

import React from "react";

import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.error("Erro ao fazer login:", error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/moove.jpg"
            alt="Moove Logo"
            width={150}
            height={100}
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Área Restrita
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email:
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-red-500 focus:border-red-500"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Senha:
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:ring-red-500 focus:border-red-500"
              name="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login
            </button>
          </div>

          <p className="text-center text-gray-300">Esqueceu a senha?</p>
        </form>
      </div>
    </div>
  );
}
