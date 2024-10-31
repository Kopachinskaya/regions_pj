document.getElementById('regionSearchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('.info-table tbody tr');
    
    rows.forEach(row => {
        const regionCell = row.querySelector('td'); // Предположим, что регион указан в первой ячейке строки
        if (regionCell) {
            const regionText = regionCell.textContent.toLowerCase();
            if (regionText.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
});