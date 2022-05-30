import { ItemsRouter } from './renderCOnjunto';

export function CardsRoutes({ posts }: any) {
  return posts?.map((postsX: any) => {
    if (Object.keys(postsX).length === 0) {
      return null;
    }

    return (
      <div className="border flex flex-col p-6">
        <div className="flex justify-center">
          <div className="flex-1">
            <h2 className="text-xl">{postsX.title}</h2>
            <p className="text-sm">{postsX.description}</p>
          </div>
        </div>

        <ItemsRouter postsX={postsX} />
      </div>
    );
  });
}
