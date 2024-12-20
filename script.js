// Propuesta: Evaluador de Impacto de las Políticas Públicas con Arrays y Métodos de Búsqueda y Filtrado

document.addEventListener('DOMContentLoaded', () => {
    const generateFieldsBtn = document.getElementById('generate-fields-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const dataForm = document.getElementById('data-form');
    const dataFieldsContainer = document.getElementById('data-fields');
    const resultsContainer = document.getElementById('results-container');

    generateFieldsBtn.addEventListener('click', () => {
        const anoInicio = Number(document.getElementById('ano-inicio').value);
        const cantidadAnos = Number(document.getElementById('cantidad-anos').value);

        if (anoInicio && cantidadAnos) {
            dataFieldsContainer.innerHTML = '';
            for (let i = 0; i < cantidadAnos; i++) {
                const ano = anoInicio + i;
                dataFieldsContainer.innerHTML += `
                    <label for="transferencia-${ano}">Transferencia ${ano}:</label>
                    <input type="number" id="transferencia-${ano}" name="transferencia-${ano}" required>
                    <label for="pobreza-${ano}">Tasa de pobreza ${ano}:</label>
                    <input type="number" id="pobreza-${ano}" name="pobreza-${ano}" required>
                `;
            }
            analyzeBtn.disabled = false;
        } else {
            alert('Por favor ingresa valores válidos para el año de inicio y la cantidad de años.');
        }
    });

    analyzeBtn.addEventListener('click', () => {
        const anoInicio = Number(document.getElementById('ano-inicio').value);
        const cantidadAnos = Number(document.getElementById('cantidad-anos').value);
        const transferencias = [];
        const tasasPobreza = [];

        for (let i = 0; i < cantidadAnos; i++) {
            const ano = anoInicio + i;
            const transferencia = Number(document.getElementById(`transferencia-${ano}`).value);
            const pobreza = Number(document.getElementById(`pobreza-${ano}`).value);

            if (isNaN(transferencia) || isNaN(pobreza)) {
                alert(`Por favor ingresa valores válidos para el año ${ano}.`);
                return;
            }

            transferencias.push(transferencia);
            tasasPobreza.push(pobreza);
        }

        const { beta0, beta1 } = calcularRegresionLineal(cantidadAnos, anoInicio, transferencias, tasasPobreza);
        resultsContainer.innerHTML = `
            <p>β₀ (Constante): ${beta0.toFixed(2)}</p>
            <p>β₁ (Impacto de transferencia): ${beta1.toFixed(2)}</p>
            <p>Por cada unidad adicional en las transferencias, la tasa de pobreza disminuiría en aproximadamente ${beta1.toFixed(2)} unidades.</p>
        `;
    });
});

function calcularRegresionLineal(n, anoInicio, transferencias, tasasPobreza) {
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let i = 0; i < n; i++) {
        const x = transferencias[i];
        const y = tasasPobreza[i];
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }

    const beta1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const promedioX = sumX / n;
    const promedioY = sumY / n;
    const beta0 = promedioY - beta1 * promedioX;

    return { beta0, beta1 };
}

