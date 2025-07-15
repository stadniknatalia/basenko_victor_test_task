// Тестовое задание: Двумерный массив 10x10 с анализом данных
// Test Task: 10x10 Two-dimensional array with data analysis

class ArrayAnalyzer {
    private matrix: number[][];
    private readonly SIZE = 10;
    private readonly MIN_VALUE = -100;
    private readonly MAX_VALUE = 100;

    constructor() {
        this.matrix = this.generateMatrix();
    }

    /**
     * Генерирует двумерный массив 10x10 со случайными числами в интервале [-100..100]
     * Generates 10x10 two-dimensional array with random numbers in range [-100..100]
     */
    private generateMatrix(): number[][] {
        const matrix: number[][] = [];
        
        for (let i = 0; i < this.SIZE; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.SIZE; j++) {
                // Генерация случайного числа в диапазоне [-100, 100]
                const randomNum = Math.floor(Math.random() * (this.MAX_VALUE - this.MIN_VALUE + 1)) + this.MIN_VALUE;
                row.push(randomNum);
            }
            matrix.push(row);
        }
        
        return matrix;
    }

    /**
     * Находит строку с минимальным числом в массиве
     * Finds the row with the minimum number in the array
     */
    private findRowWithMinimum(): { rowIndex: number; minValue: number } {
        let globalMin = Number.MAX_SAFE_INTEGER;
        let minRowIndex = 0;

        for (let i = 0; i < this.SIZE; i++) {
            for (let j = 0; j < this.SIZE; j++) {
                if (this.matrix[i][j] < globalMin) {
                    globalMin = this.matrix[i][j];
                    minRowIndex = i;
                }
            }
        }

        return { rowIndex: minRowIndex, minValue: globalMin };
    }

    /**
     * Находит наименьшее положительное число в строке
     * Finds the smallest positive number in a row
     */
    private findSmallestPositiveInRow(row: number[]): number | null {
        const positiveNumbers = row.filter(num => num > 0);
        
        if (positiveNumbers.length === 0) {
            return null;
        }
        
        return Math.min(...positiveNumbers);
    }

    /**
     * Вычисляет минимальное количество замен для избежания 3 подряд идущих 
     * положительных или отрицательных чисел
     * Calculates minimum replacements to avoid 3 consecutive positive or negative numbers
     */
    private calculateMinReplacements(row: number[]): number {
        let replacements = 0;
        let consecutiveCount = 1;
        let lastSign = row[0] >= 0 ? 'positive' : 'negative';

        for (let i = 1; i < row.length; i++) {
            const currentSign = row[i] >= 0 ? 'positive' : 'negative';
            
            if (currentSign === lastSign) {
                consecutiveCount++;
                
                if (consecutiveCount === 3) {
                    replacements++;
                    consecutiveCount = 1;
                    lastSign = currentSign === 'positive' ? 'negative' : 'positive';
                }
            } else {
                consecutiveCount = 1;
                lastSign = currentSign;
            }
        }

        return replacements;
    }

    /**
     * Форматирует число для вывода с выравниванием
     * Formats number for aligned output
     */
    private formatNumber(num: number): string {
        return num.toString().padStart(4, ' ');
    }

    /**
     * Выводит массив в читаемом виде с анализом
     * Displays array in readable format with analysis
     */
    public displayResults(): void {
        const { rowIndex: minRowIndex, minValue } = this.findRowWithMinimum();
        
        console.log('='.repeat(80));
        console.log('ДВУМЕРНЫЙ МАССИВ 10x10 С АНАЛИЗОМ ДАННЫХ');
        console.log('10x10 TWO-DIMENSIONAL ARRAY WITH DATA ANALYSIS');
        console.log('='.repeat(80));
        console.log();

        console.log('Столбцы/Cols:    0    1    2    3    4    5    6    7    8    9');
        console.log('              ' + '----+'.repeat(10));

        for (let i = 0; i < this.SIZE; i++) {
            const rowMarker = i === minRowIndex ? '*' : ' ';
            const rowNumbers = this.matrix[i].map(num => this.formatNumber(num)).join(' ');
            
            console.log(`Строка/Row ${i}${rowMarker}: ${rowNumbers}`);
        }

        console.log();
        console.log('='.repeat(80));
        console.log('АНАЛИЗ ДАННЫХ / DATA ANALYSIS');
        console.log('='.repeat(80));

        console.log(`\n* Строка с минимальным числом (${minValue}): ${minRowIndex} (отмечена звездочкой)`);
        console.log(`* Row with minimum number (${minValue}): ${minRowIndex} (marked with asterisk)`);

        console.log('\n📊 АНАЛИЗ ПО СТРОКАМ / ROW ANALYSIS:');
        console.log('-'.repeat(80));

        for (let i = 0; i < this.SIZE; i++) {
            const smallestPositive = this.findSmallestPositiveInRow(this.matrix[i]);
            const minReplacements = this.calculateMinReplacements(this.matrix[i]);
            
            const positiveText = smallestPositive !== null 
                ? `наименьшее положительное: ${smallestPositive}` 
                : 'положительных чисел нет';
            
            const positiveTextEn = smallestPositive !== null 
                ? `smallest positive: ${smallestPositive}` 
                : 'no positive numbers';

            console.log(`Строка ${i}: ${positiveText}, замен для избежания "3 подряд": ${minReplacements}`);
            console.log(`Row ${i}: ${positiveTextEn}, replacements to avoid "3 in a row": ${minReplacements}`);
            console.log();
        }

        console.log('='.repeat(80));
        console.log('ПОЯСНЕНИЯ / EXPLANATIONS:');
        console.log('='.repeat(80));
        console.log('• Строка со звездочкой (*) содержит глобальный минимум массива');
        console.log('• Row with asterisk (*) contains the global minimum of the array');
        console.log('• "3 подряд" означает 3 числа одного знака (все положительные или все отрицательные)');
        console.log('• "3 in a row" means 3 numbers of the same sign (all positive or all negative)');
        console.log('• Ноль считается положительным числом / Zero is considered a positive number');
        console.log('='.repeat(80));
    }
}


function main(): void {
    console.log('Запуск анализа двумерного массива...');
    console.log('Starting two-dimensional array analysis...\n');
    
    const analyzer = new ArrayAnalyzer();
    analyzer.displayResults();
    
    console.log('\nАнализ завершен успешно!');
    console.log('Analysis completed successfully!');
}


main();

export { ArrayAnalyzer }; 
