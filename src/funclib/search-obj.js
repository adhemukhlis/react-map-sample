import { searchArrayTable } from 'array-table-search';
const searchOptionArr = ( val ) => ({ type: 'exact', value: val });
export const get_place_name_by_id = ( search, arr, child ) => {
	const result = searchArrayTable(arr, searchOptionArr( search ));
	return result[0][child ]
}