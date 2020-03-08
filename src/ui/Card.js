import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import colors from '../constants/colors';

const CardStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    background-color: white;
    border-radius: 1em;
    margin: 3em;
`;

const ImgStyle = styled.img`
    width: 25em;
    height: 20em;
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    background-size: contain;
    opacity: 0.9;
`;

const CardDetailStyle = styled.div`
    padding-left: 1em;
    width: 30em;
`;
const HeaderStyle = styled.p`
    display: inline;
    font-weight: bold;
    font-size: 1.8em;
    color: ${colors.primary};
    margin-bottom: 1em;
`;
const SubHeaderStyle = styled.span`
    color: ${colors.quaternary};
    font-size: 1.6em;
`;
const HeaderContainer = styled.div`
    margin: 1em 0em;
`;

const RatingValStyle = styled.span`
    font-size: 2.4em;
    margin-left: 0.2em;
    color: ${colors.secondary}
`;

const Card = props => {
  return (
    <CardStyle>
        <ImgStyle src={props.poster} alt={props.title} />
        <CardDetailStyle>
            <HeaderContainer>
                <HeaderStyle>{props.title}</HeaderStyle> 
                <SubHeaderStyle> ({props.year}) </SubHeaderStyle>
            </HeaderContainer>
            <FontAwesomeIcon 
                icon={faStar} 
                className="starIcon"
            />
            <RatingValStyle>{props.rating}</RatingValStyle><SubHeaderStyle>/10</SubHeaderStyle>
        </CardDetailStyle>
    </CardStyle>
  );
}

export default Card;
