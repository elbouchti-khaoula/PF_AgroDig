import React from 'react';
import { TagProvider } from '../contexts/TagContext';
import Tag from '../Home/Tag';
import styled from 'styled-components';
import Layout from '../others/Layout';

const Main = styled.div`
`;

function TagPage() {
    return (
        <Layout active={'home'} >
        <TagProvider>
            <Main>
                <Tag />
            </Main>
        </TagProvider></Layout>
    );
}

export default TagPage;
