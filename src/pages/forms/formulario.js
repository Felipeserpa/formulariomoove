import { set } from "mongoose";
import React, { use } from "react";
import { useState } from "react";

const TransportForm = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [resNome, setRespNome] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  //criaçao parte 2 formualrio

  const [datatransp, setDataTransp] = useState("");
  const [horario, setHorario] = useState("");
  const [endereco, setEndereco] = useState("");
  const [enderecodistino, setEnderecoDistino] = useState("");
  const [retornoSelecinado, setRetornoSelecionado] = useState(null);
  const [horarioRetorn, setHorarioRetorn] = useState("");
  const [text, setText] = useState("");
  const [check, setCheck] = useState("");
  //criando a funçao

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(nome, data, retornoSelecinado);
  };

  return (
    <div className="bg-black-100 p-6">
      <div className="max-w-2xl mx-auto bg-black p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          Formulário de Solicitação de Transporte – MOOVE+
        </h1>
        <p className="mb-6">
          Obrigado por escolher a MOOVE+! Preencha os campos abaixo para
          agendarmos seu transporte com segurança e conforto.
        </p>

        {/* Seção 1: Informações do Passageiro */}
        <h2 className="text-xl font-semibold mb-4">
          1. Informações do Passageiro
        </h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome completo do idoso:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Data de nascimento:
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome do responsável (se aplicável):
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={resNome}
              onChange={(e) => setRespNome(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Telefone de contato do responsável:
            </label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              E-mail do responsável (opcional):
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* segunda para pra implementaçao do campos e sua viariaveis}


          {/* Seção 2: Informações do Transporte */}
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Informações do Transporte
          </h2>
          <div>
            <label className="block text-sm font-medium mb-1">
              Data do transporte:
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Horário desejado para saída:
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Endereço de origem:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Endereço de destino:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              O retorno está incluso?
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="retorno"
                  value="sim"
                  checked={retornoSelecinado === "sim"}
                  onChange={(e) => setRetornoSelecionado(e.target.value)}
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="retorno"
                  value="nao"
                  checked={retornoSelecinado === "nao"}
                  onChange={(e) => setRetornoSelecionado(e.target.value)}
                />{" "}
                Não
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Se sim, horário estimado para o retorno:
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Seção 3: Necessidades Especiais */}
          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. Necessidades Especiais
          </h2>
          <div>
            <label className="block text-sm font-medium mb-1">
              O idoso utiliza cadeira de rodas ou possui outras necessidades
              especiais?
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Política de Prestação de Serviço */}
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Política de Prestação de Serviço
          </h2>
          <div className="bg-black p-4 rounded-lg overflow-y-auto max-h-64">
            <p className="text-sm">
              1. Objeto
              <br />
              A empresa Moove + oferece serviço de transporte especializado para
              idosos, garantindo segurança, conforto e pontualidade em
              deslocamentos para exames, consultas médicas, fisioterapia,
              diálise, lazer e demais necessidades previamente acordadas.
              <br />
              <br />
              2. Requisitos para Utilização do Serviço <br />
              <br /> 2.1. O serviço deve ser previamente agendado e está sujeito
              à disponibilidade de veículos e motoristas no momento da
              solicitação.
              <br />
              2.2. Os passageiros devem estar aptos a embarcar e desembarcar com
              auxílio mínimo ou estar acompanhados por um cuidador ou
              representante legal responsável, quando necessário. <br />
              2.3. A Moove + não presta serviços de assistência médica e não
              realiza atendimentos de urgência médica durante o transporte.
              <br /> <br />
              3.3. Acompanhamento do Idoso <br /> <br />
              3.1. O idoso poderá utilizar o transporte desacompanhado, salvo
              nos casos em que suas condições de saúde ou mobilidade exigirem a
              presença de um responsável para garantir sua segurança e
              bem-estar. <br />
              3.2. Recomenda-se a presença de um cuidador, acompanhante ou
              representante legal nos seguintes casos: a) Idosos com mobilidade
              reduzida que necessitem de suporte para embarque e desembarque; b)
              Idosos que estejam em tratamento de saúde que requeira supervisão
              contínua; c) Idosos com condições médicas que possam demandar
              assistência emergencial. <br /> 3.3. Se o idoso estiver
              desacompanhado e apresentar dificuldades que coloquem sua
              segurança em risco, o transporte poderá ser recusado ou remanejado
              para um momento em que um responsável possa acompanhá-lo. <br />
              3.4. O acompanhante do idoso é responsável por auxiliá-lo durante
              todo o trajeto e por eventuais decisões médicas em caso de
              necessidade. <br /> <br />
              4.4. Atendimento em Caso de Emergência <br />
              <br /> 4.1. Se houver uma intercorrência médica durante o trajeto,
              a equipe da Moove + adotará as seguintes medidas: a) O motorista
              interromperá o percurso e acionará imediatamente os serviços de
              emergência pública, como SAMU (192) ou Corpo de Bombeiros (193),
              caso necessário; b) Se autorizado pelo responsável cadastrado, o
              idoso poderá ser encaminhado ao hospital de emergência mais
              próximo ou à unidade indicada pelo responsável no momento do
              cadastro; c) A empresa informará imediatamente o responsável
              cadastrado sobre a situação. <br />
              4.2. A Moove + não presta serviços de assistência médica ou
              primeiros socorros, limitando-se a encaminhar o idoso ao local
              adequado para atendimento. <br /> <br />
              {/* Continue com o restante da política */}
              5. Responsabilidades da Empresa <br /> <br />
              5.1. A Moove + compromete-se a fornecer um transporte seguro, com
              veículos adaptados e equipe treinada para um atendimento
              respeitoso e humanizado. <br /> 5.2. O motorista prestará auxílio
              no embarque e desembarque dentro dos limites de segurança e do
              treinamento recebido, não sendo responsável por cuidados médicos
              ou assistência pessoal ao passageiro. <br /> 5.3. A empresa não
              realiza manuseio de medicamentos, administração de remédios ou
              qualquer tipo de intervenção médica. <br /> <br />
              {/* Continue com o restante da política */}
              6. Limitação de Responsabilidade <br /> <br />
              6.1A empresa não se responsabiliza por complicações de saúde,
              quedas, mal-estar ou qualquer outra intercorrência médica ocorrida
              durante o transporte, reforçando a importância de um acompanhante
              quando necessário. <br />
              6.2. A Moove + não substitui serviços de emergência médica e não
              pode ser responsabilizada por diagnósticos, tratamentos ou
              desdobramentos médicos após a chegada do idoso ao hospital. <br />
              6.3. O responsável pelo idoso deve garantir que todas as
              informações de saúde fornecidas no momento do cadastro estejam
              corretas e atualizadas, para que a empresa possa agir da melhor
              forma em casos de necessidade. <br /> <br />
              {/* Continue com o restante da política */}
              7.Aceite dos Termos Ao utilizar o serviço da Moove +: <br />{" "}
              <br />O cliente e/ou seu representante legal declara que: Está
              ciente das condições do serviço e das limitações de
              responsabilidade da empresa; Concorda que, em caso de emergência,
              a Moove + poderá encaminhar o idoso ao hospital mais próximo ou ao
              indicado pelo responsável; Isenta a empresa de qualquer
              responsabilidade além das aqui descritas.
              {/* Continue com o restante da política */}
            </p>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" required />
              <span className="text-sm">
                Li e concordo com os termos e condições de uso do serviço de
                transporte para idosos..
              </span>
            </label>
          </div>

          {/* Botão de Envio */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;
