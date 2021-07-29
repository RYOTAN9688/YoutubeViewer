import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator } from '@storybook/react';
import GlobalStyle from "../src/style/GlobalStyle";

addDecorator(storyFn => (
    <MemoryRouter
        initialEntries={['/', 'posts']}
    >
        {storyFn()}
    </MemoryRouter>
));

//storybookのプレビュー表示部分にstyleタグが展開される
addDecorator(storyFn =>
    <>
        <GlobalStyle />
        {storyFn()}
    </>
)