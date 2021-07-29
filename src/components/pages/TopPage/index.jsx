import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Root = styled.div`
    background:#e5e5e5;
    width:100%;
    height:100%;
    padding:10px;
`;

const Title = styled.div`
    font-size:30px;
    font-weight:bold;
    color:#ff3300;
`;




const TopPage = () => {
    return (
        <>
            <Root>
                <Title>This is Top page!</Title>
                <Link to="/play/hoge">Player Page</Link>
            </Root>
        </>
    );
}

export default TopPage;