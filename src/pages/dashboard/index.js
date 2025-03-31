//import Navbar from "../../components/navbarAdmin";
//import Modal from "../../components/modal";
import { useEffect, useState } from "react";
//import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
//import { RiDeleteBin6Fill } from "react-icons/ri";
//import { FcApproval } from "react-icons/fc";
import { db } from "../../services/firebaseConection";
import React from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
const Dashboard = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const { user, loading, isAdmin } = useContext(AuthContext);
  const router =
    useRouter();

    // Função para ordenar os dados
    /*const sortUsersByDateAndTime = (usersArray: any[]) => {
    return usersArray.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.time.localeCompare(b.time);
    });
  };*/

  useEffect(() => {
    if (!user && !loading) {
      router.push("/dashboard/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null; // A página não renderiza até que o usuário esteja autenticado
  }

  // Carregar agenda inicial
  useEffect(() => {
    loadAgenda();
  }, []);

  // Função para carregar agendamentos
  const loadAgenda = async () => {
    try {
    } catch (error) {
      console.error("Erro ao carregar a agenda:", error);
      toast.error("Erro ao carregar a agenda.");
    }
  };

  // Função para deletar agendamento
  const handleDelete = async () => {
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
  const handleArmazenar = async () => {
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

  return (
    <div>
      <div className="grid grid-cols-[15%_85%] h-screen">
        {/* Sidebar */}
        <div className=" bg-gray-800">
          <div>
            <p className="mt-2 text-center font-bold pt-8">
              Formularios Disponíveis
            </p>
            <button
              onClick={loadAgenda}
              className="ml-16  rounded-full w-24 bg-white font-bold mt-2 border-zinc-950 text-zinc-950"
            >
              Atualizar
            </button>
            <div className="ml-11"></div>
          </div>
        </div>

        {/* Lista de usuários */}
        <div className="bg-gray-600"></div>
      </div>
    </div>
  );
};

export default Dashboard;
