// Propuesta: Evaluador de Impacto de las Políticas Públicas con Arrays y Métodos de Búsqueda y Filtrado

function calcularRegresionLineal(cantidad_de_anos, ano_inicio) {
    let transferencias = [];
    let tasasPobreza = [];
    let anos = [];
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    //  Pedirle ingresar los datos históricos al usuario y guardarlos en los arrays
    for (let i = 0; i < cantidad_de_anos; i++) {
        let ano_actual = ano_inicio + i;
        let transferencia = Number(prompt(`Ingrese transferencia del año ${ano_actual}:`));
        let pobreza = Number(prompt(`Ingrese tasa de pobreza del año ${ano_actual}:`));

        // Guardo los datos en los arrays de transferencia y las tasas de pobreza
        anos.push(ano_actual);
        transferencias.push(transferencia);
        tasasPobreza.push(pobreza);

        // Sumo para los cálculos de los coeficientes de la regresión lineal
        sumX += transferencia;
        sumY += pobreza;
        sumXY += transferencia * pobreza;
        sumX2 += transferencia * transferencia;
    }

    // Cálculo de los coeficientes β0 y β1 (impacto de la constante e impacto de la transferencia)
    let n = cantidad_de_anos;
    let beta1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    let promedioX = sumX / n;
    let promedioY = sumY / n;
    let beta0 = promedioY - beta1 * promedioX;

    // Retorno los coeficientes y los arrays
    return { beta0, beta1, anos, transferencias, tasasPobreza };
}

// Encontrar el índice de un año específico
function buscarAno(anos, transferencias, tasasPobreza, anoBuscado) {
    return anos
        .map((ano, index) => ({
            ano: ano,
            transferencia: transferencias[index],
            pobreza: tasasPobreza[index]
        }))
        .find(entry => entry.ano === anoBuscado) || "Año no encontrado en los datos.";
}


// Filtrar años con transferencia mayor a cierto valor
function filtrarTransferenciasAltas(anos, transferencias, tasasPobreza, valorMinimo) {
    return anos
        .map((ano, index) => ({
            ano: ano,
            transferencia: transferencias[index],
            pobreza: tasasPobreza[index]
        }))
        .filter(entry => entry.transferencia > valorMinimo);
}


// EJECUCIÓN


// Ejemplo para que el usuario ingrese los dtos
let cantidad_de_anos = Number(prompt('Ingrese cantidad de años históricos:'));
let ano_inicio = Number(prompt('Ingrese el año de inicio:'));

let resultado = calcularRegresionLineal(cantidad_de_anos, ano_inicio);
console.log(`β0 (constante): ${resultado.beta0}`);
console.log(`β1 (Impacto de transferencia directo): ${resultado.beta1}`);
console.log(`Datos de transferencias ingresadas: ${resultado.transferencias}`);
console.log(`Datos de tasas de pobreza ingresadas: ${resultado.tasasPobreza}`);
alert(`Dado que el valor de β₁ = ${resultado.beta1}, por cada unidad adicional en las transferencias monetarias directas, la tasa de pobreza disminuiría en ${resultado.beta1} unidades.`);

// Para hacer Búsqueda de valores en la base de datos por año:
let anoBuscado = Number(prompt("Ingrese el año que desea buscar:"));
let resultadoBusqueda = buscarAno(resultado.anos, resultado.transferencias, resultado.tasasPobreza, anoBuscado);
console.log("Resultado de la búsqueda para el año ingresado:", resultadoBusqueda);

// Para realiza búsquedas con de años con valor mínimo de transferencias
let valorMinimo = Number(prompt("Ingrese el valor mínimo de transferencia para filtrar:"));
let resultadoFiltrado = filtrarTransferenciasAltas(resultado.anos, resultado.transferencias, resultado.tasasPobreza, valorMinimo);
console.log("Los años con transferencias mayores a", valorMinimo, ":", resultadoFiltrado);
