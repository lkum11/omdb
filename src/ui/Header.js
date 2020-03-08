import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const HeaderDiv = styled.div`
    flex:1;
    margin: 2em 0em;
    padding: 0em 2em;
`;

const HeaderBackgroundDiv = styled.div`
    background-color: #fff;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    padding: 1em;
`;

const HeaderStyle = styled.p`
    font-weight: bold;
    font-size: 1.8em;
    color: ${colors.primary};
    margin: 0em 1em;
`;
const HeaderStyle2 = styled.p`
    font-weight: bold;
    font-size: 1.8em;
    color: ${colors.secondary};
    margin: 0em 1.2em;
`;

const Header = props => {
    return (
        <HeaderDiv>
            <HeaderBackgroundDiv>
                <HeaderStyle>hey</HeaderStyle>
                <HeaderStyle2>cinema</HeaderStyle2>
            </HeaderBackgroundDiv>
        </HeaderDiv>
        
    )
}

export default Header;