import { Icon, InlineIcon } from '@iconify/react';
import { IconifyIcon } from '@iconify/types';
import { Box, SxProps, Theme } from '@mui/material';

interface IconifyProps {
	icon: IconifyIcon;
	width?: string | number;
	height?: string | number;
	color?: string;
	inline?: boolean;
	sx?: SxProps<Theme>;
}

const Iconify: React.FC<IconifyProps> = ({ icon, width = 20, height = 20, color = 'currentColor', inline = false, sx }) => inline ? (
		<Box className="component-iconify" sx={{ width, height, ...sx }}>
			<InlineIcon icon={icon} width={width} height={height} color={color} />
		</Box>
	) : (
		<Box className="component-iconify" sx={{ width, height, ...sx }}>
			<Icon icon={icon} width={width} height={height} color={color} />
		</Box>
	);

export default Iconify;