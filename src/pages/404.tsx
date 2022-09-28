import dynamic from 'next/dynamic';

const NotFoundDynamic = dynamic(() => import('../screens/404'), {
  ssr: false,
});

export default function page404() {
  return <NotFoundDynamic />;
}
