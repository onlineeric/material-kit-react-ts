import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material/styles';

import { ExtendedPalette, palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { ExtendedTypographyOptions, typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------
interface ExtendedThemeOptions extends ThemeOptions {
	palette: ExtendedPalette,
	typography: ExtendedTypographyOptions
}
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	
	const memoizedValue: ExtendedThemeOptions = useMemo(
		() => ({
			palette: palette(),
			typography,
			shadows: shadows(),
			customShadows: customShadows(),
			shape: { borderRadius: 8 },
		}),
		[]
	);

	const theme = createTheme(memoizedValue as ThemeOptions);

	theme.components = overrides(theme);

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MUIThemeProvider>
	);
}

ThemeProvider.propTypes = {
	children: PropTypes.node,
};
