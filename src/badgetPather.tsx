import { BadgePost } from './iconPost';

export const BadgetPather = ({ method, router, title, children }: any) => {
  return (
    <details className="text-gray-700 p-2">
      <summary className=" flex w-full cursor-pointer">
        <div className="flex items-center flex-1">
          <div>
            <BadgePost method={method} />
          </div>

          <span className=" font-black mx-2">{router}</span>

          <p className="flex-1"> {title}</p>
        </div>
      </summary>
      {children}
      <div>
        <h3 className="uppercase mb-2 font-semibold text-gray-500">Path params</h3>
        <div className="rounded-md border-2">
          <div className="bg-gray-100 p-3">
            <div>
              <span className="font-bold">slug</span> <span className="">string</span>{' '}
              <span className="text-red-500">required</span>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus mollitia eum non, magni temporibus
              veniam natus commodi hic, cupiditate magnam consequuntur animi, architecto provident laudantium velit.
              Repellat, eligendi quibusdam. Debitis.
            </p>
          </div>

          <div className="bg-gray-100 p-3">
            <div>
              <span className="font-bold">limit</span> <span className="">number</span>{' '}
            </div>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus mollitia eum non, magni temporibus
              veniam natus commodi hic, cupiditate magnam consequuntur animi, architecto provident laudantium velit.
              Repellat, eligendi quibusdam. Debitis.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="uppercase mb-2 font-semibold text-gray-500">Headers</h3>
        <div className="rounded-md border-2">
          <div className="bg-gray-100 p-3">
            <div>
              <span className="font-bold">Authorization</span> <span className="">string</span>
            </div>
            <p>
              Possimus mollitia eum non, magni temporibus veniam natus commodi hic, cupiditate magnam consequuntur
              animi, architecto provident laudantium velit. Repellat, eligendi quibusdam. Debitis.
            </p>
          </div>
        </div>
      </div>

      <div className=" border-b-4 bg-gray-300 my-4" />
    </details>
  );
};
