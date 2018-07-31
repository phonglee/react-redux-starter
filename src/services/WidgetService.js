// IMPORT DATA FROM STATIC JSON FILE
import datasource from './datasource.json';

// COMPONENT
const simulateError = false;
export const fetchDataSource = () => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(datasource);
            }
        }, 1000);
    });
};