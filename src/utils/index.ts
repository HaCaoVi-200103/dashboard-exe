export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatNumber = (value: number) => {
    if (value >= 1_000_000) return (value / 1_000_000) + 'M';
    if (value >= 1_000) return (value / 1_000) + 'K';
    return value.toString();
}

export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
    const discountFinal = originalPrice - discountedPrice
    if (originalPrice <= 0 || discountFinal < 0 || discountFinal > originalPrice) {
        throw new Error("Invalid price values");
    }
    const discount = ((originalPrice - discountFinal) / originalPrice) * 100;

    if (discount % 2 === 0) {
        return discount.toFixed(0) + "%";
    }
    return discount.toFixed(1) + "%";
}

export const formatPriceVND = (price: number | string) => {
    return Number(price).toLocaleString("vi-VN") + " vnd";
};

