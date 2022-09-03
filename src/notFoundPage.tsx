import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './components/layout/container';
import { Header } from './components/layout/header';
import { Illustration } from './components/widgets/illustration';

export const NotFoundPage = (): ReactElement => {
  return (
    <Container>
      <Header />

      <Illustration
        title={'Page Not Found - 404'}
        subtitle={
          <>
            {`You can try to access the `}
            <Link to={'/docs'} className="underline">
              /docs{' '}
            </Link>
            {`route, that's usually where we have the documentation`}
          </>
        }
        imageSrc="404 error lost in space-bro.svg"
        imageAlt="not found image"
        referenceHref="https://storyset.com/online"
        referenceText="Online illustrations by Storyset"
      />
    </Container>
  );
};
