import { CSSProperties, ReactNode, forwardRef, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { Theme, alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { getIcon } from '@iconify/iconify';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

interface ColorPickerProps {
	name: string;
	colors: string[];
	selected: string | string[];
	onSelectColor: (color: string | string[]) => void;
	limit?: number;
	sx?: CSSProperties;
	children?: ReactNode;
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
	({ colors, selected, onSelectColor, limit = 'auto', sx, ...other }, ref) => {
		const singleSelect = typeof selected === 'string';

		const handleSelect = useCallback(
			(color: string) => {
				if (singleSelect) {
					if (color !== selected) {
						onSelectColor(color);
					}
				} else {
					const newSelected = selected.includes(color)
						? selected.filter((value) => value !== color)
						: [...selected, color];

					onSelectColor(newSelected);
				}
			},
			[onSelectColor, selected, singleSelect]
		);

		return (
			<Stack
				ref={ref}
				direction="row"
				display="inline-flex"
				sx={{
					flexWrap: 'wrap',
					...(limit !== 'auto' && {
						width: Number(limit) * 36,
						justifyContent: 'flex-end',
					}),
					...sx,
				}}
				{...other}
			>
				{colors.map((color) => {
					const hasSelected = singleSelect ? selected === color : selected.includes(color);
					const iconObj = getIcon("eva:checkmark-fill");

					return (
						<ButtonBase
							key={color}
							sx={{
								width: 36,
								height: 36,
								borderRadius: '50%',
							}}
							onClick={() => {
								handleSelect(color);
							}}
						>
							<Stack
								alignItems="center"
								justifyContent="center"
								sx={{
									width: 20,
									height: 20,
									bgcolor: color,
									borderRadius: '50%',
									border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
									...(hasSelected && {
										transform: 'scale(1.3)',
										boxShadow: `4px 4px 8px 0 ${alpha(color, 0.48)}`,
										outline: `solid 2px ${alpha(color, 0.08)}`,
										transition: (theme) =>
											theme.transitions.create('all', {
												duration: theme.transitions.duration.shortest,
											}),
									}),
								}}
							>
								<Iconify
									icon={iconObj!}
									width={hasSelected ? 12 : 0}
									sx={{
										color: (theme: Theme) => theme.palette.getContrastText(color || theme.palette.common.white),
										transition: (theme: Theme) =>
											theme.transitions.create('all', {
												duration: theme.transitions.duration.shortest,
											}),
									}}
								/>
							</Stack>
						</ButtonBase>
					);
				})}
			</Stack>
		);
	}
);

export default ColorPicker;
