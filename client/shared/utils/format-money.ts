export function formatCurrencyVN(amount: number): string {
    const formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedAmount.replace('₫', 'đ');
}
