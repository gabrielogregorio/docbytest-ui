import { ReactElement } from 'react';
import { Container } from '../components/layout/container';
import { Header } from '../components/layout/header';
import { Illustration } from '../components/widgets/illustration';

export default function NotFoundPage(): ReactElement {
  return (
    <Container>
      <Header />

      <Illustration
        title={'Page Not Found - 404'}
        subtitle={
          <>
            {`You can try to access the `}
            <a href="/docs" className="underline">
              /docs{' '}
            </a>
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
}
