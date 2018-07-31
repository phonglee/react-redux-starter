import { fetchDataSource } from '../../../services/WidgetService';
import {WidgetAction} from '../reducers/WidgetReducer'

// ACTION GENERATORS
const fetchDataSourceAction = () => ({
    type: WidgetAction.FETCH_DATASOURCE,
    payload: fetchDataSource()
});


// EXPORT ACTIONS
export { fetchDataSourceAction as fetchDatasource };