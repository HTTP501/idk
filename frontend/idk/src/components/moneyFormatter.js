const formattedNumber = function (number) {
    if (number === null || number===undefined){
        return null
    }
    
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
};

export default formattedNumber