export const config = {
    apiURL: 'demo.com'
};

export function myFunction() {
    console.log('module1, myFunction')
}


export {config as conf, myFunction as myFunc};
