import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import colors from '../constants/colors';

const Container = styled.div`
    position: relative;
    top: 20vw;
`;

const NotFoundText = styled.p`
    color: ${colors.quaternary};
    font-size: 1.8em;
    font-weight: bold;
`;

const NotFound = props => {
    return (
        <Container>
            <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="exclamationIcon" 
                color={colors.quaternary}
            />
            <NotFoundText>Data Not Found</NotFoundText>
        </Container>
    )
}

export default NotFound;