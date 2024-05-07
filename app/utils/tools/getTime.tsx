import { traceable } from "langsmith/traceable";
export const getTime = traceable(async () => {

    return 'The time is now being displayed on your palm.';
}, { name: 'getTime' });