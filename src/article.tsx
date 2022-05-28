import { BiArrowToBottom } from 'react-icons/bi';
import { BadgetPather } from './badgetPather';

function renderOptions(exampleData: any) {
  const returnItems = () => {
    return exampleData.map((data: any) => (
      <tr className="border-t-2">
        <td className="py-2 ">
          <div className="flex items-center">
            <div
              className={`${data?.response?.statusCode === '200' ? 'bg-green-500' : 'bg-red-500'} rounded-full h-4 w-4`}
            />
            <span className="ml-2">{data?.response?.statusCode}</span>
          </div>
        </td>
        <td className="py-2">{data?.router}</td>

        <td className="py-2">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className={` mt-2`}>
      <div className="p-2">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Status</th>
              <th className="text-left">Path</th>
              <th className="text-left">Testar</th>
            </tr>
          </thead>
          <tbody>{returnItems()}</tbody>
        </table>
      </div>
    </div>
  );
}

// remove this complexity
function renderData(posts: any) {
  return posts?.map((postsX: any) => {
    function renderConjunto() {
      const routes: any[] = Object.keys(postsX);
      return routes?.map((route) => {
        const methods = Object.keys(postsX[route]);
        return methods.map((method) => {
          const exampleDataShoulddd = postsX[route][method];

          return (
            <div>
              <h1>{exampleDataShoulddd?.context}</h1>
              {[exampleDataShoulddd].map(({ tests: exampleData }: any) => {
                if (!exampleData || !exampleData[0]?.method) {
                  return null;
                }

                const { context, method: localMethod, title, router } = exampleData[0] ?? {};

                return (
                  <div>
                    <div>
                      <p>{context}</p>
                      <BadgetPather
                        method={localMethod}
                        router={router}
                        title={title}
                        // eslint-disable-next-line react/no-children-prop
                        children={<div>{renderOptions(exampleData)}</div>}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        });
      });
    }

    if (Object.keys(postsX).length === 0) {
      return null;
    }

    return (
      <div className="border flex flex-col p-6">
        <div className="flex justify-center">
          <div className="flex-1">
            <h2 className="text-xl">Cadastra usuários do sistema</h2>
            <p className="text-sm">O Stripe precisa coletar certas informações sobre cada conta criada.</p>
          </div>

          <div className="border rounded-sm ">
            <div className="bg-gray-200 text-gray-700 p-2 uppercase text-sm font-bold">Enpoints</div>
            <div className="py-2 flex flex-col">
              <button type="button" className="uppercase text-sm font-base whitespace-nowrap flex px-2 text-gray-600">
                <div className="text-blue-700">GET</div> <div> /v1/accounts/:id/capabilities/:id</div>
              </button>
              <button type="button" className="uppercase text-sm font-base whitespace-nowrap flex px-2 text-gray-600">
                <div className="text-green-700">POST</div> <div> /v1/accounts/:id/capabilities/:id</div>
              </button>
              <button type="button" className="uppercase text-sm font-base whitespace-nowrap flex px-2 text-gray-600">
                <div className="text-blue-700">GET</div> <div> /v1/accounts/:id/capabilities</div>
              </button>
            </div>
          </div>
        </div>

        <details className="text-gray-700 p-2">
          <summary className=" flex items-center justify-center w-full cursor-pointer ">
            <div className="bg-gray-500 text-white p-1 flex items-center rounded-xl">
              <BiArrowToBottom className="w-4 h-4" />
              ver mais
            </div>
          </summary>
          <div className="border">{renderConjunto()}</div>
        </details>
      </div>
    );
  });
}

export const Article = ({ posts }: any) => {
  return (
    <main className="col-span-8 flex flex-col py-6 px-6 max-h-screen overflow-y-auto">
      <h1 className="text-5xl font-bold text-gray-700 my-4">Bem vindo a documentação da API do blog Valorant tips</h1>

      <p className=" text-lg text-gray-600 my-4">
        Está documentação contém toda a parte técnica relacionada a API do blog{' '}
        <a className="text-blue-500" href="https://valorant-tips.vercel.app/">
          dicas de valorant
        </a>
        , sendo a primeira usando a bibliteca{' '}
        <a className="text-blue-500" href="https://github.com/gabrielogregorio/docbytest">
          doctbytest
        </a>
      </p>

      <p className=" text-lg text-gray-600 my-4">
        A API do blog dicas de Valorant se destina a testarmos a biblioteca docbytest, então ainda estamos arrumando a
        casa e alguns informações podem ter algumas imprecissões, não damos suporte e nem apoiamos o uso da api dicas de
        valorant, atualmente ela é publica, mas é alterada de acordo com as necessidades do dicas de valorant, sem aviso
        prévio!
      </p>

      <h2 className="text-4xl font-bold text-gray-700 my-4">Código aberto</h2>

      <p className=" text-lg text-gray-600 my-4">
        Você pode colaborar com o{' '}
        <a className="text-blue-500" href="https://github.com/gabrielogregorio/valorant-tips">
          frontend
        </a>{' '}
        ou com o{' '}
        <a className="text-blue-500" href="https://github.com/gabrielogregorio/valorant-tips-api">
          backend
        </a>{' '}
        do dicas de Valorant, a qual serve essa documentação, mas já aviso que esse projeto possui poucos ajustes ao
        longo do tempo.
      </p>

      <h2 className="text-4xl font-bold text-gray-700 my-4">A quem se destina?</h2>

      <p className=" text-lg text-gray-600 my-4">
        Essa documentação atende vários publicos, porém, os publicos abaixo são os nossos principais
      </p>

      <ul className=" text-lg text-gray-600 list-disc  mx-4">
        <li>Desenvolvedores de software que queira brincar com a API</li>

        <li>Analista de negócios que queira obter informações sobre a API</li>

        <li>Contribuidores do dicas de valorant</li>
      </ul>

      <h2 className="text-4xl font-bold text-gray-700 my-4">Erros</h2>

      <p className=" text-lg text-gray-600 my-4">
        {`Nossa API usa os códigos tradicionais das API's, erros na faixa de 200 indicam algum tipo de sucesso, na faixa de 400 algum problema com parâmetros passados e 500 algo no servidor. Confira uma tabela com todos os erros usados atualmente no projeto.`}
      </p>

      <table className="table-auto w-full text-lg text-gray-600 my-4 bg-gray-200">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="py-2 border-b border-b-gray-300 text-left px-6">status code</th>
            <th className="py-2 border-b border-b-gray-300 text-left px-6">message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold px-6 py-2">200</td>
            <td className="px-6 py-2">Tudo ocorreu com sucesso</td>
          </tr>
          <tr>
            <td className="font-bold px-6 py-2">204</td>
            <td className="px-6 py-2">Retorno sem conteúdo</td>
          </tr>
          <tr>
            <td className="font-bold px-6 py-2">400 - Bad Request</td>
            <td className="px-6 py-2">Você esqueceu de passar algum parâmetro na requisição</td>
          </tr>

          <tr>
            <td className="font-bold px-6 py-2">401 </td>
            <td className="px-6 py-2">Você precisa de um token de autenticação, ou o seu token expirou</td>
          </tr>

          <tr>
            <td className="font-bold px-6 py-2">403</td>
            <td className="px-6 py-2">Você não tem permissão para acessar essa região.</td>
          </tr>
        </tbody>
      </table>

      {renderData(posts)}
    </main>
  );
};
