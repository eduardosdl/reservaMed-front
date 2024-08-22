export default function formatCPF(cpf: number | string): string {
    const cpfStr = cpf.toString();

    if (cpfStr.length !== 11) {
        throw new Error("O CPF deve conter 11 dígitos.");
    }

    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
  