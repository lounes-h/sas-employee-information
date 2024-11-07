import { memo } from 'react';
import { StyledTableHead, StyledHeaderRow, StyledTableCell } from './styles';

const TableHeader = memo(() => (
    <StyledTableHead>
        <StyledHeaderRow>
            <StyledTableCell className="column-firstName">First Name</StyledTableCell>
            <StyledTableCell className="column-lastName">Last Name</StyledTableCell>
            <StyledTableCell className="column-location">Location</StyledTableCell>
            <StyledTableCell className="column-birthday">Birthday</StyledTableCell>
            <StyledTableCell className="column-age">Age (years)</StyledTableCell>
        </StyledHeaderRow>
    </StyledTableHead>
));

export default TableHeader;