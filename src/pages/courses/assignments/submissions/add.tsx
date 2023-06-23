import { Suspense } from 'react';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import InputField from 'components/InputField';
import Form from 'components/Form';

const NewSubmissionPageContainer = () => {
  return (
    <PageDataContainer>
      <Heading> Nueva entrega </Heading>
      <Form
        initialValues={{}}
        inputFields={[
          {
            inputComponent: () => <InputField />,
            label: 'Repositorio',
            readError: () => false,
          },
          {
            inputComponent: () => <InputField />,
            label: 'Campo 1',
            readError: () => false,
          },
          {
            inputComponent: () => <InputField />,
            label: 'Campo 1',
            readError: () => false,
          },
        ]}
        buttonsEnabled
        // eslint-disable-next-line
        onSubmitForm={{ text: 'Enviar', onClick: () => {} }}
        // eslint-disable-next-line
        validateForm={() => []}
        // eslint-disable-next-line
        onCancelForm={{ text: 'Cancelar', onClick: () => {} }}
      />
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <Suspense fallback={'Cargando datos'}>
        <NewSubmissionPageContainer />
      </Suspense>
    </Navigation>
  );
};
