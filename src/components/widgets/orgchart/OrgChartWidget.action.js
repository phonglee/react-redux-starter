
import { store } from '../../../components/state/stores/AppStore';

export const OrgChartAction = {
    'TOGGLE_EMP': 'TOGGLE_EMP'
};

export const toggleEmployees = (widgetIndex, widgetId, empName) => {
    store.dispatch({
        widgetIndex: widgetIndex,
        id: widgetId,
        empName: empName,
        type: OrgChartAction.TOGGLE_EMP
    });
};