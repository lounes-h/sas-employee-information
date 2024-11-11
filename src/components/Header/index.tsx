// src/components/Header/index.tsx
import { FC } from 'react';
import { Container, Toolbar } from '@mui/material';
import { StyledLogo, StyledHeader } from './styles';
import LogoWhite from '../../assets/images/logo-white.png';

const Header: FC = () => {
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

export default Header;