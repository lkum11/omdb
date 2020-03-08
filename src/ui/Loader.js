import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    top: 20vw;
`;

const Loader = props => {
    return (
        <Container>
            <div className="nb-spinner"></div>
        </Container>
    )
}

export default Loader;