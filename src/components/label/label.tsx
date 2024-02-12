import { ReactNode, forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { StyledLabel } from './styles';

type Color = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
type Variant = 'filled' | 'outlined' | 'ghost' | 'soft';

interface LabelProps {
  children?: ReactNode;
  color?: Color;
  variant?: Variant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: object;
  [x: string]: unknown;
}
const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

export default Label;
