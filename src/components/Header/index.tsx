// src/components/Header/index.tsx
import React from 'react';
import { Container, Toolbar } from '@mui/material';
import { StyledLogo, StyledHeader } from './styles';
import LogoWhite from '../../assets/images/logo-white.png';

export const Header: React.FC = () => {
    return (
        <StyledHeader position="relative">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <StyledLogo
                        src={LogoWhite}
                        alt="SAS Logo"
                    />
                </Toolbar>
            </Container>
        </StyledHeader>
    );
};