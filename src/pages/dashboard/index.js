import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { user, loading, isAdmin, logout } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [cardSize, setCardSize] = useState("medium");

  // Redirecionamento baseado no status do usuário
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/dashboard/login");
      } else if (!isAdmin) {
        router.push("/formulario");
      }
    }
  }, [user, isAdmin, loading, router]);

  // Carregar agenda inicial quando o usuário estiver pronto
  useEffect(() => {
    if (user && isAdmin) {
      loadAgenda();
    }
  }, [user, isAdmin]);

  const loadAgenda = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "forms"));
      const usersList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome || "Não informado",
          resNome: data.resNome || "Não informado",
          contato: data.contato || "Não informado",
          email: data.email || "Não informado",
          dataTransporte: data.datatransp || "Não informado",
          horario: data.horario || "Não informado",
          enderecoOrigem: data.endereco || "Não informado",
          enderecoDestino: data.enderecoDistino || "Não informado",
          retornoIncluso: data.retornoSelecinado === "sim",
          horarioRetorno: data.horarioRetorn || "Não informado",
          necessidadesEspeciais: data.text || "Nenhuma necessidade especial",
          cadeiraRodas: data.check === "true",
          status: "Confirmado",
        };
      });
      setUsers(usersList);
      console.log("Dados carregados:", usersList);
    } catch (error) {
      console.error("Erro ao carregar a agenda:", error);
      alert("Erro ao carregar a agenda.");
    }
  };

  // Função para deletar agendamento
  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      try {
        await deleteDoc(doc(db, "forms", id));
        alert("Agendamento excluído com sucesso!");
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        alert("Erro ao excluir o agendamento.");
      }
    }
  };

  // Função para imprimir um agendamento específico
  const printAgendamento = (agendamento) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Comprovante de Agendamento - ${agendamento.resNome}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            .info-container { margin: 20px 0; }
            .info-row { display: flex; margin-bottom: 10px; }
            .info-label { font-weight: bold; width: 200px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .logo { max-width: 150px; }
            .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo.png" alt="Logo Moove+" class="logo" />
            <div>Data: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <h1>Comprovante de Agendamento</h1>
          
          <div class="info-container">
            <h2>Dados do Cliente</h2>
            <div class="info-row">
              <span class="info-label">Nome do Responsável:</span>
              <span>${agendamento.resNome}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Nome do Passageiro:</span>
              <span>${agendamento.nome}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Contato:</span>
              <span>${agendamento.contato}</span>
            </div>
            <div class="info-row">
              <span class="info-label">E-mail:</span>
              <span>${agendamento.email}</span>
            </div>
          </div>
          
          <div class="info-container">
            <h2>Detalhes do Transporte</h2>
            <div class="info-row">
              <span class="info-label">Data do Transporte:</span>
              <span>${agendamento.dataTransporte}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Horário de Saída:</span>
              <span>${agendamento.horario}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Endereço de Origem:</span>
              <span>${agendamento.enderecoOrigem}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Endereço de Destino:</span>
              <span>${agendamento.enderecoDestino}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Retorno Incluso:</span>
              <span>${agendamento.retornoIncluso ? "Sim" : "Não"}</span>
            </div>
            ${
              agendamento.retornoIncluso
                ? `
            <div class="info-row">
              <span class="info-label">Horário de Retorno:</span>
              <span>${agendamento.horarioRetorno}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="info-container">
            <h2>Necessidades Especiais</h2>
            <div class="info-row">
              <span class="info-label">Observações:</span>
              <span>${agendamento.necessidadesEspeciais}</span>
            </div>
          
          </div>
          
          <div class="footer">
            <p>ID do Agendamento: ${agendamento.id}</p>
            <p>Este documento foi gerado automaticamente pelo sistema Moove+</p>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-gray-800 p-4 flex flex-col">
        <button
          onClick={logout} // Adicione o botão de logout
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>

        <h2 className="text-white text-xl font-bold pt-4 pb-6 border-b border-gray-700">
          Painel de Controle
        </h2>
        <button
          onClick={loadAgenda}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ↻ Atualizar Lista
        </button>

        <div className="mt-8">
          <label className="text-white block mb-2">Tamanho dos Cards:</label>
          <select
            onChange={(e) => setCardSize(e.target.value)}
            value={cardSize}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          >
            <option value="small">Pequeno</option>
            <option value="medium">Médio</option>
            <option value="large">Grande</option>
          </select>
        </div>
      </aside>

      {/* Área principal */}
      <main className="bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Lista de Agendamentos Moove+
        </h1>

        <div
          className={`grid gap-6 ${
            cardSize === "small"
              ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
              : cardSize === "medium"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${
                cardSize === "small" ? "p-3" : "p-4"
              }`}
            >
              {/* Cabeçalho do Card */}
              <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                <div>
                  <h3
                    className={`font-bold ${
                      cardSize === "small" ? "text-md" : "text-lg"
                    }`}
                  >
                    {user.resNome}
                  </h3>
                  <h3
                    className={`font-bold ${
                      cardSize === "small" ? "text-md" : "text-lg"
                    }`}
                  >
                    {user.nome}
                  </h3>
                  {cardSize !== "small" && (
                    <p className="text-xs">{user.dataTransporte}</p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Confirmado"
                      ? "bg-green-200 text-green-800"
                      : user.status === "Cancelado"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {/* Corpo do Card */}
              <div
                className={`space-y-3 ${
                  cardSize === "small" ? "text-sm" : "text-md"
                } mt-3`}
              >
                <div>
                  <p className="font-semibold text-gray-700">Contato:</p>
                  <p className=" text-gray-700">{user.contato}</p>
                  {cardSize !== "small" && (
                    <p className=" text-gray-700">{user.email}</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Transporte:</p>
                  <p className=" text-gray-700">
                    {user.dataTransporte} às {user.horario}
                  </p>
                  {cardSize !== "small" && (
                    <>
                      <p className="truncatec text-gray-700">
                        <span className="text-gray-600">De:</span>{" "}
                        {user.enderecoOrigem}
                      </p>
                      <p className="truncate  text-gray-700">
                        <span className="text-gray-600">Para:</span>{" "}
                        {user.enderecoDestino}
                      </p>
                    </>
                  )}
                </div>

                {cardSize !== "small" && (
                  <div>
                    <p className="font-semibold text-gray-700">Retorno:</p>
                    <p className=" text-gray-700">
                      {user.retornoIncluso
                        ? `Sim (${user.horarioRetorno})`
                        : "Não"}
                    </p>
                  </div>
                )}

                {cardSize === "large" && (
                  <div>
                    <p className="font-semibold text-gray-700">Necessidades:</p>
                    <p className=" text-gray-700">
                      {user.necessidadesEspeciais}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => printAgendamento(user)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    title="Imprimir"
                  >
                    🖨️
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
