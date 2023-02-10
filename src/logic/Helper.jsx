const helper = {
    Wait: async function Wait(timeMs) {
        console.log('start timer');
        await new Promise(resolve => setTimeout(resolve, timeMs));
        console.log('after 1 second');
    }
}

export default helper