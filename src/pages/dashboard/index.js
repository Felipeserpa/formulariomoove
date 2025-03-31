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
//import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, loading, isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);

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
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Erro ao carregar a agenda:", error);
      toast.error("Erro ao carregar a agenda.");
    }
  };

  // Função para deletar agendamento
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "agUser", id));
      toast.success("Agendamento excluído com sucesso!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir o agendamento.");
    }
  };

  // Função para mover dados para outra coleção
  const handleArmazenar = async (userId) => {
    try {
      const userRef = doc(db, "agUser", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("Usuário não encontrado.");
        return;
      }

      const userData = userSnap.data();
      const newTableRef = doc(db, "relatorios", userId);

      // Mover os dados para a nova coleção
      await setDoc(newTableRef, userData);
      toast.success("Dados movidos com sucesso!");

      // Adicionar log de ação
      const reportRef = collection(db, "relatorios");
      await addDoc(reportRef, {
        userId,
        action: "Dados movidos",
        timestamp: new Date(),
        originalData: userData,
      });

      // Deletar o documento original
      await deleteDoc(userRef);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erro ao mover dados:", error);
      toast.error("Erro ao mover dados.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-[15%_85%] h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 p-4">
        <p className="text-center font-bold pt-8 text-white">
          Formulários Disponíveis
        </p>
        <button
          onClick={loadAgenda}
          className="block mx-auto mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg"
        >
          Atualizar
        </button>
      </div>

      {/* Lista de usuários */}
      <div className="bg-gray-600 p-4">
        <h2 className="text-white text-xl mb-4">Lista de Agendamentos</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-gray-700 p-3 rounded-md mb-2 flex justify-between items-center"
            >
              <span className="text-white">{user.nome}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleArmazenar(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Mover
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
