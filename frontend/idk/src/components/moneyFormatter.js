const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
};

export default formattedNumber