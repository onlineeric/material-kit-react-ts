import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------
interface UserTableHeadProps {
	order: 'asc' | 'desc';
	orderBy: string;
	rowCount: number;
	headLabel: {
		id: string;
		align?: 'left' | 'right' | 'center';
		label: string;
		width: number;
		minWidth: number;
	}[];
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UserTableHead({
	order,
	orderBy,
	rowCount,
	headLabel,
	numSelected,
	onRequestSort,
	onSelectAllClick,
}: UserTableHeadProps) {
	const onSort = (property: string) => (event: React.MouseEvent<unknown, MouseEvent>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>

				{headLabel.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.align || 'left'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ width: headCell.width, minWidth: headCell.minWidth }}
					>
						<TableSortLabel
							hideSortIcon
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={onSort(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box sx={{ ...visuallyHidden }}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
