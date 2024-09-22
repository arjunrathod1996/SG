import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

interface LoaderProps {
    type?: 'SPINNER' | 'LOADER' | 'FILE_LOADING';
    loading: boolean;
    children?: React.ReactNode; // Correcting the typo
}

const Loader: FunctionComponent<LoaderProps> = ({ type = 'SPINNER', loading, children }) => {
    const { formatMessage } = useIntl();

    if (!loading) {
        return <>{children}</>; // Corrected children usage
    }

    if (type === 'LOADER') {
        return (
            <div className='spinner-grow' role="status">
                {formatMessage({ id: 'pnp.fields.loading' })}
            </div>
        );
    }

    return <Spinner color='dark' />;
};

export default Loader;
