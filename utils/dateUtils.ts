export function calcularIdade(birthDate: string | Date): number {
  const nascimento = new Date(birthDate).getTime();
  const agora = Date.now();

  const idade = Math.floor(
    (agora - nascimento) / (1000 * 60 * 60 * 24 * 365.25)
  );
  return idade;
}
