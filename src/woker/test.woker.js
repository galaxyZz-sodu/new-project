addEventListener('message',  (e) => {
    // console.log('开始洗澡了');
    let length_1 = e.data;
    let sum1 = 0
    for (let i = 0; i <= length_1; i++) {
        sum1 += i
    }
    return postMessage(sum1)
});

export default {}