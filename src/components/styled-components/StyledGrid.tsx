import { Grid, GridProps } from '@mui/material';
import Menu, {MenuProps} from '@mui/material/Menu';
import {alpha, styled} from '@mui/material/styles';

export const StyledGridContainer = styled((props: GridProps) => (
    <Grid
        container
        spacing={1}
        {...props}
    />
))(({ theme }) => ({
    marginBottom: '2rem'
}));

export const StyledGridItem = styled((props: GridProps) => (
    <Grid
        item
        md={3}
        xs={6}
        lg={2}
        sm={4}
        {...props}
    />
))(({ theme }) => ({
    // marginBottom: '2rem'
}));